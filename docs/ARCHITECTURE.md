# Codenova Innovations - Architecture & Project Structure

## Architecture Overview

### Application Type
**Hybrid SSR + Static Site** - Leveraging Nuxt 3's rendering flexibility:
- **Static Pages**: About, Capabilities (pre-rendered at build)
- **SSR Pages**: Home, Projects, Stack (server-rendered for dynamic GitHub data)
- **API Routes**: GitHub integration, contact form handling

### Rendering Strategy
```
┌─────────────────────────────────────────┐
│  Browser Request                         │
└─────────────────┬───────────────────────┘
                  │
      ┌───────────▼──────────┐
      │  Nuxt Server (Nitro) │
      └───────────┬──────────┘
                  │
      ┌───────────▼──────────────────┐
      │  Route Type Detection         │
      └───────────┬──────────────────┘
                  │
      ┌───────────▼───────────┬───────────────┐
      │                       │               │
┌─────▼─────┐      ┌─────────▼────┐   ┌──────▼──────┐
│  Static   │      │  SSR (GitHub │   │  API Routes │
│  (About,  │      │  data, dynamic│   │  (Server    │
│  Caps)    │      │  content)     │   │  functions) │
└───────────┘      └──────────────┘   └─────────────┘
```

## Project Structure (Detailed)

```
codenova-web/
│
├── .github/
│   └── workflows/
│       └── deploy.yml              # CI/CD for Vercel/self-hosted
│
├── .vscode/
│   ├── extensions.json             # Recommended extensions
│   └── settings.json               # Workspace settings
│
├── app/                            # Nuxt 3 app directory
│   ├── app.vue                     # Root component
│   │
│   ├── components/                 # Vue components
│   │   ├── global/                 # Auto-imported components
│   │   │   ├── TheHeader.vue       # Site header with navigation
│   │   │   ├── TheFooter.vue       # Site footer with copyright
│   │   │   └── Container.vue       # Content wrapper with max-width
│   │   │
│   │   ├── home/                   # Home page components
│   │   │   ├── HeroSection.vue     # Hero with gradient background
│   │   │   ├── StatsSection.vue    # By the numbers section
│   │   │   ├── PhilosophySection.vue
│   │   │   └── FeaturedProjects.vue
│   │   │
│   │   ├── projects/               # Projects page components
│   │   │   ├── ProjectCard.vue     # Individual project card
│   │   │   ├── ProjectGrid.vue     # Grid layout for projects
│   │   │   ├── ProjectStats.vue    # Overall statistics
│   │   │   └── ProjectFilter.vue   # Filter by language/topic
│   │   │
│   │   ├── stack/                  # Stack page components
│   │   │   ├── TechCategory.vue    # Category container
│   │   │   ├── TechStackItem.vue   # Individual technology card
│   │   │   └── ProficiencyBar.vue  # Skill level indicator
│   │   │
│   │   ├── about/                  # About page components
│   │   │   ├── ContactForm.vue     # Contact form with validation
│   │   │   ├── CompanyInfo.vue     # Company details section
│   │   │   └── SocialLinks.vue     # GitHub, email links
│   │   │
│   │   └── ui/                     # Reusable UI components
│   │       ├── Button.vue          # Primary, secondary, ghost variants
│   │       ├── Card.vue            # Glass-morphism card
│   │       ├── Badge.vue           # Tech stack badges
│   │       ├── Input.vue           # Form input
│   │       ├── Textarea.vue        # Form textarea
│   │       └── Modal.vue           # Modal dialog (project details)
│   │
│   ├── composables/                # Vue composables
│   │   ├── useGitHub.ts            # GitHub API integration
│   │   ├── useAnimations.ts        # GSAP animation helpers
│   │   ├── useContact.ts           # Contact form logic
│   │   ├── usePageMeta.ts          # SEO meta tags helper
│   │   └── useScrollTrigger.ts     # Scroll-based animations
│   │
│   ├── layouts/                    # Page layouts
│   │   └── default.vue             # Default layout with header/footer
│   │
│   ├── pages/                      # File-based routing
│   │   ├── index.vue               # Home page (/)
│   │   ├── capabilities.vue        # Capabilities page (/capabilities)
│   │   ├── projects.vue            # Projects page (/projects)
│   │   ├── stack.vue               # Tech stack page (/stack)
│   │   └── about.vue               # About & contact (/about)
│   │
│   ├── assets/                     # Uncompiled assets
│   │   └── css/
│   │       └── main.css            # Tailwind directives, custom styles
│   │
│   └── utils/                      # Utility functions
│       ├── formatDate.ts           # Date formatting
│       ├── parseGitHubUrl.ts       # GitHub URL parsing
│       └── validators.ts           # Form validation helpers
│
├── server/                         # Nuxt server directory
│   ├── api/                        # API routes
│   │   ├── github/
│   │   │   ├── repos.get.ts        # GET /api/github/repos
│   │   │   └── stats.get.ts        # GET /api/github/stats
│   │   └── contact.post.ts         # POST /api/contact
│   │
│   ├── middleware/                 # Server middleware
│   │   ├── cache.ts                # Response caching
│   │   └── rateLimit.ts            # Rate limiting for contact form
│   │
│   └── utils/                      # Server utilities
│       ├── cache.ts                # Server-side caching logic
│       ├── email.ts                # Email sending (SendGrid/Resend)
│       └── github.ts               # GitHub API helpers
│
├── public/                         # Static assets (served as-is)
│   ├── favicon.ico
│   ├── robots.txt
│   ├── logo.svg                    # Codenova logo
│   └── images/
│       ├── og-image.png            # Open Graph image
│       └── tech-logos/             # Technology logos
│           ├── vue.svg
│           ├── nuxt.svg
│           ├── nestjs.svg
│           └── ...
│
├── types/                          # TypeScript type definitions
│   ├── github.d.ts                 # GitHub API types
│   ├── contact.d.ts                # Contact form types
│   └── components.d.ts             # Component prop types
│
├── .env.example                    # Environment variables template
├── .gitignore
├── .prettierrc                     # Prettier configuration
├── eslint.config.mjs               # ESLint configuration
├── nuxt.config.ts                  # Nuxt configuration
├── package.json
├── tailwind.config.ts              # Tailwind configuration
├── tsconfig.json                   # TypeScript configuration
│
├── ARCHITECTURE.md                 # This file
├── CONTENT-PLAN.md                 # Content planning
├── DESIGN.md                       # Design system
├── TECH-STACK.md                   # Technology decisions
└── README.md                       # Project overview
```

