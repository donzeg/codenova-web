# Multi-Application Nginx Reverse Proxy Setup

## Overview
This document describes the production server configuration for hosting multiple applications on a single public IP address using Nginx reverse proxy with path-based routing.

**Server**: 217.117.2.101  
**Public Port**: 80 (HTTP) - Single port for all applications  
**Architecture**: Nginx reverse proxy → Internal application ports

---

## Current Applications (2)

### 1. Malbusiness
- **Public URL**: `http://217.117.2.101/`
- **Technology**: Next.js (Full-stack)
- **Internal Port**: 3000
- **Type**: Monolithic (Frontend + API in one app)

### 2. PEMACS (Asset Management)
- **Public URL**: `http://217.117.2.101/pemacs`
- **Technology**: Nuxt 3 (Frontend) + NestJS (Backend API)
- **Internal Ports**: 
  - Frontend: 8080
  - Backend API: 5000
- **Type**: Microservices (Separate frontend and backend)

---

## Port Allocation Plan (10 Applications)

### Port Assignment Strategy
- **Frontend Ports**: 3000-3999 range
- **Backend API Ports**: 5000-5999 range
- **Database Ports**: 5432 (PostgreSQL), 6379 (Redis) - Internal only, never exposed

### Port Allocation Table

| App Name      | Path              | Frontend Port | Backend Port | Technology        | Status      |
|---------------|-------------------|---------------|--------------|-------------------|-------------|
| Malbusiness   | `/`               | 3000          | N/A          | Next.js           | ✅ Active   |
| PEMACS        | `/pemacs`         | 8080*         | 5000         | Nuxt + NestJS     | ✅ Active   |
| Codenova      | `/codenova-web`   | 4000          | N/A          | Nuxt 3            | ✅ Active   |
| App4          | `/app4`           | 3002          | 5002         | TBD               | 📋 Reserved |
| App5          | `/app5`      | 3003          | 5003         | TBD               | 📋 Reserved |
| App6          | `/app6`      | 3004          | 5004         | TBD               | 📋 Reserved |
| App7          | `/app7`      | 3005          | 5005         | TBD               | 📋 Reserved |
| App8          | `/app8`      | 3006          | 5006         | TBD               | 📋 Reserved |
| App9          | `/app9`      | 3007          | 5007         | TBD               | 📋 Reserved |
| App10         | `/app10`     | 3008          | 5008         | TBD               | 📋 Reserved |

*Note: PEMACS frontend on port 8080 can be migrated to 3001 for consistency*

---

## Nginx Configuration

### Location: `/etc/nginx/sites-available/pemacs`

