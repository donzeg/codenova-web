import { readonly } from 'vue'
import type { ContactFormData, ContactFormState } from '../types/contact'

export const useContact = () => {
  const state = useState<ContactFormState>('contact-form-state', () => ({
    loading: false,
    error: null,
    success: false
  }))

  const submitForm = async (formData: ContactFormData) => {
    state.value.loading = true
    state.value.error = null
    state.value.success = false

    try {
      const response = await $fetch('/api/contact', {
        method: 'POST',
        body: formData
      })

      if (response.success) {
        state.value.success = true
        return { success: true, message: response.message }
      } else {
        // Only set generic error if there are no field-specific errors
        if (!response.errors || Object.keys(response.errors).length === 0) {
          state.value.error = response.message
        }
        return { success: false, errors: response.errors }
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to send message. Please try again later.'
      state.value.error = errorMessage
      return { success: false, message: errorMessage }
    } finally {
      state.value.loading = false
    }
  }

  const resetForm = () => {
    state.value = {
      loading: false,
      error: null,
      success: false
    }
  }

  return {
    state: readonly(state),
    submitForm,
    resetForm
  }
}