## Component Architecture

### Component Hierarchy
```
app.vue
└── layouts/default.vue
    ├── TheHeader
    │   ├── Logo
    │   ├── Navigation (Desktop)
    │   └── MobileMenu (Mobile)
    │       └── Navigation (Mobile)
    │
    ├── <Page Content>
    │   └── (Page-specific components)
    │
    └── TheFooter
        ├── CompanyInfo
        ├── SocialLinks
        └── Copyright
```

### Component Design Principles
1. **Single Responsibility**: Each component has one clear purpose
2. **Composability**: Components can be nested and reused
3. **Props Down, Events Up**: Data flows down, events bubble up
4. **Composition API**: Use `<script setup>` for all components
5. **Type Safety**: Props and emits defined with TypeScript
6. **Auto-imports**: Global components in `components/global/`

## Data Flow Architecture

### GitHub Data Flow
```
┌──────────────┐
│ Browser      │
│ /projects    │
└──────┬───────┘
       │ Request
       ▼
┌──────────────────┐
│ Nuxt Server      │
│ pages/projects   │
└──────┬───────────┘
       │ useGitHub()
       ▼
┌──────────────────┐
│ Composable       │
│ useGitHub.ts     │
└──────┬───────────┘
       │ Fetch from API
       ▼
┌──────────────────┐
│ Server Route     │
│ /api/github/repos│
└──────┬───────────┘
       │ Check cache
       ▼
┌──────────────────┐         ┌──────────────┐
│ Cache (60min)    │←────────│ GitHub API   │
│ (server memory)  │ Fetch if│ (Octokit)    │
└──────┬───────────┘ expired └──────────────┘
       │ Return data
       ▼
┌──────────────────┐
│ Render with data │
│ ProjectCard x N  │
└──────────────────┘
```

### Contact Form Flow
```
┌──────────────┐
│ ContactForm  │
│ Component    │
└──────┬───────┘
       │ @submit
       ▼
┌──────────────────┐
│ useContact()     │
│ Validate locally │
└──────┬───────────┘
       │ POST /api/contact
       ▼
┌──────────────────┐
│ Server Route     │
│ contact.post.ts  │
└──────┬───────────┘
       │
       ├─► Rate limit check
       ├─► Honeypot validation
       ├─► Schema validation (Yup)
       │
       ▼
┌──────────────────┐
│ Send Email       │
│ (SendGrid/Resend)│
└──────┬───────────┘
       │ Success/Error
       ▼
┌──────────────────┐
│ Return response  │
│ to client        │
└──────────────────┘
```

## State Management

