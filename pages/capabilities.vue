<template>
  <div>
    <!-- Page Header -->
    <section class="relative py-32 bg-gradient-dark overflow-hidden">
      <!-- Hero Background Image -->
      <div class="absolute inset-0 opacity-25">
        <img 
          src="/images/team/software-team-collaboration.jpg" 
          alt="Software team collaboration"
          class="w-full h-full object-cover"
          loading="eager"
        />
        <div class="absolute inset-0 bg-gradient-to-b from-deep-navy/90 via-deep-navy/80 to-deep-navy" />
      </div>
      
      <Container class="relative z-10">
        <div class="mx-auto max-w-3xl text-center animate-fade-in-up">
          <h1 class="mb-6 text-heading-1">What We Build</h1>
          <p class="text-xl text-light-gray">
            Full-spectrum technology solutions—from concept to deployment
          </p>
        </div>
      </Container>
    </section>

    <!-- Core Capabilities -->
    <section class="py-20 bg-deep-navy">
      <Container>
        <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <Card
            v-for="capability in capabilities"
            :key="capability.title"
            class="hover:scale-105 transition-transform duration-300"
          >
            <div class="mb-4 text-4xl">{{ capability.icon }}</div>
            <h3 class="mb-3 text-xl font-bold text-white">{{ capability.title }}</h3>
            <p class="mb-4 text-medium-gray">{{ capability.description }}</p>
            <ul class="space-y-2 mb-4">
              <li
                v-for="item in capability.features"
                :key="item"
                class="flex items-start text-sm text-light-gray"
              >
                <span class="mr-2 text-electric-blue">✓</span>
                <span>{{ item }}</span>
              </li>
            </ul>
            <div class="pt-4 border-t border-white/10">
              <p class="text-xs text-medium-gray">
                <span class="font-semibold text-cyan-accent">Example:</span>
                {{ capability.example }}
              </p>
            </div>
          </Card>
        </div>
      </Container>
    </section>

    <!-- Development Process -->
    <section class="relative py-20 bg-darker-gray overflow-hidden">
      <!-- Process Background Images -->
      <div class="absolute inset-0 opacity-10">
        <div class="grid grid-cols-2 h-full">
          <img 
            src="/images/process/Workflow.jpg" 
            alt="Development workflow"
            class="w-full h-full object-cover"
            loading="lazy"
          />
          <img 
            src="/images/process/collaboration.jpg" 
            alt="Team collaboration"
            class="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        <div class="absolute inset-0 bg-gradient-to-b from-darker-gray/95 via-darker-gray/90 to-darker-gray" />
      </div>
      
      <Container class="relative z-10">
        <div class="mb-12 text-center">
          <h2 class="mb-4 text-heading-2">Our Development Process</h2>
          <p class="text-light-gray">
            A proven methodology that delivers results
          </p>
        </div>

        <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="(step, index) in processSteps"
            :key="step.title"
            class="relative"
          >
            <div class="glass p-6 rounded-lg hover:shadow-glow transition-shadow">
              <div class="mb-4 flex items-center">
                <div
                  class="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-primary text-lg font-bold"
                >
                  {{ index + 1 }}
                </div>
                <h3 class="text-lg font-bold text-white">{{ step.title }}</h3>
              </div>
              <p class="text-medium-gray text-sm">{{ step.description }}</p>
            </div>
          </div>
        </div>
      </Container>
    </section>

    <!-- Technologies -->
    <section class="py-20 bg-deep-navy">
      <Container>
        <div class="mb-12 text-center">
          <h2 class="mb-4 text-heading-2">Technologies We Use</h2>
          <p class="text-light-gray mb-8">
            Modern tools and frameworks for exceptional results
          </p>
        </div>

        <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div v-for="category in techStack" :key="category.name">
            <h3 class="mb-4 text-lg font-semibold text-electric-blue">
              {{ category.name }}
            </h3>
            <ul class="space-y-2">
              <li
                v-for="tech in category.technologies"
                :key="tech"
                class="flex items-center text-sm text-light-gray"
              >
                <span class="mr-2 text-cyan-accent">→</span>
                <span>{{ tech }}</span>
              </li>
            </ul>
          </div>
        </div>

        <div class="mt-12 text-center">
          <NuxtLink
            to="/stack"
            class="inline-flex items-center space-x-2 text-electric-blue hover:text-cyan-accent transition-colors focus-ring rounded-lg px-4 py-2"
          >
            <span>See Full Technology Stack</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="h-5 w-5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
              />
            </svg>
          </NuxtLink>
        </div>
      </Container>
    </section>

    <!-- Industry Focus -->
    <section class="py-20 bg-darker-gray">
      <Container>
        <div class="mb-12 text-center">
          <h2 class="mb-4 text-heading-2">Industry Focus</h2>
          <p class="text-light-gray">
            Specialized solutions for diverse sectors
          </p>
        </div>

        <div class="grid gap-6 md:grid-cols-2">
          <Card
            v-for="industry in industries"
            :key="industry.title"
            class="hover:border-electric-blue/50 transition-colors"
          >
            <h3 class="mb-3 text-lg font-bold text-white">{{ industry.title }}</h3>
            <p class="text-medium-gray">{{ industry.description }}</p>
          </Card>
        </div>
      </Container>
    </section>

    <!-- CTA -->
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
          <h2 class="mb-4 text-heading-2 text-deep-navy">Ready to Start Your Project?</h2>
          <p class="mb-8 text-lg text-darker-gray">
            Let's discuss your requirements and build something exceptional
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
useHead({
  title: 'What We Build | Codenova Innovations',
  meta: [
    {
      name: 'description',
      content:
        'Full-spectrum technology solutions: Enterprise software, IoT systems, EV infrastructure, AI integration, mobile apps, and smart security. Custom solutions that scale.',
    },
  ],
})