```nginx
server {
    listen 80;
    server_name 217.117.2.101;

    # Global settings
    proxy_connect_timeout 600;
    proxy_send_timeout 600;
    proxy_read_timeout 600;
    send_timeout 600;
    client_max_body_size 50M;

    # Compression
    gzip on;
    gzip_vary on;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types text/plain text/css text/xml text/javascript 
               application/json application/javascript 
               application/xml+rss application/rss+xml 
               font/truetype font/opentype 
               application/vnd.ms-fontobject image/svg+xml;

    #-----------------------------------------------------------
    # PEMACS Routes
    #-----------------------------------------------------------
    location /pemacs/api/ {
        proxy_pass http://localhost:5000/api/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    location /pemacs/_nuxt/ {
        proxy_pass http://localhost:8080/_nuxt/;
        proxy_http_version 1.1;
        proxy_cache_valid 200 60m;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }

    location /pemacs {
        proxy_pass http://localhost:8080;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    #-----------------------------------------------------------
    # App3 Routes (Example for future apps)
    #-----------------------------------------------------------
    # location /app3/api/ {
    #     proxy_pass http://localhost:5001/api/;
    #     # ... same proxy settings as above
    # }
    #
    # location /app3 {
    #     proxy_pass http://localhost:3001;
    #     # ... same proxy settings as above
    # }

    #-----------------------------------------------------------
    # App4 Routes
    #-----------------------------------------------------------
    # location /app4/api/ {
    #     proxy_pass http://localhost:5002/api/;
    # }
    #
    # location /app4 {
    #     proxy_pass http://localhost:3002;
    # }

    #-----------------------------------------------------------
    # App5-App10 (Follow same pattern)
    #-----------------------------------------------------------
    # Pattern:
    # location /app{N}/api/ { proxy_pass http://localhost:500{N}/api/; }
    # location /app{N} { proxy_pass http://localhost:300{N}; }

    #-----------------------------------------------------------
    # Malbusiness Routes (Default - Must be last)
    #-----------------------------------------------------------
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

## PM2 Process Manager Configuration

### Location: `/home/sadiq/PEMACS-Vue/ecosystem.config.cjs`

```javascript
module.exports = {
  apps: [
    //==========================================================
    // PEMACS API (Backend)
    //==========================================================
    {
      name: 'pemacs-api',
      script: 'dist/src/main.js',
      cwd: '/home/sadiq/PEMACS-Vue/pemacs-api',
      exec_mode: 'fork',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '512M',
      env: {
        NODE_ENV: 'production',
        PORT: 5000
      },
      error_file: '/tmp/pemacs-api-error.log',
      out_file: '/tmp/pemacs-api-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true
    },

    //==========================================================
    // PEMACS Frontend
    //==========================================================
    {
      name: 'pemacs-frontend',
      script: '.output/server/index.mjs',
      cwd: '/home/sadiq/PEMACS-Vue',
      exec_mode: 'fork',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 8080,
        HOST: '0.0.0.0',
        NUXT_APP_BASE_URL: '/pemacs',
        NUXT_PUBLIC_API_BASE: '/pemacs'
      },
      error_file: '/tmp/pemacs-vue-error.log',
      out_file: '/tmp/pemacs-vue-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true
    },

    //==========================================================
    // Malbusiness (Existing)
    //==========================================================
    {
      name: 'malbusiness-web',
      script: 'npm',
      args: 'start',
      cwd: '/path/to/malbusiness',
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      }
    }

    //==========================================================
    // App3 (Example Template for Future Apps)
    //==========================================================
    // {
    //   name: 'app3-api',
    //   script: 'dist/main.js',
    //   cwd: '/home/sadiq/app3/backend',
    //   env: {
    //     NODE_ENV: 'production',
    //     PORT: 5001
    //   }
    // },
    // {
    //   name: 'app3-frontend',
    //   script: '.output/server/index.mjs',
    //   cwd: '/home/sadiq/app3',
    //   env: {
    //     NODE_ENV: 'production',
    //     PORT: 3001,
    //     NUXT_APP_BASE_URL: '/app3',
    //     NUXT_PUBLIC_API_BASE: '/app3/api'
    //   }
    // }
  ]
};
```

---

## Adding a New Application (Step-by-Step)

### Example: Adding "App3" - Inventory Management System

#### Step 1: Assign Ports
- Frontend: **3001** (from port allocation table)
- Backend API: **5001** (from port allocation table)

#### Step 2: Configure Application
**In your app's nuxt.config.ts:**
```typescript
export default defineNuxtConfig({
  app: {
    baseURL: process.env.NUXT_APP_BASE_URL || '/',
  },
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:5001'
    }
  }
})
```

#### Step 3: Add PM2 Configuration
```javascript
// Add to ecosystem.config.cjs
{
  name: 'app3-api',
  script: 'dist/src/main.js',
  cwd: '/home/sadiq/app3/backend',
  env: {
    NODE_ENV: 'production',
    PORT: 5001
  }
},
{
  name: 'app3-frontend',
  script: '.output/server/index.mjs',
  cwd: '/home/sadiq/app3',
  env: {
    NODE_ENV: 'production',
    PORT: 3001,
    NUXT_APP_BASE_URL: '/app3',
    NUXT_PUBLIC_API_BASE: '/app3/api'
  }
}
```

#### Step 4: Update Nginx Configuration
```bash
sudo nano /etc/nginx/sites-available/pemacs
```

Add before the Malbusiness `location /` block:
```nginx
# App3 Routes
location /app3/api/ {
    proxy_pass http://localhost:5001/api/;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_cache_bypass $http_upgrade;
}

location /app3 {
    proxy_pass http://localhost:3001;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_cache_bypass $http_upgrade;
}
```

#### Step 5: Test and Reload Nginx
```bash
sudo nginx -t
sudo systemctl reload nginx
```

#### Step 6: Start Application with PM2
```bash
pm2 start ecosystem.config.cjs --only app3-api,app3-frontend
pm2 save
```

#### Step 7: Verify
- Public: `http://217.117.2.101/app3`
- Tailscale: `http://100.94.190.92:3001` (direct access)

---

