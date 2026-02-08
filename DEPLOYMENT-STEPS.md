# Codenova Web - Production Deployment Steps

## Server Information
- **Public IP**: 217.117.2.101
- **Tailscale IP**: 100.94.190.92
- **Port**: 4000
- **Path**: /codenova-web
- **Public URL**: http://217.117.2.101/codenova-web
- **Direct URL**: http://100.94.190.92:4000/codenova-web

---

## Step 1: Build Application

```bash
cd /home/sadiq/codenova-web
npm run build
```

This creates the `.output` directory with the production server.

---

## Step 2: Update Nginx Configuration

### Option A: Manual Edit

```bash
sudo nano /etc/nginx/sites-available/pemacs
```

Copy the contents from `nginx-codenova-block.conf` and paste **before** the Malbusiness `location /` block.

### Option B: Quick Insert (Automated)

```bash
# Backup current config
sudo cp /etc/nginx/sites-available/pemacs /etc/nginx/sites-available/pemacs.backup

# The nginx-codenova-block.conf file contains the configuration
# You'll need to manually insert it in the correct location
# IMPORTANT: Must be BEFORE the "location /" block for Malbusiness
```

---

## Step 3: Test Nginx Configuration

```bash
sudo nginx -t
```

Expected output:
```
nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
nginx: configuration file /etc/nginx/nginx.conf test is successful
```

---

## Step 4: Reload Nginx

```bash
sudo systemctl reload nginx
```

Or restart if needed:
```bash
sudo systemctl restart nginx
```

---

## Step 5: Start Application with PM2

```bash
cd /home/sadiq/codenova-web
pm2 start ecosystem.config.cjs
pm2 save
```

---

## Step 6: Verify Deployment

### Check PM2 Status
```bash
pm2 list
```

Should show `codenova-web` with status `online`.

### Check Logs
```bash
pm2 logs codenova-web --lines 50
```

### Test Direct Access (Tailscale)
```bash
curl http://100.94.190.92:4000/codenova-web
```

### Test Public Access
```bash
curl http://217.117.2.101/codenova-web
```

Or visit in browser:
- **Public**: http://217.117.2.101/codenova-web
- **Direct**: http://100.94.190.92:4000/codenova-web

---

## Step 7: Monitor Application

### View Real-time Logs
```bash
pm2 logs codenova-web
```

### Check Resource Usage
```bash
pm2 monit
```

### Restart if Needed
```bash
pm2 restart codenova-web
```

---

## Troubleshooting

### 502 Bad Gateway
- Check if app is running: `pm2 list`
- Check logs: `pm2 logs codenova-web`
- Restart app: `pm2 restart codenova-web`

### 404 Not Found
- Verify Nginx config includes Codenova block
- Check baseURL in nuxt.config.ts matches `/codenova-web/`
- Test direct access to port 4000

### Static Assets Not Loading
- Check if `/_nuxt/` location block is present in Nginx
- Verify build completed successfully: `ls -la .output/public/_nuxt/`

### Port Already in Use
```bash
# Check what's using port 4000
sudo lsof -i :4000

# If old process, kill it
pm2 delete codenova-web
pm2 start ecosystem.config.cjs
```

---

## Complete Nginx Block Location

The Nginx configuration should look like this:

```nginx
server {
    listen 80;
    server_name 217.117.2.101;

    # ... global settings ...

    #-----------------------------------------------------------
    # PEMACS Routes
    #-----------------------------------------------------------
    location /pemacs/api/ { ... }
    location /pemacs/_nuxt/ { ... }
    location /pemacs { ... }

    #-----------------------------------------------------------
    # Codenova Web Routes (NEW)
    #-----------------------------------------------------------
    location /codenova-web/_nuxt/ { ... }
    location /codenova-web { ... }

    #-----------------------------------------------------------
    # Malbusiness Routes (Default - MUST BE LAST)
    #-----------------------------------------------------------
    location / { ... }
}
```

**CRITICAL**: The `location /` block must always be last, as it's a catch-all route.

---

## PM2 Ecosystem Configuration

Already configured in `ecosystem.config.cjs`:

```javascript
{
  name: 'codenova-web',
  script: './.output/server/index.mjs',
  cwd: '/home/sadiq/codenova-web',
  exec_mode: 'cluster',
  instances: 2,
  autorestart: true,
  watch: false,
  max_memory_restart: '1G',
  env: {
    NODE_ENV: 'production',
    NITRO_PORT: 4000,
    NUXT_APP_BASE_URL: '/codenova-web',
    NUXT_PUBLIC_SITE_URL: 'http://217.117.2.102'
  },
  error_file: './logs/error.log',
  out_file: './logs/out.log',
  log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
  merge_logs: true
}
```

---

## Post-Deployment Checklist

- [ ] Application builds without errors
- [ ] Nginx configuration tested with `sudo nginx -t`
- [ ] Nginx reloaded successfully
- [ ] PM2 process running and healthy
- [ ] Direct access works (http://100.94.190.92:4000/codenova-web)
- [ ] Public access works (http://217.117.2.102/codenova-web)
- [ ] Static assets loading correctly
- [ ] Navigation works across all pages
- [ ] Contact form submits successfully
- [ ] GitHub API integration working
- [ ] No errors in PM2 logs
- [ ] PM2 saved for auto-restart on reboot

---

## Future Updates

To update the application:

```bash
# Pull latest code
cd /home/sadiq/codenova-web
git pull

# Install dependencies (if package.json changed)
npm install

# Build new version
npm run build

# Restart PM2 process
pm2 restart codenova-web

# Check logs
pm2 logs codenova-web --lines 20
```

---

**Deployment Date**: TBD  
**Deployed By**: Development Team  
**Status**: Ready for deployment
