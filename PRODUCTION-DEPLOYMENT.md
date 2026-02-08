# Codenova.cc Deployment Guide

## Overview
This guide covers deploying the Codenova website to production server (217.117.2.102) with the domain **codenova.cc**.

## Architecture

```
Developer (.101) → GitHub → GitHub Actions → Production Server (.102)
                                                        ↓
                                                   PM2 (Port 4000)
                                                        ↓
                                                      Nginx
                                                        ↓
                                                  codenova.cc
```

## Prerequisites

- ✅ Domain registered: codenova.cc
- ✅ Production server: 217.117.2.102 (publicly accessible)
- ✅ Development server: 217.117.2.101 (current location)
- ✅ GitHub repository: donzeg/codenova-web

---

## Step 1: Configure GitHub Secrets

GitHub Actions needs Tailscale and SSH access to your production server. Add these secrets to your repo:

1. Go to: https://github.com/donzeg/codenova-web/settings/secrets/actions

2. Click **"New repository secret"** and add each:

| Secret Name | Value | Description |
|-------------|-------|-------------|
| `TS_OAUTH_CLIENT_ID` | (from Tailscale) | Tailscale OAuth client ID |
| `TS_OAUTH_SECRET` | (from Tailscale) | Tailscale OAuth secret |
| `SSH_PRIVATE_KEY` | Your private SSH key | Full SSH private key content |

### Getting Tailscale OAuth Credentials:

**These should already exist from PEMACS setup:**

1. Go to: https://login.tailscale.com/admin/settings/oauth
2. Find the existing OAuth client (used for PEMACS)
3. Copy the Client ID and Secret
4. Add them to GitHub secrets

**If you need to create new ones:**
1. Click "Generate OAuth client"
2. Add scopes: `devices:read` and `devices:write`
3. Add tag: `tag:ci`
4. Copy the credentials (shown only once!)

### Getting your SSH key:

**Option A: Use existing key**
```bash
# On dev server (.101)
cat ~/.ssh/id_rsa
# Copy the entire output (including BEGIN/END lines)
```

**Note:** This is the same SSH key used for PEMACS deployment, so it should already be authorized on the production server.

---

## Step 2: Prepare Production Server

SSH into production server via Tailscale:

```bash
# Via Tailscale IP (recommended for deployment)
ssh sadiq@100.94.190.92
```

**Note:** Your SSH key should already be authorized since it's used for PEMACS deployment.

### 2.1 Install Dependencies (if not already installed)

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js (v20 recommended)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Install PM2 globally
sudo npm install -g pm2

# Install Git
sudo apt install -y git

# Ensure Nginx is installed
sudo apt install -y nginx
```

### 2.2 Clone Repository

```bash
# Navigate to home directory
cd /home/sadiq/

# Clone the repository
git clone https://github.com/donzeg/codenova-web.git

# Enter directory
cd codenova-web

# Install dependencies
npm install

# Build the application
npm run build
```

### 2.3 Configure PM2

PM2 is already configured in `ecosystem.config.cjs`. Start the application:

```bash
pm2 start ecosystem.config.cjs
pm2 save
pm2 startup  # Follow the instructions to enable PM2 on boot
```

Verify it's running:
```bash
pm2 status codenova-web
pm2 logs codenova-web
```

The app should be running on port 4000.

---

## Step 3: Configure Nginx

### 3.1 Copy Nginx Configuration

The config file has been created: `nginx-codenova.conf`

On production server:
```bash
# Copy the nginx config to sites-available
sudo cp /home/sadiq/codenova-web/nginx-codenova.conf /etc/nginx/sites-available/codenova.cc

# Enable the site
sudo ln -s /etc/nginx/sites-available/codenova.cc /etc/nginx/sites-enabled/

# Test configuration
sudo nginx -t

# If test passes, reload Nginx
sudo systemctl reload nginx
```

### 3.2 Check Nginx Status

```bash
sudo systemctl status nginx
sudo tail -f /var/log/nginx/codenova.error.log
```

---

## Step 4: Configure Cloudflare DNS

1. Log in to Cloudflare: https://dash.cloudflare.com
2. Select your domain: **codenova.cc**
3. Go to **DNS** > **Records**
4. Add an **A record**:

| Type | Name | IPv4 Address | Proxy Status | TTL |
|------|------|--------------|--------------|-----|
| A | @ | 217.117.2.102 | Proxied (Orange cloud) | Auto |
| A | www | 217.117.2.102 | Proxied (Orange cloud) | Auto |

**Important**: Enable "Proxied" (orange cloud) for:
- Free SSL/TLS
- DDoS protection
- CDN caching
- Speed optimization

### 4.1 Configure SSL/TLS in Cloudflare

1. Go to **SSL/TLS** > **Overview**
2. Set encryption mode to: **Full** or **Full (strict)**
3. Wait 5-10 minutes for SSL to activate

**For Full (strict)**, you need origin certificates:

1. Go to **SSL/TLS** > **Origin Server**
2. Click **Create Certificate**
3. Keep defaults, click **Create**
4. Copy both the certificate and private key

On production server:
```bash
# Create SSL directory
sudo mkdir -p /etc/nginx/ssl

# Create certificate file
sudo nano /etc/nginx/ssl/codenova.cc.pem
# Paste the certificate, save and exit

