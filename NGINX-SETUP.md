# Nginx Reverse Proxy Setup Guide

## Overview
This application runs on **port 3002** and is accessed via Nginx reverse proxy at:
- **URL**: http://100.94.190.92/codenova-web/
- **Internal Port**: 3002

## Step-by-Step Setup

### 1. Add Nginx Configuration

Edit your main Nginx configuration file:
```bash
sudo nano /etc/nginx/sites-available/default
```

Add this location block inside your existing `server { }` block:

```nginx
# Codenova Innovations Website
location /codenova-web/ {
    proxy_pass http://localhost:3002/codenova-web/;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_cache_bypass $http_upgrade;
    
    # Timeout settings
    proxy_connect_timeout 60s;
    proxy_send_timeout 60s;
    proxy_read_timeout 60s;
}

# Static assets optimization (optional)
location /codenova-web/_nuxt/ {
    proxy_pass http://localhost:3002/codenova-web/_nuxt/;
    proxy_cache_valid 200 1y;
    add_header Cache-Control "public, immutable";
}
```

### 2. Test Nginx Configuration

```bash
sudo nginx -t
```

Expected output:
```
nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
nginx: configuration file /etc/nginx/nginx.conf test is successful
```

### 3. Reload Nginx

```bash
sudo systemctl reload nginx
```

### 4. Deploy the Application

From the project directory:
```bash
# Option 1: Use deployment script
./deploy.sh

# Option 2: Manual deployment
npm install
npm run build
pm2 start ecosystem.config.cjs
pm2 save
```

### 5. Verify It's Running

Check PM2 status:
```bash
pm2 status
```

Check if app is listening on port 3002:
```bash
curl http://localhost:3002/codenova-web/
```

Check via Nginx:
```bash
curl http://100.94.190.92/codenova-web/
```

## Application Architecture

```
Browser Request
     ↓
http://100.94.190.92/codenova-web/
     ↓
Nginx (Port 80)
     ↓
Reverse Proxy
     ↓
Nuxt App (Port 3002)
```

## Troubleshooting

### App not accessible
```bash
# Check if Nuxt is running
pm2 status codenova-web

# Check logs
pm2 logs codenova-web

# Restart
pm2 restart codenova-web
```

### Nginx 502 Bad Gateway
```bash
# Check if port 3002 is listening
netstat -tulpn | grep 3002

# Check Nginx error logs
sudo tail -f /var/log/nginx/error.log
```

### Port already in use
```bash
# Find what's using port 3002
sudo lsof -i :3002

# Kill the process (if needed)
sudo kill -9 <PID>
```

## PM2 Commands

```bash
# Start
pm2 start ecosystem.config.cjs

# Stop
pm2 stop codenova-web

# Restart
pm2 restart codenova-web

# Delete
pm2 delete codenova-web

# Logs
pm2 logs codenova-web

# Monitor
pm2 monit

# Save process list
pm2 save
```

## Environment Variables

Located in `.env`:
- `NITRO_PORT=3002` - Application port
- `GITHUB_USERNAME=donzeg` - GitHub username for API
- `CONTACT_EMAIL=codenovainnovations@gmail.com` - Contact form email
- `NUXT_PUBLIC_SITE_URL=http://100.94.190.92` - Public site URL

## Current Setup

Your server should now have these apps running:
- `/pemacs` → Port 300X (PEMACS application)
- `/jax` → Port 300Y (Jax application)  
- `/codenova-web` → **Port 3002** (Codenova website)

All accessible via: **http://100.94.190.92/{app-name}**
