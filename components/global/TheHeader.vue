<template>
  <header class="sticky top-0 z-50 glass border-b border-white/5">
    <Container>
      <nav class="flex h-16 items-center justify-between">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center focus-ring rounded-lg">
          <span 
            class="text-5xl font-black tracking-tighter"
            style="
              background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              background-clip: text;
              letter-spacing: -0.08em;
              text-shadow: 0 0 30px rgba(6, 182, 212, 0.5);
              filter: drop-shadow(0 0 20px rgba(6, 182, 212, 0.4));
              font-family: 'Inter', 'Space Mono', sans-serif;
              font-weight: 900;
            "
          >
            CODENOVA
          </span>
        </NuxtLink>

        <!-- Desktop Navigation -->
        <div class="hidden items-center space-x-8 md:flex">
          <NuxtLink
            v-for="link in navigation"
            :key="link.href"
            :to="link.href"
            class="text-sm font-medium text-light-gray transition-colors hover:text-white focus-ring rounded-lg px-2 py-1"
            active-class="text-white"
          >
            {{ link.name }}
          </NuxtLink>

          <NuxtLink
            to="/about#contact"
            class="rounded-lg bg-electric-blue px-4 py-2 text-sm font-semibold text-white transition-default hover:scale-105 hover:shadow-glow active:scale-95 focus-ring"
          >
            Get in Touch
          </NuxtLink>
        </div>

        <!-- Mobile Menu Button -->
        <button
          class="md:hidden focus-ring rounded-lg p-2"
          @click="mobileMenuOpen = !mobileMenuOpen"
          aria-label="Toggle menu"
        >
          <component :is="mobileMenuOpen ? XMarkIcon : Bars3Icon" class="h-6 w-6" />
        </button>
      </nav>

      <!-- Mobile Navigation -->
      <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0 scale-95"
        enter-to-class="opacity-100 scale-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100 scale-100"
        leave-to-class="opacity-0 scale-95"
      >
        <div v-if="mobileMenuOpen" class="pb-4 md:hidden">
          <div class="flex flex-col space-y-2">
            <NuxtLink
              v-for="link in navigation"
              :key="link.href"
              :to="link.href"
              class="rounded-lg px-3 py-2 text-base font-medium text-light-gray transition-colors hover:bg-dark-gray hover:text-white focus-ring"
              active-class="bg-dark-gray text-white"
              @click="mobileMenuOpen = false"
            >
              {{ link.name }}
            </NuxtLink>

            <NuxtLink
              to="/about#contact"
              class="rounded-lg bg-electric-blue px-3 py-2 text-center text-base font-semibold text-white transition-default hover:scale-105 hover:shadow-glow active:scale-95 focus-ring"
              @click="mobileMenuOpen = false"
            >
              Get in Touch
            </NuxtLink>
          </div>
        </div>
      </Transition>
    </Container>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'

/**
 * TheHeader - Site header with navigation
 * Includes responsive mobile menu with slide-in animation
 */

const mobileMenuOpen = ref(false)

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Capabilities', href: '/capabilities' },
  { name: 'Projects', href: '/projects' },
  { name: 'Stack', href: '/stack' },
  { name: 'About', href: '/about' }
]
</script>
