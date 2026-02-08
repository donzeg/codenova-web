<template>
  <div :class="cardClasses">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

/**
 * Card - Glass-morphism card component
 * Used for content containers with elevated styling
 */

interface Props {
  hover?: boolean
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<Props>(), {
  hover: false,
  padding: 'lg'
})

const cardClasses = computed(() => {
  const base = 'rounded-2xl border border-electric-blue/10 bg-dark-gray shadow-card transition-default'
  const hoverEffect = props.hover ? 'hover:-translate-y-1 hover:border-electric-blue hover:shadow-glow' : ''
  
  const paddings = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  }
  
  return [base, hoverEffect, paddings[props.padding]]
})
</script>
