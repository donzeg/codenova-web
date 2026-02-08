# Codenova Innovations - Technology Stack

## Core Framework

### Nuxt 3 (Latest)
**Why Nuxt 3?**
- Server-side rendering (SSR) for optimal SEO and performance
- File-based routing for intuitive page structure
- Built-in TypeScript support
- Excellent developer experience with auto-imports
- Hybrid rendering (SSR + static generation)
- Built-in performance optimizations

**Configuration Approach**:
- SSR mode for dynamic content (GitHub API integration)
- Static generation for About/Capabilities pages
- Edge-compatible for future deployment to Vercel/Cloudflare

### TypeScript (Strict Mode)
**Why TypeScript?**
- Type safety prevents runtime errors
- Better IDE autocomplete and refactoring
- Self-documenting code through types
- Professional development standard

**Configuration**:
```json
{
  "strict": true,
  "noUncheckedIndexedAccess": true,
  "noImplicitOverride": true
}
```

## Styling & UI

### Tailwind CSS 3
**Why Tailwind?**
- Utility-first approach for rapid development
- Consistent design system through configuration
- Excellent dark mode support with `class` strategy
- Minimal CSS bundle size with PurgeCSS
- No naming conventions needed

**Custom Configuration**:
- Extended color palette (Deep Navy, Electric Blue, Cyan)
- Custom spacing scale
- Typography plugin for consistent text styles
- Forms plugin for styled inputs

### @nuxtjs/color-mode
**Why Color Mode Module?**
- Built-in dark mode management
- SSR-safe theme switching
- Persistent user preferences
- Tailwind integration

**Configuration**:
```js
{
  preference: 'dark', // Force dark mode
  fallback: 'dark',
  classSuffix: ''
}
```

### Headless UI Vue
**Why Headless UI?**
- Unstyled, accessible components
- Full keyboard navigation support
- ARIA-compliant out of the box
- Works perfectly with Tailwind

**Components to Use**:
- Disclosure (for mobile menu)
- Dialog/Modal (for project details)
- Transitions (for smooth animations)

## Icons & Graphics

### Heroicons
**Why Heroicons?**
- Designed by Tailwind team (visual consistency)
- Outline and solid variants
- Tree-shakeable
- Vue 3 compatible

### Iconify (Optional Supplement)
- Brand icons (GitHub, Twitter, LinkedIn)
- DevIcon set for technology logos
- On-demand loading

## API Integration

### Octokit (GitHub REST API)
**Why Octokit?**
- Official GitHub SDK
- TypeScript definitions included
- Rate limiting handling
- Pagination support

**Usage**:
- Fetch public repositories from `donzeg` account
- Display stars, forks, languages
- Show recent activity
- Cache responses to avoid rate limits

### Nuxt Server Routes
**Implementation**:
- `/api/github/repos` - Fetch repositories
- `/api/github/stats` - Aggregate statistics
- Server-side caching (60-minute TTL)
- Error handling with fallback data

## Performance Optimization

### Image Optimization
**@nuxt/image**:
- Automatic WebP/AVIF conversion
- Lazy loading with IntersectionObserver
- Responsive srcset generation
- CDN integration ready

### Caching Strategy
- **Static Assets**: Long-term caching (1 year)
- **GitHub API**: 60-minute cache with stale-while-revalidate
- **Pages**: ISR (Incremental Static Regeneration) where possible

### Code Splitting
- Route-based automatic splitting
- Dynamic imports for heavy components
- Vendor chunk optimization

## Development Tools

### ESLint + Prettier
**Configuration**:
- `@nuxtjs/eslint-config-typescript`
- Prettier for consistent formatting
- Pre-commit hooks with Husky

### Git Workflow
- **Main Branch**: Production-ready code
- **Develop Branch**: Integration branch
- **Feature Branches**: `feature/page-name`
- Conventional Commits: `feat:`, `fix:`, `docs:`, `style:`

## Deployment

### Primary Target: Vercel
**Why Vercel?**
- Native Nuxt 3 support
- Automatic HTTPS
- Edge network for global performance
- Zero-config deployment
- Free tier for personal projects

**Build Configuration**:
```js
{
  target: 'server',
  ssr: true,
  nitro: {
    preset: 'vercel'
  }
}
```

### Alternative: Cloudflare Pages
- Edge runtime support
- Unlimited bandwidth
- Workers integration for API routes

### Self-Hosted Option
- PM2 process manager (consistent with PEMACS)
- Nginx reverse proxy
- SSL via Let's Encrypt
- Deploy to existing infrastructure (100.94.190.92)

## Analytics & Monitoring

### Vercel Analytics (Built-in)
- Real User Monitoring (RUM)
- Web Vitals tracking
- No cookie banner needed

### Alternative: Umami (Privacy-Focused)
- Self-hosted analytics
- GDPR compliant
- Lightweight script (<2KB)

## SEO & Meta Management

### @nuxtjs/seo (Nuxt SEO Kit)
**Features**:
- Automatic sitemap generation
- Robots.txt management
- Open Graph tags
- Twitter Card tags
- JSON-LD structured data

