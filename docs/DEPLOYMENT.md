# Codenova Innovations - Deployment Guide

## Deployment Overview

**Primary Target**: Vercel (for simplicity and performance)
**Alternative**: Self-hosted on existing infrastructure (100.94.190.92)
**CI/CD**: GitHub Actions automated deployment

---

## Option 1: Vercel Deployment (Recommended)

### Prerequisites
- Vercel account (free tier sufficient)
- GitHub repository connected to Vercel
- Environment variables configured

### Setup Steps

#### 1. Connect Repository to Vercel
```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Link project (run from project root)
cd ~/codenova-web
vercel link
```

#### 2. Configure Environment Variables
In Vercel Dashboard → Project Settings → Environment Variables:

```env
# GitHub Integration
GITHUB_USERNAME=donzeg
GITHUB_TOKEN=ghp_xxx  # Optional, increases rate limit to 5000/hour

# Contact Form Email
CONTACT_EMAIL=codenovainnovations@gmail.com
SENDGRID_API_KEY=xxx  # OR RESEND_API_KEY

# Site Configuration
NUXT_PUBLIC_SITE_URL=https://codenovainnovations.com
```

#### 3. Deploy
```bash
# Production deployment
vercel --prod

# Preview deployment (for testing)
vercel
```

#### 4. Custom Domain (Optional)
1. Go to Vercel Dashboard → Project → Settings → Domains
2. Add custom domain: `codenovainnovations.com`
3. Update DNS records:
   - **A Record**: `@` → `76.76.21.21` (Vercel IP)
   - **CNAME**: `www` → `cname.vercel-dns.com`
4. Wait for SSL certificate provisioning (~5 minutes)

### Automatic Deployments
Vercel automatically deploys on:
- **Push to `main`**: Production deployment
- **Push to other branches**: Preview deployment
- **Pull requests**: Preview deployment with unique URL

### Vercel Configuration File
```javascript
// vercel.json (optional, auto-detected from nuxt.config.ts)
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nuxtjs",
  "outputDirectory": ".output/public"
}
```

---

## Option 2: Self-Hosted Deployment

### Server Requirements
- **OS**: Ubuntu 20.04+ / Debian 11+
- **Node.js**: v18+ (v20 recommended)
- **Memory**: 1GB minimum, 2GB recommended
- **Storage**: 10GB available
- **Nginx**: Latest stable version
- **PM2**: Process manager

### Server Setup

#### 1. Install Dependencies
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 20.x
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Install PM2 globally
sudo npm install -g pm2

# Install Nginx
sudo apt install -y nginx

# Install Certbot for SSL (Let's Encrypt)
sudo apt install -y certbot python3-certbot-nginx
```

#### 2. Clone Repository
```bash
# Create directory
sudo mkdir -p /var/www/codenova-web
sudo chown $USER:$USER /var/www/codenova-web

# Clone repository
cd /var/www/codenova-web
git clone https://github.com/donzeg/codenova-web.git .
```

#### 3. Configure Environment
```bash
# Create .env file
cat > .env << EOF
NODE_ENV=production
NITRO_PORT=3001

# GitHub Integration
GITHUB_USERNAME=donzeg
GITHUB_TOKEN=ghp_xxx

# Contact Form
CONTACT_EMAIL=codenovainnovations@gmail.com
SENDGRID_API_KEY=xxx

# Site Configuration
NUXT_PUBLIC_SITE_URL=https://codenovainnovations.com
EOF
```

#### 4. Build Application
```bash
# Install dependencies
npm install

# Build for production
npm run build

# Verify .output directory exists
ls -la .output/
```

#### 5. Configure PM2
```javascript
// ecosystem.config.cjs
module.exports = {
  apps: [{
    name: 'codenova-web',
    script: './.output/server/index.mjs',
    instances: 1,
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      NITRO_PORT: 3001
    },
    error_file: './logs/error.log',
    out_file: './logs/out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    merge_logs: true
  }]
}
```

```bash
# Create logs directory
mkdir -p logs

