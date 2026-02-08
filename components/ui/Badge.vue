<template>
  <span :class="badgeClasses">
    <slot />
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'

/**
 * Badge - Small label component for tech stack tags
 * Used to display technologies, categories, and labels
 */

interface Props {
  variant?: 'default' | 'primary' | 'success' | 'warning'
  size?: 'sm' | 'md'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  size: 'sm'
})

const badgeClasses = computed(() => {
  const base = 'inline-flex items-center rounded-full font-medium'
  
  const variants = {
    default: 'bg-dark-gray text-light-gray border border-white/10',
    primary: 'bg-electric-blue/20 text-electric-blue border border-electric-blue/30',
    success: 'bg-success-green/20 text-success-green border border-success-green/30',
    warning: 'bg-warning-amber/20 text-warning-amber border border-warning-amber/30'
  }
  
  const sizes = {
    sm: 'px-2.5 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm'
  }
  
  return [base, variants[props.variant], sizes[props.size]]
})
</script>
