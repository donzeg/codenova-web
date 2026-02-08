<template>
  <div class="w-full">
    <label v-if="label" :for="inputId" class="mb-2 block text-sm font-medium text-light-gray">
      {{ label }}
      <span v-if="required" class="text-error-red">*</span>
    </label>
    
    <input
      :id="inputId"
      v-model="inputValue"
      :type="type"
      :placeholder="placeholder"
      :required="required"
      :disabled="disabled"
      class="w-full rounded-lg border border-medium-gray/30 bg-dark-gray px-4 py-3 text-white transition-colors focus:border-electric-blue focus:outline-none focus:ring-2 focus:ring-electric-blue/20 disabled:opacity-50"
      style="background-color: #374151 !important; color: #ffffff !important;"
      v-bind="$attrs"
      @blur="handleBlur"
    />
    
    <p v-if="error" class="mt-1 text-sm text-error-red">
      {{ error }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

/**
 * Input - Form input component with validation states
 * Supports various input types and error handling
 */

interface Props {
  modelValue: string
  label?: string
  type?: 'text' | 'email' | 'tel' | 'url' | 'password'
  placeholder?: string
  required?: boolean
  disabled?: boolean
  error?: string
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  placeholder: '',
  required: false,
  disabled: false
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  blur: []
}>()

const inputId = computed(() => `input-${Math.random().toString(36).substring(7)}`)

const inputValue = computed({
  get: () => props.modelValue,
  set: (value: string) => emit('update:modelValue', value)
})

const inputClasses = computed(() => {
  const base = 'w-full rounded-lg border px-4 py-3 !text-white caret-white placeholder-medium-gray disabled:cursor-not-allowed disabled:opacity-50 transition-colors focus:outline-none focus:ring-2 focus:ring-electric-blue/20'
  const bgColor = '!bg-[#374151]'
  const errorState = props.error ? 'border-error-red focus:border-error-red' : 'border-medium-gray/30 focus:border-electric-blue'
  
  return [base, bgColor, errorState]
})

function handleBlur() {
  emit('blur')
}
</script>
