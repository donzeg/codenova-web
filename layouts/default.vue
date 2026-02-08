<template>
  <div class="flex min-h-screen flex-col">
    <TheHeader />
    <main class="flex-1">
      <slot />
    </main>
    <TheFooter />
  </div>
</template>

<script setup lang="ts">
/**
 * Default Layout - Main site layout with header and footer
 * Applied to all pages unless specified otherwise
 */
</script>