**Configuration**:
```js
{
  site: {
    url: 'https://codenovainnovations.com',
    name: 'Codenova Innovations',
    description: 'Innovation-driven software development',
    defaultLocale: 'en'
  }
}
```

## Form Handling

### VeeValidate + Yup
**Contact Form Validation**:
- Schema-based validation
- Type-safe with TypeScript
- Accessible error messages
- Async validation support

### Form Submission
- Server API route (`/api/contact`)
- Email via SendGrid/Resend API
- Spam protection with honeypot
- Rate limiting

## Animation Libraries

### GSAP (GreenSock)
**Use Cases**:
- Hero section animations
- Scroll-triggered effects
- Page transitions
- Loading animations

**Why GSAP?**
- Performance optimized
- Timeline-based animations
- Easing functions
- Cross-browser compatible

### CSS Transitions (Primary)
- Tailwind transition utilities
- Hardware-accelerated transforms
- Respect prefers-reduced-motion

## Testing (Future Implementation)

### Vitest
- Unit tests for composables
- Component testing
- Fast execution with Vite

### Playwright
- End-to-end testing
- Cross-browser validation
- Visual regression testing

## Environment Variables

```env
# GitHub API
GITHUB_TOKEN=ghp_xxx  # Optional, increases rate limit
GITHUB_USERNAME=donzeg

# Contact Form
SENDGRID_API_KEY=xxx
CONTACT_EMAIL=codenovainnovations@gmail.com

# Analytics (if using Umami)
UMAMI_WEBSITE_ID=xxx
UMAMI_URL=https://analytics.example.com

# Base URL
NUXT_PUBLIC_SITE_URL=https://codenovainnovations.com
```

## Package.json Scripts

```json
{
  "scripts": {
    "dev": "nuxt dev",
    "build": "nuxt build",
    "generate": "nuxt generate",
    "preview": "nuxt preview",
    "postinstall": "nuxt prepare",
    "lint": "eslint .",
    "lint:fix": "eslint . --fix",
    "format": "prettier --write .",
    "type-check": "nuxt typecheck"
  }
}
```

## Dependencies Overview

### Production Dependencies
```json
{
  "nuxt": "^3.14.0",
  "@nuxtjs/tailwindcss": "^6.12.0",
  "@nuxtjs/color-mode": "^3.5.1",
  "@headlessui/vue": "^1.7.23",
  "@heroicons/vue": "^2.1.5",
  "@octokit/rest": "^21.0.2",
  "@nuxtjs/seo": "^2.0.0",
  "gsap": "^3.12.5"
}
```

### Development Dependencies
```json
{
  "@nuxtjs/eslint-config-typescript": "^12.1.0",
  "prettier": "^3.3.3",
  "prettier-plugin-tailwindcss": "^0.6.8",
  "typescript": "^5.6.3"
}
```

## File Structure (Post-Initialization)

```
codenova-web/
├── app/
│   ├── components/
│   │   ├── TheHeader.vue
│   │   ├── TheFooter.vue
│   │   ├── ProjectCard.vue
│   │   ├── TechStackItem.vue
│   │   └── ContactForm.vue
│   ├── composables/
│   │   ├── useGitHub.ts
│   │   └── useAnimations.ts
│   ├── layouts/
│   │   └── default.vue
│   ├── pages/
│   │   ├── index.vue           # Home
│   │   ├── capabilities.vue    # Capabilities
│   │   ├── projects.vue        # Projects
│   │   ├── stack.vue           # Tech Stack
│   │   └── about.vue           # About/Contact
│   └── app.vue
├── server/
│   ├── api/
│   │   ├── github/
│   │   │   ├── repos.get.ts
│   │   │   └── stats.get.ts
│   │   └── contact.post.ts
│   └── utils/
│       └── cache.ts
├── public/
│   ├── favicon.ico
│   ├── robots.txt
│   └── logo.svg
├── assets/
│   └── css/
│       └── main.css
├── types/
│   ├── github.d.ts
│   └── contact.d.ts
├── nuxt.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

## Build Targets

### Production Build
- Minified assets
- Tree-shaking unused code
- Optimized images
- Compressed responses (Brotli/Gzip)

### Development Build
- Hot Module Replacement (HMR)
- Source maps
- Detailed error messages
- Fast rebuild times

## Browser Support
- **Modern Browsers**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **No IE11 Support** (Nuxt 3 requirement)
- Progressive enhancement for older browsers

## Performance Targets
- **Lighthouse Score**: 95+ across all metrics
- **First Contentful Paint (FCP)**: < 1.5s
- **Largest Contentful Paint (LCP)**: < 2.5s
- **Time to Interactive (TTI)**: < 3.5s
- **Cumulative Layout Shift (CLS)**: < 0.1
- **Total Blocking Time (TBT)**: < 200ms

## Future Enhancements
- [ ] Blog section with MDC (Markdown Components)
- [ ] Case studies with detailed project breakdowns
- [ ] Interactive code playground
- [ ] Dark/Light mode toggle (if requested)
- [ ] Multi-language support (i18n)
- [ ] Web Vitals monitoring dashboard
