# Codenova Innovations Website

Official company website for Codenova Innovations Ltd (RC 7144941)

## Project Overview

Innovation-focused website showcasing technical capabilities, projects, and IoT solutions.

**Status:** ✅ Production Ready  
**Live:** http://217.117.2.101/codenova-web/  
**Port:** 4000 (proxied via Nginx)

## Tech Stack

- **Framework:** Nuxt 3.4.0
- **Language:** TypeScript (Strict Mode)
- **Styling:** Tailwind CSS 3 with Custom Design System
- **Animations:** GSAP with ScrollTrigger
- **Email:** Resend API
- **Theme:** Dark Mode Tech Lab
- **Deployment:** Self-hosted (Nginx + PM2)

## Features

✅ **5 Complete Pages** - Home, Capabilities, Projects, Stack, About  
✅ **GSAP Scroll Animations** - Smooth, professional animations  
✅ **GitHub API Integration** - Live project showcase with caching  
✅ **Email Contact Form** - Resend integration with validation  
✅ **Type-Safe Development** - TypeScript strict mode throughout  
✅ **Production Optimized** - SSR, caching, lazy loading  
✅ **Custom Branding** - Logo, favicon, OG images included  

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Copy the example file and add your API keys:

```bash
cp .env.example .env
```

Required environment variables:
- `GITHUB_USERNAME` - Your GitHub username (default: donzeg)
- `GITHUB_TOKEN` - GitHub Personal Access Token (optional, increases rate limit to 5000/hour)
- `RESEND_API_KEY` - Resend API key for contact form emails
- `CONTACT_EMAIL` - Email to receive contact form submissions

For PM2 deployment, edit `ecosystem.config.cjs` (copy from `ecosystem.config.example.cjs`):
```javascript
env: {
  GITHUB_TOKEN: 'your_github_token',
  RESEND_API_KEY: 'your_resend_key',
  // ... other vars
}
```

### 3. Development Server

Start the development server:

```bash
npm run dev
```

Access at: **http://localhost:4000/codenova-web/**

## Production Deployment

### Build

```bash
npm run build
```

### PM2 Deployment

```bash
# Start with PM2
pm2 start ecosystem.config.cjs

# Save PM2 process list
pm2 save

# View logs
pm2 logs codenova-web

# Restart after changes
pm2 restart codenova-web --update-env
```

### Nginx Configuration

Add this to your Nginx server block:

```nginx
# Static assets (with caching)
location /codenova-web/_nuxt/ {
    proxy_pass http://localhost:4000/codenova-web/_nuxt/;
    proxy_http_version 1.1;
    proxy_cache_valid 200 60m;
    add_header Cache-Control "public, max-age=31536000, immutable";
}

# Main application
location /codenova-web/ {
    proxy_pass http://localhost:4000;
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

Reload Nginx:
```bash
sudo nginx -t && sudo systemctl reload nginx
```

## API Keys Setup

### GitHub Personal Access Token
1. Go to https://github.com/settings/tokens
2. Click "Generate new token (classic)"
3. Select scopes: `public_repo` (or `repo` for private repos)
4. Copy the token and add to environment

### Resend API Key
1. Sign up at https://resend.com
2. Navigate to API Keys section
3. Create a new API key
4. Add to environment variables

## Project Structure

```
codenova-web/
├── assets/css/           # Tailwind CSS configuration
├── components/           # Vue components
│   ├── global/          # Auto-imported (Header, Footer, Container)
│   └── ui/              # UI components (Button, Card, Badge, Modal)
├── composables/          # Vue composables
│   ├── useGitHub.ts     # GitHub API integration
│   ├── useContact.ts    # Contact form logic
│   ├── useAnimations.ts # GSAP animations
│   └── useScrollTrigger.ts # Scroll animations
├── pages/               # File-based routing
│   ├── index.vue        # Home page
│   ├── capabilities.vue # Services page
│   ├── projects.vue     # Portfolio page
│   ├── stack.vue        # Technology stack
│   └── about.vue        # About & contact
├── server/
│   ├── api/             # API routes
│   │   ├── github/      # GitHub endpoints
│   │   └── contact.post.ts # Contact form handler
│   └── utils/
│       └── email.ts     # Email sending utility
├── public/              # Static assets
│   ├── logo.svg
│   ├── favicon.svg
│   └── og-image.svg
└── types/               # TypeScript definitions
```

## Documentation

- [ARCHITECTURE.md](docs/ARCHITECTURE.md) - System architecture and data flow
- [DESIGN.md](docs/DESIGN.md) - Visual design system and branding
- [TECH-STACK.md](docs/TECH-STACK.md) - Technology decisions and rationale
- [CONTENT-PLAN.md](docs/CONTENT-PLAN.md) - Content structure for all pages
- [DEPLOYMENT.md](docs/DEPLOYMENT.md) - Deployment guide

## Contact

**Codenova Innovations Ltd**  
RC: 7144941 | Nigeria  
Email: codenovainnovations@gmail.com  
Phone: +234 806 496 2174  
GitHub: [@donzeg](https://github.com/donzeg)

---

© 2026 Codenova Innovations Ltd. All Rights Reserved.