const capabilities = [
  {
    icon: '🏢',
    title: 'Enterprise Software Solutions',
    description:
      'Custom web applications and SaaS platforms that transform business operations',
    features: [
      'Custom business applications',
      'Multi-tenant SaaS platforms',
      'Asset management systems',
      'Business process automation',
    ],
    example:
      'PEMACS - Enterprise asset management with 50+ integrated modules',
  },
  {
    icon: '🔌',
    title: 'IoT & Smart Systems',
    description: 'Connected device integration and intelligent automation solutions',
    features: [
      'IoT system integration',
      'Smart home solutions',
      'Sensor data management',
      'Remote monitoring platforms',
    ],
    example: 'Smart building automation with climate, lighting, and energy control',
  },
  {
    icon: '🔒',
    title: 'Smart Security Solutions',
    description: 'Security system integration and intelligent monitoring platforms',
    features: [
      'Security system integration',
      'Access control software',
      'Video management platforms',
      'Real-time alert systems',
    ],
    example: 'Integrated security platform with mobile monitoring and automated alerts',
  },
  {
    icon: '⚡',
    title: 'Electric Vehicle Infrastructure',
    description: 'EV charging management software and energy monitoring solutions',
    features: [
      'Charging management software',
      'Charging network platforms',
      'Energy monitoring solutions',
      'Payment & billing systems',
    ],
    example: 'EV charging network with usage analytics and dynamic pricing',
  },
  {
    icon: '🤖',
    title: 'AI & Machine Learning',
    description: 'AI integration and intelligent automation solutions',
    features: [
      'AI integration & automation',
      'Predictive analytics solutions',
      'Intelligent data processing',
      'Computer vision integration',
    ],
    example: 'Predictive maintenance platform reducing equipment downtime by 40%',
  },
  {
    icon: '📱',
    title: 'Mobile Solutions',
    description: 'Cross-platform mobile applications with offline capabilities',
    features: [
      'Cross-platform development',
      'iOS & Android apps',
      'Progressive Web Apps (PWAs)',
      'Offline-first applications',
    ],
    example: 'Field service app with offline asset scanning and real-time sync',
  },
  {
    icon: '🔧',
    title: 'System Integration & APIs',
    description: 'Custom API development and third-party system integration',
    features: [
      'Third-party API integration',
      'IoT platform connectivity',
      'Custom API development',
      'Webhook & event processing',
    ],
    example: 'Multi-platform integration connecting ERP, CRM, and IoT devices',
  },
]

const processSteps = [
  {
    title: 'Discovery',
    description:
      'Understanding your requirements, business goals, and technical feasibility through detailed consultation.',
  },
  {
    title: 'Design',
    description:
      'Architecture planning, database schema design, and UI/UX wireframes to ensure solid foundations.',
  },
  {
    title: 'Development',
    description:
      'Agile sprints with continuous integration, regular demos, and iterative improvements.',
  },
  {
    title: 'Testing',
    description:
      'Comprehensive testing including unit tests, integration tests, and user acceptance testing.',
  },
  {
    title: 'Deployment',
    description:
      'Production deployment with monitoring setup, performance optimization, and documentation.',
  },
  {
    title: 'Maintenance',
    description:
      'Ongoing support, performance monitoring, security updates, and feature enhancements.',
  },
]

const techStack = [
  {
    name: 'Frontend',
    technologies: ['Vue 3', 'Nuxt 3', 'TypeScript', 'Tailwind CSS'],
  },
  {
    name: 'Backend',
    technologies: ['NestJS', 'Node.js', 'Express', 'Prisma ORM'],
  },
  {
    name: 'Database',
    technologies: ['PostgreSQL', 'Redis', 'MySQL'],
  },
  {
    name: 'DevOps',
    technologies: ['Docker', 'GitHub Actions', 'PM2', 'Nginx'],
  },
]

const industries = [
  {
    title: 'Enterprise & Business Solutions',
    description:
      'Asset management, inventory systems, compliance tools, and workflow automation for large organizations.',
  },
  {
    title: 'Smart Buildings & Infrastructure',
    description:
      'IoT-enabled automation, energy management, security integration, and intelligent building systems.',
  },
  {
    title: 'Electric Vehicle Ecosystem',
    description:
      'EV charging networks, energy monitoring, fleet management, and sustainable transportation solutions.',
  },
  {
    title: 'SaaS & Cloud Platforms',
    description:
      'Multi-tenant applications, subscription management, analytics, and scalable cloud infrastructure.',
  },
]
</script>
