<template>
  <div class="w-full">
    <label v-if="label" :for="textareaId" class="mb-2 block text-sm font-medium text-light-gray">
      {{ label }}
      <span v-if="required" class="text-error-red">*</span>
    </label>
    
    <textarea
      :id="textareaId"
      v-bind="$attrs"
      v-model="textareaValue"
      :placeholder="placeholder"
      :required="required"
      :disabled="disabled"
      :rows="rows"
      class="w-full rounded-lg border border-medium-gray/30 bg-dark-gray px-4 py-3 text-white transition-colors focus:border-electric-blue focus:outline-none focus:ring-2 focus:ring-electric-blue/20 disabled:opacity-50 resize-y min-h-[200px]"
      style="background-color: #374151 !important; color: #ffffff !important;"
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
 * Textarea - Form textarea component with validation states
 * Used for multi-line text input with error handling
 */

interface Props {
  modelValue: string
  label?: string
  placeholder?: string
  required?: boolean
  disabled?: boolean
  error?: string
  rows?: number
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: '',
  required: false,
  disabled: false,
  rows: 4
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  blur: []
}>()

const textareaId = computed(() => `textarea-${Math.random().toString(36).substring(7)}`)

const textareaValue = computed({
  get: () => props.modelValue,
  set: (value: string) => emit('update:modelValue', value)
})

const textareaClasses = computed(() => {
  const base = 'w-full rounded-lg border px-4 py-3 !text-white caret-white placeholder-medium-gray disabled:cursor-not-allowed disabled:opacity-50 resize-y min-h-[200px] transition-colors focus:outline-none focus:ring-2 focus:ring-electric-blue/20'
  const bgColor = '!bg-[#374151]'
  const errorState = props.error ? 'border-error-red focus:border-error-red' : 'border-medium-gray/30 focus:border-electric-blue'
  
  return [base, bgColor, errorState]
})

function handleBlur() {
  emit('blur')
}
</script>
