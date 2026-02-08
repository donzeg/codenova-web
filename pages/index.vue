<template>
  <div>
    <!-- Hero Section -->
    <section class="relative min-h-screen flex items-center bg-gradient-dark overflow-hidden">
      <!-- Hero Background Image -->
      <div class="absolute inset-0 opacity-30">
        <img 
          src="/images/hero/developer-coding-dark.jpg" 
          alt="Developer coding in modern workspace"
          class="w-full h-full object-cover"
          loading="eager"
        />
        <div class="absolute inset-0 bg-gradient-to-b from-deep-navy/80 via-deep-navy/60 to-deep-navy" />
      </div>
      
      <!-- Background Effects -->
      <div class="absolute inset-0 opacity-20">
        <div class="absolute top-20 left-20 h-96 w-96 rounded-full bg-electric-blue blur-3xl" />
        <div class="absolute bottom-20 right-20 h-96 w-96 rounded-full bg-cyan-accent blur-3xl" />
      </div>

      <Container class="relative z-10">
        <div class="mx-auto max-w-4xl text-center">
          <h1 class="mb-6 text-heading-1 animate-fade-in-up">
            Engineering Tomorrow's <span class="text-gradient">Solutions</span> Today
          </h1>
          
          <p class="mb-8 text-xl text-light-gray animate-fade-in-up" style="animation-delay: 0.1s">
            Full-spectrum technology solutions—from enterprise software to IoT, AI, and beyond
          </p>
          
          <p class="mb-12 text-lg text-medium-gray animate-fade-in-up" style="animation-delay: 0.2s">
            We don't just build applications—we architect digital transformation
          </p>
          
          <div class="flex flex-col items-center justify-center gap-6 sm:flex-row animate-fade-in-up" style="animation-delay: 0.3s">
            <NuxtLink to="/projects" class="inline-flex items-center space-x-2 text-electric-blue hover:text-cyan-accent transition-colors focus-ring rounded-lg px-4 py-2">
              <span class="text-lg font-semibold">View Our Work</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-5 w-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </NuxtLink>
            <NuxtLink to="/capabilities" class="inline-flex items-center space-x-2 text-electric-blue hover:text-cyan-accent transition-colors focus-ring rounded-lg px-4 py-2">
              <span class="text-lg font-semibold">Explore Capabilities</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-5 w-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </NuxtLink>
          </div>
        </div>
      </Container>
    </section>

    <!-- What We Do Section -->
    <section class="py-20 bg-deep-navy">
      <Container>
        <div class="mb-12 text-center">
          <h2 class="mb-4 text-heading-2">Full-Spectrum Technology Solutions</h2>
          <p class="text-light-gray max-w-2xl mx-auto">
            From enterprise software to IoT, EV infrastructure, and AI—we deliver complete technology solutions
          </p>
        </div>

        <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card hover padding="lg" class="what-we-do-card">
            <div class="text-4xl mb-4 text-electric-blue">🏢</div>
            <h3 class="mb-3 text-xl font-bold">Enterprise & SaaS</h3>
            <p class="text-medium-gray">
              Custom business applications and scalable SaaS platforms
            </p>
          </Card>

          <Card hover padding="lg" class="what-we-do-card">
            <div class="text-4xl mb-4 text-cyan-accent">🔌</div>
            <h3 class="mb-3 text-xl font-bold">IoT & Smart Systems</h3>
            <p class="text-medium-gray">
              Connected devices, automation, and real-time monitoring
            </p>
          </Card>

          <Card hover padding="lg" class="what-we-do-card">
            <div class="text-4xl mb-4 text-purple-highlight">🔒</div>
            <h3 class="mb-3 text-xl font-bold">Smart Security</h3>
            <p class="text-medium-gray">
              Access control, surveillance, and intelligent alert systems
            </p>
          </Card>

          <Card hover padding="lg" class="what-we-do-card">
            <div class="text-4xl mb-4 text-green-accent">⚡</div>
            <h3 class="mb-3 text-xl font-bold">EV Infrastructure</h3>
            <p class="text-medium-gray">
              Charging management, energy monitoring, and billing platforms
            </p>
          </Card>

          <Card hover padding="lg" class="what-we-do-card">
            <div class="text-4xl mb-4 text-electric-blue">🤖</div>
            <h3 class="mb-3 text-xl font-bold">AI & Automation</h3>
            <p class="text-medium-gray">
              Intelligent systems, predictive analytics, and data insights
            </p>
          </Card>

          <Card hover padding="lg" class="what-we-do-card">
            <div class="text-4xl mb-4 text-cyan-accent">📱</div>
            <h3 class="mb-3 text-xl font-bold">Mobile Solutions</h3>
            <p class="text-medium-gray">
              Cross-platform apps with offline-first capabilities
            </p>
          </Card>
        </div>

        <div class="mt-8 text-center">
          <NuxtLink to="/capabilities" class="inline-flex items-center space-x-2 text-electric-blue hover:text-cyan-accent transition-colors focus-ring rounded-lg px-4 py-2">
            <span class="text-lg font-semibold">View All Capabilities</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-5 w-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </NuxtLink>
        </div>
      </Container>
    </section>

    <!-- By the Numbers Section -->
    <section class="py-20 bg-darker-gray">
      <Container>
        <h2 class="mb-12 text-center text-heading-2">By the Numbers</h2>
        
        <div class="grid gap-8 md:grid-cols-4">
          <div class="text-center stat-item">
            <div class="mb-2 text-5xl font-extrabold text-gradient">
              {{ stats?.totalRepos || '10+' }}
            </div>
            <div class="text-medium-gray">Projects Delivered</div>
          </div>

          <div class="text-center stat-item">
            <div class="mb-2 text-5xl font-extrabold text-gradient">20+</div>
            <div class="text-medium-gray">Technologies Mastered</div>
          </div>

          <div class="text-center stat-item">
            <div class="mb-2 text-5xl font-extrabold text-gradient">
              {{ stats?.totalCommits.toLocaleString() || '5,000+' }}
            </div>
            <div class="text-medium-gray">Code Commits</div>
          </div>

          <div class="text-center stat-item">
            <div class="mb-2 text-5xl font-extrabold text-gradient">99.9%</div>
            <div class="text-medium-gray">Uptime Guarantee</div>
          </div>
        </div>
      </Container>
    </section>

    <!-- Innovation Philosophy Section -->
    <section class="py-20 bg-deep-navy">
      <Container>
        <div class="mx-auto max-w-3xl text-center philosophy-content">
          <h2 class="mb-8 text-heading-2">Innovation Philosophy</h2>
          <blockquote class="text-lg text-light-gray leading-relaxed">
            At Codenova Innovations, we believe technology should solve problems, not create them. 
            Every line of code we write serves a purpose. Every architecture decision is deliberate. 
            Every feature is engineered with the end user in mind.
          </blockquote>
        </div>
      </Container>
    </section>

    <!-- Recent Projects Section -->
    <section class="py-20 bg-darker-gray">
      <Container>
        <div class="mb-12 flex items-center justify-between">
          <h2 class="text-heading-2">Recent Projects</h2>
          <NuxtLink to="/projects" class="inline-flex items-center space-x-2 text-electric-blue hover:text-cyan-accent transition-colors focus-ring rounded-lg px-4 py-2">
            <span class="font-semibold">View All Projects</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-5 w-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </NuxtLink>
        </div>

        <div v-if="loading" class="text-center py-12 text-medium-gray">
          Loading projects...
        </div>

        <div v-else-if="recentProjects.length > 0" class="grid gap-6 md:grid-cols-3">
          <Card
            v-for="project in recentProjects"
            :key="project.id"
            hover
            padding="lg"
          >
            <h3 class="mb-2 text-xl font-bold">{{ project.name }}</h3>
            <p class="mb-4 text-sm text-medium-gray line-clamp-2">
              {{ project.description || 'No description available' }}
            </p>
            
            <div class="mb-4 flex flex-wrap gap-2">
              <Badge v-if="project.language" variant="primary">
                {{ project.language }}
              </Badge>
              <Badge
                v-for="topic in project.topics.slice(0, 3)"
                :key="topic"
              >
                {{ topic }}
              </Badge>
            </div>

            <div class="flex items-center justify-between text-sm text-medium-gray">
              <span class="flex items-center">
                ⭐ {{ project.stargazers_count }}
              </span>
              <span class="flex items-center">
                🔗 {{ project.forks_count }}
              </span>
            </div>
          </Card>
        </div>
      </Container>
    </section>

    <!-- Tech Stack Preview Section -->
    <section class="py-20 bg-deep-navy">
      <Container>
        <div class="mb-12 text-center">
          <h2 class="mb-4 text-heading-2">Technologies We Master</h2>
          <p class="text-medium-gray">Modern tools and frameworks for exceptional results</p>
        </div>

        <div class="flex flex-wrap items-center justify-center gap-8">
          <div v-for="tech in techStack" :key="tech" class="flex flex-col items-center tech-item">
            <div class="rounded-lg bg-dark-gray p-4 transition-default hover:scale-110 hover:shadow-glow">
              <span class="text-2xl">{{ tech }}</span>
            </div>
          </div>
        </div>

        <div class="mt-12 text-center">
          <NuxtLink to="/stack" class="inline-flex items-center space-x-2 text-electric-blue hover:text-cyan-accent transition-colors focus-ring rounded-lg px-4 py-2">
            <span class="text-lg font-semibold">See Full Stack</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-5 w-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </NuxtLink>
        </div>
      </Container>
    </section>

    <!-- Call to Action Section -->
    <section class="py-20 bg-gradient-primary relative overflow-hidden cta-section">
      <!-- Background Image -->
      <div class="absolute inset-0 opacity-20">
        <img 
          src="/images/team/software-team-collaboration.jpg" 
          alt="Let's collaborate on your project"
          class="w-full h-full object-cover"
          loading="lazy"
        />
        <div class="absolute inset-0 bg-gradient-to-b from-electric-blue/90 via-electric-blue/80 to-cyan-accent/90" />
      </div>

      <Container class="relative z-10">
        <div class="mx-auto max-w-2xl text-center">
          <h2 class="mb-4 text-heading-2 text-deep-navy">Ready to Build Something Extraordinary?</h2>
          <p class="mb-8 text-lg text-darker-gray">
            Let's discuss how we can transform your vision into reality
          </p>
          <NuxtLink to="/about#contact" class="inline-flex items-center space-x-2 text-electric-blue hover:text-cyan-accent transition-colors focus-ring rounded-lg px-4 py-2">
            <span class="text-xl font-semibold">Get in Touch</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-6 w-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </NuxtLink>
        </div>
      </Container>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'

