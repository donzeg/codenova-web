<template>
  <div>
    <!-- Page Header -->
    <section class="py-20 bg-gradient-dark">
      <Container>
        <div class="mx-auto max-w-3xl text-center animate-fade-in-up">
          <h1 class="mb-6 text-heading-1">Our Work</h1>
          <p class="text-xl text-light-gray mb-8">
            Live projects built with modern technologies
          </p>
          <a
            href="https://github.com/donzeg"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center space-x-2 text-electric-blue hover:text-cyan-accent transition-colors focus-ring rounded-lg px-4 py-2"
          >
            <span>View all on GitHub</span>
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
                d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
              />
            </svg>
          </a>
        </div>
      </Container>
    </section>

    <!-- Project Statistics -->
    <section class="py-12 bg-deep-navy">
      <Container>
        <div v-if="stats" class="grid gap-8 md:grid-cols-4">
          <div class="text-center">
            <div class="mb-2 text-4xl font-extrabold text-gradient">
              {{ stats.totalRepos }}
            </div>
            <div class="text-medium-gray">Total Repositories</div>
          </div>
          <div class="text-center">
            <div class="mb-2 text-4xl font-extrabold text-gradient">
              {{ stats.totalStars }}
            </div>
            <div class="text-medium-gray">Total Stars</div>
          </div>
          <div class="text-center">
            <div class="mb-2 text-4xl font-extrabold text-gradient">
              {{ stats.totalForks }}
            </div>
            <div class="text-medium-gray">Total Forks</div>
          </div>
          <div class="text-center">
            <div class="mb-2 text-4xl font-extrabold text-gradient">
              {{ stats.languages.length }}
            </div>
            <div class="text-medium-gray">Languages Used</div>
          </div>
        </div>
        <div v-else-if="loading" class="text-center text-medium-gray">
          Loading statistics...
        </div>
        <div v-else-if="error" class="text-center text-red-400">
          {{ error }}
        </div>
      </Container>
    </section>

    <!-- Featured Projects -->
    <section v-if="featuredProjects.length > 0" class="py-20 bg-darker-gray">
      <Container>
        <div class="mb-12">
          <h2 class="text-heading-2 mb-4">Featured Projects</h2>
          <p class="text-light-gray">Highlighted work showcasing our expertise</p>
        </div>

        <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <Card
            v-for="project in featuredProjects"
            :key="project.id"
            class="flex flex-col hover:scale-105 transition-transform"
          >
            <div class="mb-4 flex items-center justify-between">
              <h3 class="text-xl font-bold text-white">{{ project.name }}</h3>
              <Badge v-if="project.language" variant="primary">
                {{ project.language }}
              </Badge>
            </div>

            <p class="mb-4 text-medium-gray flex-grow">
              {{ project.description || 'No description provided' }}
            </p>

            <div class="mb-4 flex flex-wrap gap-2">
              <Badge
                v-for="topic in project.topics?.slice(0, 4)"
                :key="topic"
                variant="secondary"
              >
                {{ topic }}
              </Badge>
            </div>

            <div class="mb-4 flex items-center space-x-4 text-sm text-light-gray">
              <span class="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="mr-1 h-4 w-4"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                  />
                </svg>
                {{ project.stargazers_count }}
              </span>
              <span class="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="mr-1 h-4 w-4"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
                  />
                </svg>
                {{ project.forks_count }}
              </span>
              <span v-if="project.updated_at" class="text-xs">
                Updated {{ formatDate(project.updated_at) }}
              </span>
            </div>

            <div class="flex items-center space-x-4">
              <a
                :href="project.html_url"
                target="_blank"
                rel="noopener noreferrer"
                class="flex-1 text-center rounded-lg border border-electric-blue px-4 py-2 text-sm font-semibold text-electric-blue transition-default hover:bg-electric-blue hover:text-white focus-ring"
              >
                View Code
              </a>
              <a
                v-if="project.homepage"
                :href="project.homepage"
                target="_blank"
                rel="noopener noreferrer"
                class="flex-1 text-center rounded-lg bg-electric-blue px-4 py-2 text-sm font-semibold text-white transition-default hover:scale-105 hover:shadow-glow active:scale-95 focus-ring"
              >
                Live Demo
              </a>
            </div>
          </Card>
        </div>
      </Container>
    </section>

    <!-- All Projects -->
    <section class="py-20 bg-deep-navy">
      <Container>
        <div class="mb-12">
          <h2 class="text-heading-2 mb-4">All Projects</h2>
          <p class="text-light-gray">Complete portfolio from GitHub</p>
        </div>

        <div v-if="loading" class="text-center text-light-gray">
          <div class="mb-4">Loading projects...</div>
          <div class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-electric-blue border-t-transparent"></div>
        </div>

        <div v-else-if="error" class="text-center text-red-400">
          <p>{{ error }}</p>
          <p class="mt-2 text-sm text-medium-gray">
            Please try again later or visit
            <a
              href="https://github.com/donzeg"
              target="_blank"
              rel="noopener noreferrer"
              class="text-electric-blue hover:underline"
            >
              GitHub
            </a>
          </p>
        </div>

        <div v-else-if="otherProjects.length > 0" class="grid gap-6 md:grid-cols-2">
          <Card
            v-for="project in otherProjects"
            :key="project.id"
            class="flex flex-col hover:border-electric-blue/50 transition-colors"
          >
            <div class="mb-3 flex items-center justify-between">
              <h3 class="text-lg font-bold text-white">{{ project.name }}</h3>
              <Badge v-if="project.language" variant="secondary">
                {{ project.language }}
              </Badge>
            </div>

            <p class="mb-3 text-sm text-medium-gray flex-grow">
              {{ project.description || 'No description provided' }}
            </p>

            <div class="mb-3 flex items-center space-x-4 text-xs text-light-gray">
              <span class="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="mr-1 h-3 w-3"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                  />
                </svg>
                {{ project.stargazers_count }}
              </span>
              <span class="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="mr-1 h-3 w-3"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
                  />
                </svg>
                {{ project.forks_count }}
              </span>
            </div>

            <a
              :href="project.html_url"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center text-sm text-electric-blue hover:text-cyan-accent transition-colors focus-ring rounded"
            >
              <span>View on GitHub</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="ml-1 h-4 w-4"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                />
              </svg>
            </a>
          </Card>
        </div>

        <div
          v-else-if="!loading && repos && repos.length === 0"
          class="text-center text-medium-gray"
        >
          <p>No projects found.</p>
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
          <h2 class="mb-4 text-heading-2 text-deep-navy">Have a Project in Mind?</h2>
          <p class="mb-8 text-lg text-darker-gray">
            Let's collaborate and build something amazing together
          </p>
          <NuxtLink to="/about#contact" class="inline-flex items-center space-x-2 text-electric-blue hover:text-cyan-accent transition-colors focus-ring rounded-lg px-4 py-2">
            <span class="text-xl font-semibold">Start a Conversation</span>
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
import type { Repository } from '../types/github'