# Start application with PM2
pm2 start ecosystem.config.cjs

# Save PM2 process list
pm2 save

# Setup PM2 to start on system boot
pm2 startup
# Follow the command output instructions

# Check status
pm2 status
pm2 logs codenova-web
```

#### 6. Configure Nginx
```bash
# Create Nginx configuration
sudo nano /etc/nginx/sites-available/codenova-web
```

```nginx
server {
    listen 80;
    server_name codenovainnovations.com www.codenovainnovations.com;

    # Redirect HTTP to HTTPS (after SSL setup)
    # return 301 https://$server_name$request_uri;

    # Proxy to Nuxt server
    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Security headers
    add_header X-Frame-Options "DENY" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/json application/xml+rss application/rss+xml font/truetype font/opentype application/vnd.ms-fontobject image/svg+xml;

    # Access logs
    access_log /var/log/nginx/codenova-web-access.log;
    error_log /var/log/nginx/codenova-web-error.log;
}
```

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/codenova-web /etc/nginx/sites-enabled/

# Test Nginx configuration
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx

# Enable Nginx on boot
sudo systemctl enable nginx
```

#### 7. Setup SSL Certificate (Let's Encrypt)
```bash
# Obtain SSL certificate
sudo certbot --nginx -d codenovainnovations.com -d www.codenovainnovations.com

# Test automatic renewal
sudo certbot renew --dry-run

# Certificate auto-renews every 60 days via cron
```

Nginx will automatically update the configuration to:
```nginx
server {
    listen 443 ssl http2;
    server_name codenovainnovations.com www.codenovainnovations.com;

    ssl_certificate /etc/letsencrypt/live/codenovainnovations.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/codenovainnovations.com/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;

    # ... rest of configuration
}

server {
    listen 80;
    server_name codenovainnovations.com www.codenovainnovations.com;
    return 301 https://$server_name$request_uri;
}
```

### Update Deployment Script
```bash
# Create deployment script
cat > deploy.sh << 'EOF'
#!/bin/bash

echo "🚀 Deploying Codenova Innovations website..."

# Navigate to project directory
cd /var/www/codenova-web

# Pull latest changes
echo "📥 Pulling latest code from GitHub..."
git pull origin main

# Install dependencies (if package.json changed)
echo "📦 Installing dependencies..."
npm install

# Build application
echo "🔨 Building application..."
npm run build

# Restart PM2 process
echo "🔄 Restarting application..."
pm2 restart codenova-web

# Check status
echo "✅ Deployment complete!"
pm2 status codenova-web
pm2 logs codenova-web --lines 20
EOF

chmod +x deploy.sh
```

```bash
# Deploy updates
./deploy.sh
```

---

## Option 3: Automated CI/CD with GitHub Actions

### GitHub Actions Workflow (Self-Hosted)