/**
 * Home Page - Landing page with hero, features, and project showcase
 * Displays company overview, statistics, and recent projects
 */

const { stats, fetchStats } = useGitHub()
const { repos, loading, fetchRepos } = useGitHub()
const { staggerOnScroll, scaleOnScroll, fadeInOnScroll } = useScrollTrigger()

// Get base URL for images
const config = useRuntimeConfig()
const baseURL = config.app.baseURL

// Fetch data on mount
onMounted(async () => {
  await Promise.all([
    fetchStats(),
    fetchRepos()
  ])
  
  // Initialize scroll animations
  if (import.meta.client) {
    // Animate "What We Do" cards
    staggerOnScroll('.what-we-do-card', {
      y: 60,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2
    })
    
    // Animate stats numbers
    staggerOnScroll('.stat-item', {
      y: 40,
      opacity: 0,
      duration: 0.6,
      stagger: 0.15
    })
    
    // Animate philosophy section
    fadeInOnScroll('.philosophy-content', {
      y: 50,
      opacity: 0,
      duration: 1
    })
    
    // Animate project cards
    staggerOnScroll('.project-card', {
      y: 50,
      opacity: 0,
      duration: 0.7,
      stagger: 0.2
    })
    
    // Animate tech stack items
    staggerOnScroll('.tech-item', {
      scale: 0.8,
      opacity: 0,
      duration: 0.5,
      stagger: 0.1
    })
    
    // Animate CTA section
    scaleOnScroll('.cta-section', {
      scale: 0.95,
      opacity: 0,
      duration: 0.8
    })
  }
})

const recentProjects = computed(() => {
  return repos.value.slice(0, 3)
})

const techStack = [
  'Vue.js', 'Nuxt', 'TypeScript', 'NestJS', 
  'PostgreSQL', 'Docker', 'Tailwind', 'Prisma'
]

// SEO Meta Tags
useHead({
  title: 'Codenova Innovations | Full-Spectrum Technology Solutions',
  meta: [
    {
      name: 'description',
      content: 'Enterprise software, IoT systems, EV infrastructure, smart security, and AI integration. Full-spectrum technology solutions—hardware and software expertise that scales.'
    },
    {
      property: 'og:title',
      content: 'Codenova Innovations | Full-Spectrum Technology Solutions'
    },
    {
      property: 'og:description',
      content: 'Engineering tomorrow\'s solutions today—from enterprise software to IoT, EV infrastructure, and smart automation'
    },
    {
      property: 'og:type',
      content: 'website'
    }
  ]
})
</script>