### Approach: Composables Over Store
**Why**: For this small site, Pinia store is overkill. Use composables for shared state.

```typescript
// composables/useGitHub.ts
export const useGitHub = () => {
  const repos = useState<Repository[]>('github-repos', () => [])
  const stats = useState<GitHubStats | null>('github-stats', () => null)
  const loading = useState<boolean>('github-loading', () => false)
  
  const fetchRepos = async () => {
    loading.value = true
    const data = await $fetch('/api/github/repos')
    repos.value = data
    loading.value = false
  }
  
  return { repos, stats, loading, fetchRepos }
}
```

### Global State (via useState)
- `github-repos`: Repository data (shared across Projects/Home pages)
- `github-stats`: Overall statistics
- `github-loading`: Loading state
- `contact-status`: Contact form submission status

## API Route Architecture

### GitHub API Routes
**File**: `server/api/github/repos.get.ts`
```typescript
export default defineEventHandler(async (event) => {
  // Check cache first
  const cached = await getCachedData('github:repos')
  if (cached) return cached
  
  // Fetch from GitHub
  const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN })
  const { data } = await octokit.repos.listForUser({
    username: 'donzeg',
    sort: 'updated',
    per_page: 100
  })
  
  // Filter and transform
  const repos = data
    .filter(repo => !repo.fork && !repo.archived)
    .map(transformRepo)
  
  // Cache for 60 minutes
  await setCachedData('github:repos', repos, 3600)
  
  return repos
})
```

### Contact Form Route
**File**: `server/api/contact.post.ts`
```typescript
export default defineEventHandler(async (event) => {
  // Rate limiting
  await checkRateLimit(event)
  
  // Parse and validate body
  const body = await readBody(event)
  const validated = await contactSchema.validate(body)
  
  // Send email
  await sendContactEmail(validated)
  
  return { success: true, message: 'Message sent successfully' }
})
```

## Caching Strategy

### Server-Side Cache (In-Memory)
```typescript
// server/utils/cache.ts
const cache = new Map<string, { data: any; expires: number }>()

export const getCachedData = (key: string) => {
  const item = cache.get(key)
  if (!item) return null
  if (Date.now() > item.expires) {
    cache.delete(key)
    return null
  }
  return item.data
}

export const setCachedData = (key: string, data: any, ttl: number) => {
  cache.set(key, {
    data,
    expires: Date.now() + (ttl * 1000)
  })
}
```

### Cache Keys
- `github:repos` - Repository list (60 min TTL)
- `github:stats` - Profile statistics (60 min TTL)
- `github:user` - User profile (120 min TTL)

### Client-Side Cache
- Browser cache for static assets (1 year)
- API responses cached in `useState` during session

## Performance Optimizations

### Code Splitting
- Automatic route-based splitting by Nuxt
- Dynamic imports for heavy components:
  ```typescript
  const Modal = defineAsyncComponent(() => import('./Modal.vue'))
  ```

### Image Optimization
```vue
<NuxtImg
  src="/images/project.png"
  width="600"
  height="400"
  format="webp"
  loading="lazy"
  alt="Project screenshot"
/>
```

### Font Loading
```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  app: {
    head: {
      link: [
        {
          rel: 'preconnect',
          href: 'https://fonts.googleapis.com'
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap'
        }
      ]
    }
  }
})
```

### Critical CSS
- Tailwind's PurgeCSS automatically removes unused styles
- Critical path CSS inlined by Nuxt

## Security Architecture

### API Route Protection
- Rate limiting on contact form (5 req/hour per IP)
- Honeypot field for spam prevention
- Input validation with Yup schema
- CORS headers configured

### Environment Variables
```env
# Required
GITHUB_USERNAME=donzeg
CONTACT_EMAIL=codenovainnovations@gmail.com

# Optional (improves rate limits)
GITHUB_TOKEN=ghp_xxx

# Email service
SENDGRID_API_KEY=xxx
# OR
RESEND_API_KEY=xxx

# Production URL
NUXT_PUBLIC_SITE_URL=https://codenovainnovations.com
```

### Headers (Security)
```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  nitro: {
    routeRules: {
      '/**': {
        headers: {
          'X-Frame-Options': 'DENY',
          'X-Content-Type-Options': 'nosniff',
          'Referrer-Policy': 'strict-origin-when-cross-origin',
          'Permissions-Policy': 'camera=(), microphone=(), geolocation=()'
        }
      }
    }
  }
})
```

## Deployment Architecture

### Build Process
```bash
npm run build
# Generates .output/ directory with:
# - .output/public/ - Static assets
# - .output/server/ - Server code (Nitro)
```

