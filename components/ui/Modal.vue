<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="modelValue"
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
        @click.self="close"
      >
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/70 backdrop-blur-sm" @click="close" />
        
        <!-- Modal Container -->
        <div
          class="relative w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl bg-dark-gray border border-electric-blue/20 shadow-2xl"
          :class="modalClass"
        >
          <!-- Close Button -->
          <button
            class="absolute top-4 right-4 z-10 rounded-lg p-2 text-light-gray transition-colors hover:bg-white/10 hover:text-white focus-ring"
            @click="close"
            aria-label="Close modal"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="h-6 w-6"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>

          <!-- Modal Content -->
          <div class="overflow-y-auto max-h-[90vh]">
            <!-- Header Slot -->
            <div v-if="$slots.header" class="border-b border-white/10 bg-darker-gray px-8 py-6">
              <slot name="header" />
            </div>

            <!-- Default Content Slot -->
            <div class="px-8 py-6">
              <slot />
            </div>

            <!-- Footer Slot -->
            <div v-if="$slots.footer" class="border-t border-white/10 bg-darker-gray px-8 py-6">
              <slot name="footer" />
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
interface Props {
  modelValue: boolean
  modalClass?: string
  closeOnEscape?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modalClass: '',
  closeOnEscape: true
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  close: []
}>()

const close = () => {
  emit('update:modelValue', false)
  emit('close')
}

// Handle escape key
onMounted(() => {
  if (props.closeOnEscape) {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && props.modelValue) {
        close()
      }
    }
    window.addEventListener('keydown', handleEscape)
    
    onUnmounted(() => {
      window.removeEventListener('keydown', handleEscape)
    })
  }
})

// Prevent body scroll when modal is open
watch(() => props.modelValue, (isOpen) => {
  if (import.meta.client) {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }
})
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .relative,
.modal-leave-active .relative {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.modal-enter-from .relative,
.modal-leave-to .relative {
  transform: scale(0.95);
  opacity: 0;
}
</style>