## Access Methods

### Public Internet Access (via Nginx)
All applications accessible through port 80 with path routing:
- Malbusiness: `http://217.117.2.101/`
- PEMACS: `http://217.117.2.101/pemacs`
- App3: `http://217.117.2.101/app3`
- App4: `http://217.117.2.101/app4`
- ...

### Tailscale/Internal Direct Access (for development)
Direct port access via Tailscale IP (100.94.190.92):
- Malbusiness: `http://100.94.190.92:3000`
- PEMACS Frontend: `http://100.94.190.92:8080`
- PEMACS API: `http://100.94.190.92:5000`
- App3 Frontend: `http://100.94.190.92:3001`
- App3 API: `http://100.94.190.92:5001`
- ...

---

## Network Configuration

### Required Public Ports
- **Port 80** (HTTP) - Only port exposed to public internet
- **Port 443** (HTTPS) - For SSL/TLS (recommended for production)

### Internal Ports (Not Exposed)
- **3000-3999**: Frontend applications
- **5000-5999**: Backend APIs
- **5432**: PostgreSQL (internal only)
- **6379**: Redis (internal only)

### Firewall Rules (Network Team)
```bash
# Allow HTTP
sudo ufw allow 80/tcp

# Allow HTTPS (when SSL is configured)
sudo ufw allow 443/tcp

# Deny all other ports to public
# Tailscale handles VPN access automatically
```

---

## Best Practices

### 1. Port Management
- Always assign ports from the allocation table
- Update this document when adding new apps
- Keep frontend and backend ports grouped (e.g., 3001 + 5001)

### 2. Naming Conventions
- Use lowercase for path names: `/pemacs`, not `/PEMACS`
- Keep paths short and memorable
- Match path to application name

### 3. Nginx Configuration Order
- Specific paths first (e.g., `/pemacs/api/`, `/pemacs`)
- Default/catch-all (`/`) must be **last**
- API routes before frontend routes for same app

### 4. Security
- Never expose database ports (5432, 6379) to public
- Use environment variables for sensitive config
- Keep `.env` files out of git
- Consider adding SSL/HTTPS certificates

### 5. Monitoring
```bash
# Check Nginx status
sudo systemctl status nginx

# Check PM2 processes
pm2 list

# View logs
pm2 logs app-name

# Check port usage
ss -tlnp | grep -E ':(3000|5000|8080)'
```

---

## Troubleshooting

### Application not accessible
1. Check if app is running: `pm2 list`
2. Check if port is listening: `ss -tlnp | grep PORT`
3. Test Nginx config: `sudo nginx -t`
4. Check Nginx logs: `sudo tail -f /var/log/nginx/error.log`

### 502 Bad Gateway
- Application crashed or not running
- Wrong port in Nginx config
- Check PM2 logs: `pm2 logs app-name`

### 404 Not Found
- Path mismatch between Nginx and app baseURL
- Check app's `NUXT_APP_BASE_URL` setting
- Verify Nginx location blocks

---

## CI/CD Integration

### GitHub Actions Deployment
Current workflow automatically:
1. Builds frontend and backend
2. Syncs files to production server
3. Restarts PM2 processes
4. Environment variables preserved in `.env`

### For new applications:
- Add app to `ecosystem.config.cjs`
- Update Nginx config manually (one-time)
- Deploy via same CI/CD pipeline pattern

---

## Scaling Considerations

### Current Capacity
- **10 applications** planned with current port allocation
- Can scale to 999 apps theoretically (port range 1024-65535)
- Current server resources support ~10-20 apps comfortably

### When to Scale
- Monitor CPU/RAM usage: `htop`
- If memory > 80%, consider vertical scaling
- If apps exceed 20, consider horizontal scaling (multiple servers)

### Upgrade Path
1. Add SSL/HTTPS (Let's Encrypt)
2. Add domain names (app1.domain.com, app2.domain.com)
3. Load balancing with multiple instances per app
4. Database replication/clustering
5. Container orchestration (Docker + Kubernetes)

---

## Document Maintenance

**Last Updated**: January 19, 2026  
**Maintained By**: Development Team  
**Review Frequency**: Update when adding new applications

### Change Log
- **2026-01-19**: Initial documentation with 2 active apps, 8 reserved slots
- **2026-01-19**: Added hybrid Nginx + Tailscale access pattern
- **2026-01-19**: Redis installation and configuration completed
