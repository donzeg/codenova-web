export interface ContactFormData {
  name: string
  email: string
  company: string
  projectType: 'web-app' | 'api-development' | 'full-stack' | 'consultation' | 'other' | ''
  budget?: '<5k' | '5k-10k' | '10k-20k' | '20k+' | 'not-sure'
  message: string
  website?: string
  honeypot?: string
}

export interface ContactFormResponse {
  success: boolean
  message: string
  errors?: Record<string, string>
}

export interface ContactFormState {
  loading: boolean
  error: string | null
  success: boolean
}