# Create key file
sudo nano /etc/nginx/ssl/codenova.cc.key
# Paste the private key, save and exit

# Secure the files
sudo chmod 600 /etc/nginx/ssl/codenova.cc.key
sudo chmod 644 /etc/nginx/ssl/codenova.cc.pem

# Edit Nginx config to enable SSL
sudo nano /etc/nginx/sites-available/codenova.cc
# Uncomment the SSL certificate lines

# Test and reload
sudo nginx -t
sudo systemctl reload nginx
```

---

## Step 5: Configure Email (Resend)

Your email is configured to send from `noreply@codenovainnovations.com`. 

**To use codenova.cc domain:**

1. Go to Resend: https://resend.com/domains
2. Add domain: **codenova.cc**
3. Add the DNS records shown to Cloudflare
4. Wait for verification (usually 5-10 minutes)

Then update the email sender in your code:
```javascript
// server/utils/email.ts
from: 'CodeNova <noreply@codenova.cc>'
```

---

## Step 6: Commit and Deploy

On development server (.101):

```bash
cd /home/sadiq/codenova-web

# Check status
git status

# Add all changes
git add .

# Commit
git commit -m "Configure for production deployment on codenova.cc

- Change baseURL from /codenova-web/ to root /
- Update all URLs to https://codenova.cc
- Configure PM2 for production mode
- Add GitHub Actions workflow for auto-deployment
- Add Nginx configuration for codenova.cc
"

# Push to GitHub
git push origin main
```

**GitHub Actions will automatically:**
1. SSH into production server (.102)
2. Pull latest code
3. Install dependencies
4. Build the application
5. Restart PM2

Watch the deployment:
- Go to: https://github.com/donzeg/codenova-web/actions
- Click on the latest workflow run

---

## Step 7: Verify Deployment

### 7.1 Check Application

```bash
# On production server
pm2 status codenova-web
pm2 logs codenova-web --lines 50
```

### 7.2 Test Locally (on production server)

```bash
curl http://localhost:4000
```

Should return HTML content.

### 7.3 Test via Browser

1. Wait 5-10 minutes for DNS propagation
2. Visit: **https://codenova.cc**
3. Should see your website!

### 7.4 Test Contact Form

1. Fill out the contact form
2. Submit
3. Check email at: codenovainnovations@gmail.com

---

## Troubleshooting

### DNS not resolving

```bash
# Check DNS propagation
dig codenova.cc
nslookup codenova.cc

# Or use: https://dnschecker.org
```

### Nginx errors

```bash
# Check error logs
sudo tail -f /var/log/nginx/codenova.error.log

# Test configuration
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx
```

### PM2 app not starting

```bash
# Check PM2 logs
pm2 logs codenova-web --lines 100

# Restart the app
pm2 restart codenova-web

# Check environment variables
pm2 env codenova-web
```

### GitHub Actions failing

1. Check workflow run: https://github.com/donzeg/codenova-web/actions
2. Verify GitHub secrets are correct
3. Ensure SSH key has access to production server

### Port 4000 not accessible

```bash
# Check if app is running
pm2 status
netstat -tlnp | grep 4000

# Check firewall (should allow port 80/443 only, Nginx proxies to 4000)
sudo ufw status
```

---

## Monitoring

### PM2 Monitoring

```bash
# Real-time monitoring
pm2 monit

# Check logs
pm2 logs codenova-web

# Check resource usage
pm2 status
```

### Nginx Access Logs

```bash
# Watch access logs
sudo tail -f /var/log/nginx/codenova.access.log

# Watch error logs
sudo tail -f /var/log/nginx/codenova.error.log
```

---

## Future Updates

To update the website:

1. Make changes on dev server (.101)
2. Test locally: `npm run dev`
3. Commit: `git add . && git commit -m "Your changes"`
4. Push: `git push origin main`
5. GitHub Actions automatically deploys to production!

---

## Quick Reference

**Production Server IP**: 217.117.2.102 (Public) / 100.94.190.92 (Tailscale)  
**Deployment**: Via Tailscale (100.94.190.92)  
**Domain**: codenova.cc  
**App Port**: 4000 (internal)  
**Public Ports**: 80 (HTTP), 443 (HTTPS)  

**Key Commands** (via Tailscale):
```bash
# SSH into production
ssh sadiq@100.94.190.92

# Restart app
ssh sadiq@100.94.190.92 "pm2 restart codenova-web"

# Rebuild app
ssh sadiq@100.94.190.92 "cd /home/sadiq/codenova-web && npm run build && pm2 restart codenova-web"

# View logs
ssh sadiq@100.94.190.92 "pm2 logs codenova-web"
ssh sadiq@100.94.190.92 "sudo tail -f /var/log/nginx/codenova.error.log"
```

---

## Success Checklist

- [ ] GitHub secrets configured
- [ ] Production server has code cloned
- [ ] Dependencies installed (`npm install`)
- [ ] App built (`npm run build`)
- [ ] PM2 running app on port 4000
- [ ] Nginx configured and running
- [ ] DNS A records pointing to 217.117.2.102
- [ ] Cloudflare proxy enabled (orange cloud)
- [ ] SSL/TLS working (https://)
- [ ] Website accessible at https://codenova.cc
- [ ] Contact form working
- [ ] GitHub Actions workflow running successfully

---

**Need help?** Check the logs first, then review the troubleshooting section above.