```yaml
# .github/workflows/deploy.yml
name: Deploy Codenova Website

on:
  push:
    branches:
      - main
  workflow_dispatch:

jobs:
  deploy:
    name: Deploy to Production Server
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build application
        run: npm run build
        env:
          GITHUB_USERNAME: ${{ secrets.GITHUB_USERNAME }}
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          NUXT_PUBLIC_SITE_URL: https://codenovainnovations.com

      - name: Setup Tailscale
        uses: tailscale/github-action@v2
        with:
          oauth-client-id: ${{ secrets.TS_OAUTH_CLIENT_ID }}
          oauth-secret: ${{ secrets.TS_OAUTH_SECRET }}
          tags: tag:ci

      - name: Deploy to Server
        env:
          SSH_PRIVATE_KEY: ${{ secrets.SSH_PRIVATE_KEY }}
          SERVER_IP: 100.94.190.92
          SERVER_USER: sadiq
        run: |
          # Setup SSH
          mkdir -p ~/.ssh
          echo "$SSH_PRIVATE_KEY" > ~/.ssh/id_rsa
          chmod 600 ~/.ssh/id_rsa
          ssh-keyscan -H $SERVER_IP >> ~/.ssh/known_hosts

          # Create remote directory if doesn't exist
          ssh $SERVER_USER@$SERVER_IP "mkdir -p /var/www/codenova-web"

          # Sync built files
          rsync -avz --delete \
            .output/ \
            $SERVER_USER@$SERVER_IP:/var/www/codenova-web/.output/

          # Sync ecosystem config
          rsync -avz ecosystem.config.cjs \
            $SERVER_USER@$SERVER_IP:/var/www/codenova-web/

          # Sync package files (for runtime dependencies)
          rsync -avz package*.json \
            $SERVER_USER@$SERVER_IP:/var/www/codenova-web/

          # Sync .env file
          ssh $SERVER_USER@$SERVER_IP "cat > /var/www/codenova-web/.env" << EOF
          NODE_ENV=production
          NITRO_PORT=3001
          GITHUB_USERNAME=${{ secrets.GITHUB_USERNAME }}
          GITHUB_TOKEN=${{ secrets.GITHUB_TOKEN }}
          CONTACT_EMAIL=${{ secrets.CONTACT_EMAIL }}
          SENDGRID_API_KEY=${{ secrets.SENDGRID_API_KEY }}
          NUXT_PUBLIC_SITE_URL=https://codenovainnovations.com
          EOF

          # Restart PM2 process
          ssh $SERVER_USER@$SERVER_IP "cd /var/www/codenova-web && pm2 restart codenova-web || pm2 start ecosystem.config.cjs"

          echo "✅ Deployment complete!"
```

### GitHub Secrets Configuration
Add these secrets in GitHub Repository → Settings → Secrets and variables → Actions:

- `TS_OAUTH_CLIENT_ID` - Tailscale OAuth client ID
- `TS_OAUTH_SECRET` - Tailscale OAuth secret
- `SSH_PRIVATE_KEY` - SSH private key for server access
- `GITHUB_USERNAME` - GitHub username (donzeg)
- `GITHUB_TOKEN` - GitHub personal access token
- `CONTACT_EMAIL` - Contact form email
- `SENDGRID_API_KEY` - SendGrid API key

---

## Monitoring & Maintenance

### PM2 Monitoring
```bash
# View logs
pm2 logs codenova-web

# Monitor CPU/memory
pm2 monit

# View detailed info
pm2 info codenova-web

# Restart if needed
pm2 restart codenova-web

# Stop application
pm2 stop codenova-web

# Delete from PM2
pm2 delete codenova-web
```

### Nginx Logs
```bash
# Access logs
sudo tail -f /var/log/nginx/codenova-web-access.log

# Error logs
sudo tail -f /var/log/nginx/codenova-web-error.log

# Test configuration
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx
```

### SSL Certificate Renewal
```bash
# Check certificate expiry
sudo certbot certificates

# Renew manually (automatic via cron)
sudo certbot renew

# Test renewal
sudo certbot renew --dry-run
```

### Backup Strategy
```bash
# Backup script
cat > backup.sh << 'EOF'
#!/bin/bash
BACKUP_DIR="/var/backups/codenova-web"
DATE=$(date +%Y%m%d-%H%M%S)

mkdir -p $BACKUP_DIR

# Backup application files
tar -czf $BACKUP_DIR/codenova-web-$DATE.tar.gz \
  -C /var/www codenova-web

# Keep only last 7 backups
cd $BACKUP_DIR
ls -t | tail -n +8 | xargs rm -f

echo "✅ Backup complete: codenova-web-$DATE.tar.gz"
EOF

chmod +x backup.sh

# Run backup
./backup.sh

# Schedule daily backup (cron)
# crontab -e
# 0 2 * * * /var/www/codenova-web/backup.sh
```

---

## Performance Optimization

