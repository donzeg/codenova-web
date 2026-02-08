<template>
  <div>
    <!-- Page Header -->
    <section class="py-20 bg-gradient-dark">
      <Container>
        <div class="mx-auto max-w-3xl text-center animate-fade-in-up">
          <h1 class="mb-6 text-heading-1">Our Technology Stack</h1>
          <p class="text-xl text-light-gray">
            Modern tools and frameworks we've mastered through real-world projects
          </p>
        </div>
      </Container>
    </section>

    <!-- Technology Categories -->
    <section class="py-20 bg-deep-navy">
      <Container>
        <div class="space-y-16">
          <div v-for="category in stackCategories" :key="category.name" class="category-section">
            <div class="mb-8">
              <div class="flex items-center mb-3">
                <div class="text-3xl mr-3">{{ category.icon }}</div>
                <h2 class="text-2xl font-bold text-white">{{ category.name }}</h2>
              </div>
              <p class="text-light-gray">{{ category.description }}</p>
            </div>

            <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card
                v-for="tech in category.technologies"
                :key="tech.name"
                class="hover:border-electric-blue/50 transition-colors"
              >
                <div class="mb-3 flex items-center justify-between">
                  <h3 class="text-lg font-bold text-white">{{ tech.name }}</h3>
                  <Badge variant="primary">{{ tech.level }}</Badge>
                </div>
                <p class="mb-3 text-sm text-medium-gray">{{ tech.description }}</p>
                <ul class="space-y-1">
                  <li
                    v-for="feature in tech.features"
                    :key="feature"
                    class="flex items-start text-xs text-light-gray"
                  >
                    <span class="mr-2 text-cyan-accent">•</span>
                    <span>{{ feature }}</span>
                  </li>
                </ul>
              </Card>
            </div>
          </div>
        </div>
      </Container>
    </section>

    <!-- Tools & Workflow -->
    <section class="py-20 bg-darker-gray">
      <Container>
        <div class="mb-12 text-center">
          <h2 class="mb-4 text-heading-2">Tools & Workflow</h2>
          <p class="text-light-gray">
            Our development environment and productivity tools
          </p>
        </div>

        <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div v-for="tool in tools" :key="tool.name" class="glass p-6 rounded-lg text-center">
            <div class="mb-3 text-2xl">{{ tool.icon }}</div>
            <h3 class="mb-2 text-lg font-semibold text-white">{{ tool.name }}</h3>
            <p class="text-sm text-medium-gray">{{ tool.purpose }}</p>
          </div>
        </div>
      </Container>
    </section>

    <!-- Learning & Growth -->
    <section class="py-20 bg-deep-navy">
      <Container>
        <div class="mx-auto max-w-3xl">
          <div class="glass p-8 rounded-lg">
            <h2 class="mb-6 text-2xl font-bold text-white text-center">
              Continuous Learning & Innovation
            </h2>
            <div class="space-y-4 text-light-gray">
              <p>
                We stay current with emerging technologies and best practices in the rapidly
                evolving software development landscape.
              </p>
              <div class="pt-4 border-t border-white/10">
                <h3 class="mb-3 text-lg font-semibold text-white">Recently Explored</h3>
                <div class="flex flex-wrap gap-2">
                  <Badge v-for="tech in recentlyExplored" :key="tech" variant="secondary">
                    {{ tech }}
                  </Badge>
                </div>
              </div>
              <div class="pt-4 border-t border-white/10">
                <h3 class="mb-3 text-lg font-semibold text-white">Learning Philosophy</h3>
                <ul class="space-y-2">
                  <li class="flex items-start">
                    <span class="mr-2 text-electric-blue">✓</span>
                    <span>Hands-on learning through real projects</span>
                  </li>
                  <li class="flex items-start">
                    <span class="mr-2 text-electric-blue">✓</span>
                    <span>Deep understanding over surface-level knowledge</span>
                  </li>
                  <li class="flex items-start">
                    <span class="mr-2 text-electric-blue">✓</span>
                    <span>Following official documentation and best practices</span>
                  </li>
                  <li class="flex items-start">
                    <span class="mr-2 text-electric-blue">✓</span>
                    <span>Contributing to open-source communities</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>

    <!-- Why These Technologies -->
    <section class="py-20 bg-darker-gray">
      <Container>
        <div class="mb-12 text-center">
          <h2 class="mb-4 text-heading-2">Why These Technologies?</h2>
          <p class="text-light-gray">Strategic choices for optimal results</p>
        </div>

        <div class="grid gap-6 md:grid-cols-3">
          <Card>
            <h3 class="mb-3 text-lg font-bold text-white">Modern & Maintained</h3>
            <p class="text-medium-gray text-sm">
              We choose technologies with active communities, regular updates, and long-term
              support to ensure project longevity.
            </p>
          </Card>
          <Card>
            <h3 class="mb-3 text-lg font-bold text-white">Type-Safe Development</h3>
            <p class="text-medium-gray text-sm">
              TypeScript across the entire stack reduces bugs, improves code quality, and
              enhances developer productivity.
            </p>
          </Card>
          <Card>
            <h3 class="mb-3 text-lg font-bold text-white">Performance First</h3>
            <p class="text-medium-gray text-sm">
              From Vue's reactivity system to PostgreSQL's query optimization, performance is
              built into our technology choices.
            </p>
          </Card>
        </div>
      </Container>
    </section>

    <!-- CTA -->
    <section class="py-20 bg-gradient-primary relative overflow-hidden">
      <div class="absolute inset-0 opacity-10">
        <div class="absolute inset-0 bg-glow-effect"></div>
      </div>
      <Container class="relative z-10">
        <div class="mx-auto max-w-2xl text-center">
          <h2 class="mb-4 text-heading-2">Ready to Leverage These Technologies?</h2>
          <p class="mb-8 text-lg text-light-gray">
            Let's build your next project with the right tools for the job
          </p>
          <NuxtLink
            to="/about#contact"
            class="inline-block rounded-lg bg-white px-8 py-4 text-lg font-semibold text-deep-navy transition-default hover:scale-105 hover:shadow-xl active:scale-95 focus-ring"
          >
            Discuss Your Project
          </NuxtLink>
        </div>
      </Container>
    </section>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Technology Stack | Codenova Innovations',
  meta: [
    {
      name: 'description',
      content:
        'Technologies we master: Vue 3, Nuxt 3, NestJS, PostgreSQL, Docker, TypeScript, Tailwind CSS, and more modern tools for exceptional software.',
    },
  ],
})

