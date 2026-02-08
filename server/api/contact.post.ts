import * as yup from 'yup'
import type { ContactFormData, ContactFormResponse } from '../../types/contact'

// Rate limiting store
const rateLimitStore = new Map<string, { count: number; resetAt: number }>()

// Validation schema
const contactSchema = yup.object({
  name: yup.string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),
  email: yup.string()
    .required('Email is required')
    .email('Invalid email address'),
  company: yup.string()
    .optional()
    .max(100, 'Company name must be less than 100 characters'),
  projectType: yup.string()
    .required('Project type is required')
    .oneOf(['web-app', 'api-development', 'full-stack', 'consultation', 'other']),
  budgetRange: yup.string()
    .optional()
    .oneOf(['<5k', '5k-10k', '10k-20k', '20k+', 'not-sure']),
  message: yup.string()
    .required('Message is required')
    .min(20, 'Message must be at least 20 characters')
    .max(1000, 'Message must be less than 1000 characters'),
  honeypot: yup.string()
    .optional()
    .max(0, 'Spam detected')
})

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const limit = rateLimitStore.get(ip)

  if (!limit || now > limit.resetAt) {
    rateLimitStore.set(ip, {
      count: 1,
      resetAt: now + (60 * 60 * 1000) // 1 hour
    })
    return true
  }

  if (limit.count >= 5) {
    return false
  }

  limit.count++
  return true
}

export default defineEventHandler(async (event): Promise<ContactFormResponse> => {
  const config = useRuntimeConfig(event)

  // Get client IP for rate limiting
  const ip = getRequestHeader(event, 'x-forwarded-for') || 
             getRequestHeader(event, 'x-real-ip') || 
             'unknown'

  // Check rate limit
  if (!checkRateLimit(ip)) {
    throw createError({
      statusCode: 429,
      statusMessage: 'Too many requests. Please try again later.'
    })
  }

  try {
    // Parse and validate request body
    const body = await readBody<ContactFormData>(event)

    // Honeypot check
    if (body.honeypot) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid request'
      })
    }

    // Validate form data
    const validatedData = await contactSchema.validate(body, {
      abortEarly: false,
      stripUnknown: true
    })

    // Send email notification to company
    try {
      await sendContactEmail(validatedData as ContactFormData)
      
      console.log('Contact form submission sent:', {
        name: validatedData.name,
        email: validatedData.email,
        timestamp: new Date().toISOString(),
        ip
      })
    } catch (emailError) {
      console.error('Failed to send notification email:', emailError)
      // Continue even if email fails - we still log the submission
    }

    // Send auto-reply to customer
    try {
      await sendAutoReplyEmail(validatedData as ContactFormData)
      
      console.log('Auto-reply sent to:', validatedData.email)
    } catch (autoReplyError) {
      console.error('Failed to send auto-reply:', autoReplyError)
      // Don't fail the request if auto-reply fails
    }

    // In production, you would send an email here:
    // await sendEmail({
    //   to: config.contactEmail,
    //   from: 'noreply@codenovainnovations.com',
    //   subject: `New Contact Form Submission from ${validatedData.name}`,
    //   text: `
    //     Name: ${validatedData.name}
    //     Email: ${validatedData.email}
    //     Company: ${validatedData.company || 'N/A'}
    //     Project Type: ${validatedData.projectType}
    //     Budget Range: ${validatedData.budgetRange || 'N/A'}
    //     Message: ${validatedData.message}
    //   `
    // })

    return {
      success: true,
      message: 'Thank you for reaching out! We will review your message and respond within 24 hours.'
    }
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      const errors: Record<string, string> = {}
      error.inner.forEach((err) => {
        if (err.path) {
          errors[err.path] = err.message
        }
      })

      return {
        success: false,
        message: 'Validation failed',
        errors
      }
    }

    console.error('Contact form error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to process contact form'
    })
  }
})
