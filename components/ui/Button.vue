<template>
  <NuxtLink
    v-if="to"
    :to="to"
    :class="buttonClasses"
  >
    <span v-if="loading" class="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
    <slot />
  </NuxtLink>
  
  <a
    v-else-if="href || tag === 'a'"
    :href="href"
    :class="buttonClasses"
  >
    <span v-if="loading" class="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
    <slot />
  </a>
  
  <button
    v-else
    :type="type"
    :class="buttonClasses"
    :disabled="disabled || loading"
  >
    <span v-if="loading" class="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { NuxtLink } from '#components'

/**
 * Button - Reusable button component with multiple variants
 * Supports primary, secondary, and ghost styles
 * Use 'to' prop for internal links (NuxtLink) and 'href' for external links
 */

interface Props {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  tag?: 'button' | 'a'
  type?: 'button' | 'submit' | 'reset'
  href?: string
  to?: string
  disabled?: boolean
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  tag: 'button',
  type: 'button',
  disabled: false,
  loading: false
})

const buttonClasses = computed(() => {
  const base = 'inline-flex items-center justify-center rounded-lg font-semibold transition-default focus-ring disabled:cursor-not-allowed disabled:opacity-50'
  
  const variants = {
    primary: 'bg-electric-blue text-white hover:scale-105 hover:shadow-glow active:scale-95',
    secondary: 'border-2 border-electric-blue bg-transparent text-electric-blue hover:bg-electric-blue hover:text-white',
    ghost: 'bg-transparent text-light-gray hover:bg-dark-gray hover:text-white'
  }
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  }
  
  return [base, variants[props.variant], sizes[props.size]]
})
</script>