### Nginx Caching (Optional)
```nginx
# Add to Nginx configuration
proxy_cache_path /var/cache/nginx levels=1:2 keys_zone=nuxt_cache:10m max_size=100m inactive=60m use_temp_path=off;

server {
    # ... existing config

    location / {
        proxy_cache nuxt_cache;
        proxy_cache_valid 200 10m;
        proxy_cache_use_stale error timeout updating http_500 http_502 http_503 http_504;
        proxy_cache_background_update on;
        proxy_cache_lock on;

        add_header X-Cache-Status $upstream_cache_status;

        # ... existing proxy settings
    }
}
```

### Static Asset Caching
```nginx
# Add to Nginx configuration
location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
    access_log off;
}
```

---

## Rollback Procedure

### Vercel Rollback
```bash
# List deployments
vercel ls

# Rollback to previous deployment
vercel rollback [deployment-url]
```

### Self-Hosted Rollback
```bash
# View git history
git log --oneline -10

# Rollback to previous commit
git reset --hard <commit-hash>

# Rebuild and restart
npm run build
pm2 restart codenova-web
```

---

## Troubleshooting

### Application Not Starting
```bash
# Check PM2 logs
pm2 logs codenova-web --err

# Common issues:
# - Port 3001 already in use: Change NITRO_PORT
# - Missing .env file: Create from template
# - Build failed: Check npm run build output
```

### Nginx 502 Bad Gateway
```bash
# Check if Nuxt app is running
pm2 status codenova-web

# Check if port is accessible
curl http://localhost:3001

# Restart Nuxt app
pm2 restart codenova-web

# Check Nginx error log
sudo tail -100 /var/log/nginx/codenova-web-error.log
```

### SSL Certificate Issues
```bash
# Check certificate
sudo certbot certificates

# Renew certificate
sudo certbot renew --force-renewal

# Check Nginx SSL config
sudo nginx -t
```

### GitHub API Rate Limiting
```bash
# Check rate limit status
curl -H "Authorization: token $GITHUB_TOKEN" \
  https://api.github.com/rate_limit

# Solution: Add GITHUB_TOKEN to .env
# Increases limit from 60 to 5000 requests/hour
```

---

## DNS Configuration

### Domain Setup (codenovainnovations.com)

**For Vercel**:
- **A Record**: `@` → `76.76.21.21`
- **CNAME**: `www` → `cname.vercel-dns.com`

**For Self-Hosted** (100.94.190.92):
- **A Record**: `@` → `100.94.190.92`
- **A Record**: `www` → `100.94.190.92`
- **TXT Record**: `@` → `v=spf1 mx ~all` (for email)

### Verify DNS Propagation
```bash
# Check A record
dig codenovainnovations.com +short

# Check CNAME
dig www.codenovainnovations.com +short

# Check from multiple locations
# Use: https://dnschecker.org
```

---

## Deployment Checklist

### Pre-Deployment
- [ ] All environment variables configured
- [ ] Build passes locally (`npm run build`)
- [ ] Type check passes (`npm run type-check`)
- [ ] Linting passes (`npm run lint`)
- [ ] .env file not committed to git
- [ ] GitHub token has correct permissions

### Initial Deployment
- [ ] DNS records configured
- [ ] SSL certificate obtained
- [ ] Application starts successfully
- [ ] All pages load correctly
- [ ] GitHub API integration working
- [ ] Contact form sends emails
- [ ] Responsive design verified (mobile/tablet/desktop)
- [ ] SEO meta tags present
- [ ] Analytics configured (if using)

### Post-Deployment
- [ ] Monitor error logs for 24 hours
- [ ] Test from different locations/devices
- [ ] Verify SSL certificate (A+ rating on SSL Labs)
- [ ] Check Lighthouse scores (95+ target)
- [ ] Submit sitemap to Google Search Console
- [ ] Test contact form deliverability
- [ ] Monitor GitHub API rate limits

---

**Last Updated**: February 6, 2026
**Deployment Target**: Vercel (primary), Self-hosted (alternative)