const stackCategories = [
  {
    name: 'Frontend Development',
    icon: '🎨',
    description: 'Modern frameworks for building responsive, interactive user interfaces',
    technologies: [
      {
        name: 'Vue.js 3',
        level: 'Expert',
        description: 'Progressive JavaScript framework with Composition API',
        features: [
          'Reactive state management',
          'Component composition',
          'Performance optimized',
        ],
      },
      {
        name: 'Nuxt 3',
        level: 'Expert',
        description: 'Full-stack Vue framework with SSR and auto-imports',
        features: [
          'Server-side rendering',
          'File-based routing',
          'API routes integration',
        ],
      },
      {
        name: 'TypeScript',
        level: 'Expert',
        description: 'Type-safe JavaScript for scalable applications',
        features: ['Static type checking', 'Enhanced IDE support', 'Better refactoring'],
      },
      {
        name: 'Tailwind CSS',
        level: 'Expert',
        description: 'Utility-first CSS framework for rapid UI development',
        features: ['Custom design systems', 'Responsive design', 'Dark mode support'],
      },
      {
        name: 'Pinia',
        level: 'Advanced',
        description: 'Vue state management library',
        features: ['Type-safe stores', 'Devtools integration', 'Composition API support'],
      },
      {
        name: 'VueUse',
        level: 'Advanced',
        description: 'Collection of essential Vue composition utilities',
        features: ['Pre-built composables', 'Tree-shakeable', 'TypeScript support'],
      },
    ],
  },
  {
    name: 'Backend Development',
    icon: '⚙️',
    description: 'Robust server-side frameworks and tools',
    technologies: [
      {
        name: 'NestJS',
        level: 'Expert',
        description: 'Progressive Node.js framework for building efficient server-side apps',
        features: [
          'Modular architecture',
          'Dependency injection',
          'Built-in TypeScript',
        ],
      },
      {
        name: 'Node.js',
        level: 'Expert',
        description: 'JavaScript runtime built on Chrome V8 engine',
        features: ['Asynchronous I/O', 'Event-driven', 'Scalable networking'],
      },
      {
        name: 'Prisma ORM',
        level: 'Expert',
        description: 'Next-generation ORM for Node.js and TypeScript',
        features: ['Type-safe queries', 'Auto-generated types', 'Database migrations'],
      },
      {
        name: 'Express.js',
        level: 'Advanced',
        description: 'Fast, minimalist web framework for Node.js',
        features: ['Lightweight', 'Middleware support', 'RESTful API'],
      },
      {
        name: 'Redis',
        level: 'Intermediate',
        description: 'In-memory data structure store for caching',
        features: ['Fast performance', 'Session storage', 'Pub/sub messaging'],
      },
    ],
  },
  {
    name: 'Database',
    icon: '🗄️',
    description: 'Reliable data storage and management systems',
    technologies: [
      {
        name: 'PostgreSQL',
        level: 'Expert',
        description: 'Powerful open-source relational database',
        features: [
          'ACID compliance',
          'Advanced indexing',
          'JSON support',
        ],
      },
      {
        name: 'Prisma Schema',
        level: 'Expert',
        description: 'Database modeling with Prisma',
        features: ['Declarative models', 'Automatic migrations', 'Type generation'],
      },
      {
        name: 'SQL',
        level: 'Advanced',
        description: 'Structured Query Language for database operations',
        features: ['Complex queries', 'Query optimization', 'Performance tuning'],
      },
    ],
  },
  {
    name: 'DevOps & Infrastructure',
    icon: '🚀',
    description: 'Deployment, monitoring, and infrastructure tools',
    technologies: [
      {
        name: 'Docker',
        level: 'Advanced',
        description: 'Containerization platform for consistent deployments',
        features: ['Container orchestration', 'Multi-stage builds', 'Docker Compose'],
      },
      {
        name: 'GitHub Actions',
        level: 'Advanced',
        description: 'CI/CD automation directly in GitHub',
        features: ['Automated testing', 'Deployment pipelines', 'Workflow automation'],
      },
      {
        name: 'PM2',
        level: 'Expert',
        description: 'Production process manager for Node.js',
        features: ['Cluster mode', 'Auto-restart', 'Monitoring'],
      },
      {
        name: 'Nginx',
        level: 'Advanced',
        description: 'High-performance web server and reverse proxy',
        features: ['Load balancing', 'SSL termination', 'Static file serving'],
      },
      {
        name: 'Linux',
        level: 'Advanced',
        description: 'Ubuntu/Debian server administration',
        features: ['System administration', 'Security hardening', 'Performance tuning'],
      },
    ],
  },
  {
    name: 'Cloud & Hosting',
    icon: '☁️',
    description: 'Cloud platforms and hosting solutions',
    technologies: [
      {
        name: 'Vercel',
        level: 'Advanced',
        description: 'Platform for frontend frameworks and static sites',
        features: ['Serverless functions', 'Edge network', 'Instant deployments'],
      },
      {
        name: 'Cloudflare',
        level: 'Intermediate',
        description: 'CDN and DDoS protection',
        features: ['Global CDN', 'DNS management', 'Workers edge computing'],
      },
      {
        name: 'DigitalOcean',
        level: 'Advanced',
        description: 'Cloud infrastructure provider',
        features: ['VPS hosting', 'Managed databases', 'Load balancers'],
      },
      {
        name: 'Supabase',
        level: 'Intermediate',
        description: 'Open-source Firebase alternative',
        features: ['PostgreSQL hosting', 'Real-time subscriptions', 'Authentication'],
      },
    ],
  },
  {
    name: 'Testing & Quality',
    icon: '✅',
    description: 'Testing frameworks and code quality tools',
    technologies: [
      {
        name: 'Vitest',
        level: 'Advanced',
        description: 'Blazing fast unit testing framework',
        features: ['Vue component testing', 'TypeScript support', 'Coverage reports'],
      },
      {
        name: 'Playwright',
        level: 'Intermediate',
        description: 'End-to-end testing framework',
        features: ['Cross-browser testing', 'API testing', 'Visual regression'],
      },
      {
        name: 'ESLint',
        level: 'Expert',
        description: 'Code linting for JavaScript/TypeScript',
        features: ['Style enforcement', 'Error detection', 'Custom rules'],
      },
      {
        name: 'Prettier',
        level: 'Expert',
        description: 'Opinionated code formatter',
        features: ['Consistent formatting', 'IDE integration', 'Auto-formatting'],
      },
    ],
  },
]

const tools = [
  {
    name: 'Git',
    icon: '📦',
    purpose: 'Version control and collaboration',
  },
  {
    name: 'GitHub',
    icon: '🐙',
    purpose: 'Repository hosting and CI/CD',
  },
  {
    name: 'VS Code',
    icon: '💻',
    purpose: 'Primary development IDE',
  },
  {
    name: 'Postman',
    icon: '📮',
    purpose: 'API testing and documentation',
  },
]

const recentlyExplored = [
  'GSAP Animations',
  'Headless UI',
  'Nuxt SEO Kit',
  'Zod Validation',
  'TanStack Query',
  'Drizzle ORM',
]
</script>

<style scoped>
.category-section {
  scroll-margin-top: 100px;
}
</style>
