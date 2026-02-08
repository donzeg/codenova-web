<template>
  <div class="space-y-6">
    <div v-if="success" class="rounded-lg bg-green-500/10 border border-green-500/50 p-4">
      <div class="flex items-start">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="mr-3 h-6 w-6 text-green-500 flex-shrink-0"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
        <div>
          <h3 class="font-semibold text-green-500 mb-1">Message Sent Successfully!</h3>
          <p class="text-sm text-green-500/80">
            Thank you for reaching out. We'll review your message and respond within 24 hours.
          </p>
        </div>
      </div>
    </div>

    <div v-if="error" class="rounded-lg bg-red-500/10 border border-red-500/50 p-4">
      <div class="flex items-start">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="mr-3 h-6 w-6 text-red-500 flex-shrink-0"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
          />
        </svg>
        <div>
          <h3 class="font-semibold text-red-500 mb-1">Error Sending Message</h3>
          <p class="text-sm text-red-500/80">{{ error }}</p>
          <p class="text-xs text-red-500/60 mt-1">
            Please try again or email us directly at
            <a href="mailto:codenovainnovations@gmail.com" class="underline">
              codenovainnovations@gmail.com
            </a>
          </p>
        </div>
      </div>
    </div>

    <form @submit.prevent="handleSubmit" class="space-y-4">
      <!-- Name -->
      <div>
        <label for="name" class="mb-2 block text-sm font-medium text-light-gray">
          Name <span class="text-red-400">*</span>
        </label>
        <Input
          id="name"
          v-model="formData.name"
          type="text"
          placeholder="Your name"
          required
          :disabled="loading"
        />
        <p v-if="validationErrors.name" class="mt-1 text-xs text-red-400">
          {{ validationErrors.name }}
        </p>
      </div>

      <!-- Email -->
      <div>
        <label for="email" class="mb-2 block text-sm font-medium text-light-gray">
          Email <span class="text-red-400">*</span>
        </label>
        <Input
          id="email"
          v-model="formData.email"
          type="email"
          placeholder="your@email.com"
          required
          :disabled="loading"
        />
        <p v-if="validationErrors.email" class="mt-1 text-xs text-red-400">
          {{ validationErrors.email }}
        </p>
      </div>

      <!-- Company/Organization (optional) -->
      <div>
        <label for="company" class="mb-2 block text-sm font-medium text-light-gray">
          Company/Organization
        </label>
        <Input
          id="company"
          v-model="formData.company"
          type="text"
          placeholder="Your company (optional)"
          :disabled="loading"
        />
      </div>

      <!-- Project Type -->
      <div>
        <label for="projectType" class="mb-2 block text-sm font-medium text-light-gray">
          Project Type <span class="text-red-400">*</span>
        </label>
        <select
          id="projectType"
          v-model="formData.projectType"
          required
          :disabled="loading"
          class="w-full rounded-lg border border-medium-gray/30 bg-form-bg px-4 py-3 text-white transition-colors focus:border-electric-blue focus:outline-none focus:ring-2 focus:ring-electric-blue/20 disabled:opacity-50"
        >
          <option value="">Select a project type</option>
          <option value="web-app">Web Application</option>
          <option value="api-development">API Development</option>
          <option value="full-stack">Full-Stack Project</option>
          <option value="consultation">Consultation</option>
          <option value="other">Other</option>
        </select>
        <p v-if="validationErrors.projectType" class="mt-1 text-xs text-red-400">
          {{ validationErrors.projectType }}
        </p>
      </div>

      <!-- Budget Range (optional) -->
      <div>
        <label for="budget" class="mb-2 block text-sm font-medium text-light-gray">
          Budget Range (Optional)
        </label>
        <select
          id="budget"
          v-model="formData.budget"
          :disabled="loading"
          class="w-full rounded-lg border border-medium-gray/30 bg-form-bg px-4 py-3 text-white transition-colors focus:border-electric-blue focus:outline-none focus:ring-2 focus:ring-electric-blue/20 disabled:opacity-50"
        >
          <option value="">Prefer not to say</option>
          <option value="<5k">&lt; $5,000</option>
          <option value="5k-10k">$5,000 - $10,000</option>
          <option value="10k-20k">$10,000 - $20,000</option>
          <option value="20k+">$20,000+</option>
          <option value="not-sure">Not Sure Yet</option>
        </select>
      </div>

      <!-- Message -->
      <div class="w-full">
        <label for="message" class="mb-2 block text-sm font-medium text-light-gray">
          Message <span class="text-red-400">*</span>
        </label>
        <Textarea
          id="message"
          v-model="formData.message"
          placeholder="Tell us about your project..."
          :rows="10"
          required
          :disabled="loading"
          class="w-full"
        />
        <p class="mt-1 text-xs text-medium-gray">Minimum 20 characters</p>
        <p v-if="validationErrors.message" class="mt-1 text-xs text-red-400">
          {{ validationErrors.message }}
        </p>
      </div>

      <!-- Honeypot (hidden field for spam protection) -->
      <input
        v-model="formData.website"
        type="text"
        name="website"
        tabindex="-1"
        autocomplete="off"
        class="absolute -left-[9999px]"
      />

      <!-- Submit Button -->
      <Button type="submit" :disabled="loading" class="w-full">
        <span v-if="!loading">Send Message</span>
        <span v-else class="flex items-center justify-center">
          <svg
            class="mr-2 h-5 w-5 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Sending...
        </span>
      </Button>
    </form>
  </div>
</template>

<script setup lang="ts">
import type { ContactFormData } from '../types/contact'
import Input from './ui/Input.vue'
import Textarea from './ui/Textarea.vue'
import Button from './ui/Button.vue'

const { state, submitForm } = useContact()
const loading = computed(() => state.value.loading)
const error = computed(() => state.value.error)
const success = computed(() => state.value.success)

// Local validation errors
const validationErrors = ref<Partial<Record<keyof ContactFormData, string>>>({})

const formData = ref<ContactFormData>({
  name: '',
  email: '',
  company: '',
  projectType: '',
  budget: undefined,
  message: '',
  website: '', // Honeypot field
})

const handleSubmit = async () => {
  // Clear previous validation errors
  validationErrors.value = {}
  
  const result = await submitForm(formData.value)
  
  // Handle validation errors from server
  if (!result.success && 'errors' in result) {
    validationErrors.value = result.errors as Partial<Record<keyof ContactFormData, string>>
  }
  
  // Reset form on success
  if (success.value) {
    formData.value = {
      name: '',
      email: '',
      company: '',
      projectType: '',
      budget: undefined,
      message: '',
      website: '',
    }
  }
}
</script>