useHead({
  title: 'Our Work | Codenova Innovations',
  meta: [
    {
      name: 'description',
      content:
        'Explore our portfolio: enterprise software, IoT systems, EV infrastructure, and smart automation. Real-world solutions built with modern technology.',
    },
  ],
})

const { repos, stats, loading, error, fetchRepos, fetchStats } = useGitHub()

// Fetch data on component mount
onMounted(async () => {
  await Promise.all([fetchRepos(), fetchStats()])
})

// Featured project names (manually curated)
const featuredProjectNames = ['codenova-web', 'sunsynk-home-assistant-dashboard', 'NAFVE']

// Computed properties for featured and other projects
const featuredProjects = computed(() => {
  if (!repos.value) return []
  return repos.value.filter(repo =>
    featuredProjectNames.includes(repo.name)
  )
})

const otherProjects = computed(() => {
  if (!repos.value) return []
  return repos.value.filter(
    repo => !featuredProjectNames.includes(repo.name)
  )
})

// Format date helper
const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  const now = new Date()
  const diffTime = Math.abs(now.getTime() - date.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays < 7) {
    return `${diffDays}d ago`
  } else if (diffDays < 30) {
    return `${Math.floor(diffDays / 7)}w ago`
  } else if (diffDays < 365) {
    return `${Math.floor(diffDays / 30)}mo ago`
  } else {
    return `${Math.floor(diffDays / 365)}y ago`
  }
}
</script>