### Deployment Options

**Option 1: Vercel (Recommended)**
```bash
vercel deploy
```
- Zero config
- Automatic HTTPS
- Edge network
- Serverless functions for API routes

**Option 2: Self-Hosted (PM2)**
```bash
# On production server
pm2 start ecosystem.config.cjs
```
```javascript
// ecosystem.config.cjs
module.exports = {
  apps: [{
    name: 'codenova-web',
    script: '.output/server/index.mjs',
    env: {
      NODE_ENV: 'production',
      NITRO_PORT: 3001
    }
  }]
}
```

### Nginx Configuration (Self-Hosted)
```nginx
server {
    listen 80;
    server_name codenovainnovations.com;
    
    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## Monitoring & Analytics

### Performance Monitoring
- Vercel Analytics (built-in on Vercel)
- Web Vitals tracked automatically
- Lighthouse CI in GitHub Actions

### Error Tracking
- Console errors captured in production
- API route error logging
- GitHub API rate limit monitoring

## Development Workflow

### Local Development
```bash
npm run dev
# Runs on http://localhost:3000
# Hot module replacement enabled
# API routes available at /api/*
```

### Type Checking
```bash
npm run type-check
# Runs TypeScript compiler in check mode
```

### Linting & Formatting
```bash
npm run lint        # ESLint check
npm run lint:fix    # ESLint auto-fix
npm run format      # Prettier format
```

### Pre-Commit Hooks (Future)
```bash
# .husky/pre-commit
npm run type-check
npm run lint
```

## Scalability Considerations

### Current Scale (Phase 1)
- 5 pages, minimal dynamic data
- GitHub API: ~100 repos max
- Contact form: <100 submissions/month
- Traffic: <10K visitors/month

### Future Scale (Phase 2+)
- Add blog with MDC (Markdown Components)
- Case studies with rich media
- Increased GitHub data (multiple accounts)
- Higher traffic volume

### Scaling Strategy
- Move cache to Redis if needed
- Implement CDN for images
- Add database for blog content (PostgreSQL)
- Edge caching for static pages

## Testing Strategy (Future)

### Unit Tests (Vitest)
```
tests/
├── unit/
│   ├── composables/
│   │   └── useGitHub.spec.ts
│   └── utils/
│       └── validators.spec.ts
```

### Component Tests (Vitest + Testing Library)
```
tests/
├── components/
│   ├── ContactForm.spec.ts
│   └── ProjectCard.spec.ts
```

### E2E Tests (Playwright)
```
e2e/
├── home.spec.ts
├── projects.spec.ts
└── contact.spec.ts
```

## Documentation Standards

### Component Documentation
```vue
<script setup lang="ts">
/**
 * ProjectCard - Displays individual GitHub repository information
 * 
 * @component
 * @example
 * <ProjectCard :repo="repoData" />
 */

interface Props {
  /** GitHub repository object from API */
  repo: Repository
  /** Show extended details (default: false) */
  extended?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  extended: false
})
</script>
```

### API Route Documentation
```typescript
/**
 * GET /api/github/repos
 * 
 * Fetches all public repositories for configured GitHub user.
 * Implements 60-minute cache to avoid rate limits.
 * 
 * @returns {Repository[]} Array of repository objects
 * @throws {404} If user not found
 * @throws {429} If rate limit exceeded
 */
export default defineEventHandler(async (event) => {
  // Implementation
})
```

---

## Architecture Decisions Record (ADR)

### ADR-001: Nuxt 3 Over Plain Vue
**Decision**: Use Nuxt 3 framework instead of Vite + Vue
**Rationale**: SSR for SEO, file-based routing, server API routes, built-in optimizations
**Status**: Accepted

### ADR-002: Composables Over Pinia
**Decision**: Use composables with `useState` for state management
**Rationale**: Site is small, Pinia adds unnecessary complexity
**Status**: Accepted

### ADR-003: In-Memory Cache Over Redis
**Decision**: Use Map-based in-memory cache for initial version
**Rationale**: Simple, no external dependencies, sufficient for current scale
**Status**: Accepted, revisit at 100K+ visitors/month

### ADR-004: GitHub API Integration
**Decision**: Fetch from GitHub API at request time with caching
**Rationale**: Always shows latest data, no manual updates needed
**Status**: Accepted

### ADR-005: Dark Mode Only
**Decision**: No light mode, dark theme only
**Rationale**: Brand identity, developer aesthetic, simpler implementation
**Status**: Accepted

---

**Last Updated**: February 6, 2026
**Next Review**: After Phase 1 deployment
