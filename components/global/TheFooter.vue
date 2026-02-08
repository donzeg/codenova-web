<template>
  <footer class="border-t border-white/5 bg-darker-gray">
    <Container>
      <div class="py-12">
        <div class="grid gap-8 md:grid-cols-3">
          <!-- Company Info -->
          <div>
            <h3 class="mb-4 text-lg font-semibold">Codenova Innovations Ltd</h3>
            <p class="text-sm text-medium-gray">
              RC 7144941<br />
              Nigeria
            </p>
          </div>

          <!-- Quick Links -->
          <div>
            <h3 class="mb-4 text-lg font-semibold">Quick Links</h3>
            <ul class="space-y-2">
              <li v-for="link in footerLinks" :key="link.href">
                <NuxtLink
                  :to="link.href"
                  class="text-sm text-medium-gray transition-colors hover:text-white focus-ring rounded"
                >
                  {{ link.name }}
                </NuxtLink>
              </li>
            </ul>
          </div>

          <!-- Contact -->
          <div>
            <h3 class="mb-4 text-lg font-semibold">Contact</h3>
            <ul class="space-y-2">
              <li>
                <a
                  href="mailto:contact@codenova.cc"
                  class="text-sm text-medium-gray transition-colors hover:text-white focus-ring rounded"
                >
                  contact@codenova.cc
                </a>
              </li>
              <li>
                <a
                  href="tel:+2348064962174"
                  class="text-sm text-medium-gray transition-colors hover:text-white focus-ring rounded"
                >
                  +234 806 496 2174
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/donzeg"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center space-x-2 text-sm text-medium-gray transition-colors hover:text-white focus-ring rounded"
                >
                  <span>GitHub</span>
                  <ArrowTopRightOnSquareIcon class="h-4 w-4" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <!-- Bottom Section -->
        <div class="mt-8 border-t border-white/5 pt-8">
          <div class="flex flex-col items-center justify-between space-y-4 text-sm text-medium-gray md:flex-row md:space-y-0">
            <p>© {{ currentYear }} Codenova Innovations Ltd. All Rights Reserved.</p>
            <p class="text-xs">Built with Nuxt 3 + TypeScript + Tailwind CSS</p>
          </div>
        </div>
      </div>
    </Container>
  </footer>
</template>

<script setup lang="ts">
import { ArrowTopRightOnSquareIcon } from '@heroicons/vue/24/outline'

/**
 * TheFooter - Site footer with company info and links
 * Displays copyright, contact information, and quick navigation
 */

const currentYear = new Date().getFullYear()

const footerLinks = [
  { name: 'Home', href: '/' },
  { name: 'Capabilities', href: '/capabilities' },
  { name: 'Projects', href: '/projects' },
  { name: 'Stack', href: '/stack' },
  { name: 'About', href: '/about' }
]
</script>
