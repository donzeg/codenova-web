import { Resend } from 'resend'
import type { ContactFormData } from '../../types/contact'

export const sendContactEmail = async (data: ContactFormData) => {
  const config = useRuntimeConfig()
  const resendApiKey = config.resendApiKey
  const contactEmail = config.contactEmail

  // Check if Resend is configured
  if (!resendApiKey) {
    console.warn('Resend API key not configured. Email will not be sent.')
    throw new Error('Email service not configured')
  }

  const resend = new Resend(resendApiKey)

  try {
    const emailContent = generateEmailHTML(data)
    const plainTextContent = generateEmailPlainText(data)

    const response = await resend.emails.send({
      from: 'Codenova Website <noreply@codenova.cc>',
      to: [contactEmail],
      replyTo: data.email,
      subject: `New Contact Form Submission from ${data.name}`,
      html: emailContent,
      text: plainTextContent
    })

    return {
      success: true,
      messageId: response.data?.id,
      message: 'Email sent successfully'
    }
  } catch (error) {
    console.error('Error sending email:', error)
    throw new Error('Failed to send email')
  }
}

/**
 * Generate HTML email content
 */
function generateEmailHTML(data: ContactFormData): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Contact Form Submission</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 20px auto;
      background: #ffffff;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .header {
      background: linear-gradient(135deg, #3B82F6 0%, #06B6D4 100%);
      color: #ffffff;
      padding: 30px 20px;
      text-align: center;
    }
    .header h1 {
      margin: 0;
      font-size: 24px;
      font-weight: 700;
    }
    .content {
      padding: 30px 20px;
    }
    .field {
      margin-bottom: 20px;
      padding-bottom: 15px;
      border-bottom: 1px solid #e5e7eb;
    }
    .field:last-child {
      border-bottom: none;
    }
    .label {
      font-weight: 600;
      color: #3B82F6;
      margin-bottom: 5px;
      font-size: 14px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .value {
      color: #1f2937;
      font-size: 16px;
      word-wrap: break-word;
    }
    .message-box {
      background: #f9fafb;
      padding: 15px;
      border-radius: 6px;
      border-left: 4px solid #3B82F6;
      white-space: pre-wrap;
    }
    .footer {
      background: #f9fafb;
      padding: 20px;
      text-align: center;
      font-size: 12px;
      color: #6b7280;
      border-top: 1px solid #e5e7eb;
    }
    .badge {
      display: inline-block;
      background: #e0f2fe;
      color: #0369a1;
      padding: 4px 12px;
      border-radius: 12px;
      font-size: 13px;
      font-weight: 500;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>📧 New Contact Form Submission</h1>
    </div>
    
    <div class="content">
      <div class="field">
        <div class="label">From</div>
        <div class="value"><strong>${escapeHtml(data.name)}</strong></div>
      </div>
      
      <div class="field">
        <div class="label">Email</div>
        <div class="value">
          <a href="mailto:${data.email}" style="color: #3B82F6; text-decoration: none;">
            ${escapeHtml(data.email)}
          </a>
        </div>
      </div>
      
      ${data.company ? `
      <div class="field">
        <div class="label">Company</div>
        <div class="value">${escapeHtml(data.company)}</div>
      </div>
      ` : ''}
      
      ${data.projectType ? `
      <div class="field">
        <div class="label">Project Type</div>
        <div class="value">
          <span class="badge">${formatProjectType(data.projectType)}</span>
        </div>
      </div>
      ` : ''}
      
      ${data.budget ? `
      <div class="field">
        <div class="label">Budget Range</div>
        <div class="value">
          <span class="badge">${formatBudget(data.budget)}</span>
        </div>
      </div>
      ` : ''}
      
      <div class="field">
        <div class="label">Message</div>
        <div class="message-box">${escapeHtml(data.message)}</div>
      </div>
      
      <div class="field">
        <div class="label">Submitted At</div>
        <div class="value">${new Date().toLocaleString('en-US', { 
          dateStyle: 'full', 
          timeStyle: 'long',
          timeZone: 'Africa/Lagos'
        })}</div>
      </div>
    </div>
    
    <div class="footer">
      <p>This email was sent from the Codenova Innovations contact form.</p>
      <p>Reply directly to this email to respond to ${escapeHtml(data.name)}.</p>
    </div>
  </div>
</body>
</html>
  `
}

/**
 * Generate plain text email content
 */
function generateEmailPlainText(data: ContactFormData): string {
  let text = `NEW CONTACT FORM SUBMISSION\n`
  text += `==============================\n\n`
  text += `From: ${data.name}\n`
  text += `Email: ${data.email}\n`
  
  if (data.company) {
    text += `Company: ${data.company}\n`
  }
  
  if (data.projectType) {
    text += `Project Type: ${formatProjectType(data.projectType)}\n`
  }
  
  if (data.budget) {
    text += `Budget Range: ${formatBudget(data.budget)}\n`
  }
  
  text += `\n--- MESSAGE ---\n\n`
  text += `${data.message}\n\n`
  text += `--- END MESSAGE ---\n\n`
  text += `Submitted: ${new Date().toLocaleString('en-US', { 
    dateStyle: 'full', 
    timeStyle: 'long',
    timeZone: 'Africa/Lagos'
  })}\n`
  
  return text
}

/**
 * Escape HTML to prevent XSS
 */
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  }
  return text.replace(/[&<>"']/g, (m) => map[m] || m)
}

/**
 * Format project type for display
 */
function formatProjectType(type: string): string {
  const types: Record<string, string> = {
    'web-app': 'Web Application',
    'api-development': 'API Development',
    'full-stack': 'Full-Stack Project',
    'consultation': 'Consultation',
    'other': 'Other'
  }
  return types[type] || type
}

/**
 * Format budget for display
 */
function formatBudget(budget: string): string {
  const budgets: Record<string, string> = {
    '<5k': 'Under $5,000',
    '5k-10k': '$5,000 - $10,000',
    '10k-20k': '$10,000 - $20,000',
    '20k+': 'Over $20,000',
    'not-sure': 'Not Sure Yet'
  }
  return budgets[budget] || budget
}
