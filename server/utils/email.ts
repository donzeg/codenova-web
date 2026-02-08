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

/**
 * Send auto-reply acknowledgment to customer
 */
export const sendAutoReplyEmail = async (data: ContactFormData) => {
  const config = useRuntimeConfig()
  const resendApiKey = config.resendApiKey

  if (!resendApiKey) {
    console.warn('Resend API key not configured. Auto-reply will not be sent.')
    return {
      success: false,
      message: 'Email service not configured'
    }
  }

  const resend = new Resend(resendApiKey)

  try {
    const emailContent = generateAutoReplyHTML(data)
    const plainTextContent = generateAutoReplyPlainText(data)

    const response = await resend.emails.send({
      from: 'Codenova Innovations <noreply@codenova.cc>',
      to: [data.email],
      subject: 'Thank You for Contacting Codenova Innovations',
      html: emailContent,
      text: plainTextContent
    })

    return {
      success: true,
      messageId: response.data?.id,
      message: 'Auto-reply sent successfully'
    }
  } catch (error) {
    console.error('Error sending auto-reply:', error)
    // Don't throw - auto-reply failure shouldn't block the main submission
    return {
      success: false,
      message: 'Failed to send auto-reply'
    }
  }
}

/**
 * Generate auto-reply HTML email
 */
function generateAutoReplyHTML(data: ContactFormData): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Thank You - Codenova Innovations</title>
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
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    .header {
      background: linear-gradient(135deg, #3B82F6 0%, #06B6D4 100%);
      color: #ffffff;
      padding: 40px 20px;
      text-align: center;
    }
    .header h1 {
      margin: 0 0 10px 0;
      font-size: 28px;
      font-weight: 700;
    }
    .header p {
      margin: 0;
      font-size: 16px;
      opacity: 0.95;
    }
    .content {
      padding: 40px 30px;
    }
    .greeting {
      font-size: 18px;
      color: #1f2937;
      margin-bottom: 20px;
    }
    .message {
      color: #4b5563;
      font-size: 16px;
      line-height: 1.8;
      margin-bottom: 20px;
    }
    .summary-box {
      background: #f9fafb;
      border-left: 4px solid #3B82F6;
      padding: 20px;
      border-radius: 6px;
      margin: 30px 0;
    }
    .summary-title {
      font-weight: 600;
      color: #3B82F6;
      margin-bottom: 15px;
      font-size: 14px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .summary-item {
      margin-bottom: 8px;
      color: #4b5563;
      font-size: 15px;
    }
    .summary-label {
      color: #6b7280;
      font-weight: 500;
    }
    .cta-box {
      background: linear-gradient(135deg, #3B82F6 0%, #06B6D4 100%);
      color: #ffffff;
      padding: 25px;
      border-radius: 8px;
      text-align: center;
      margin: 30px 0;
    }
    .cta-title {
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 10px;
    }
    .cta-text {
      font-size: 15px;
      opacity: 0.95;
      margin-bottom: 20px;
    }
    .button {
      display: inline-block;
      background: #ffffff;
      color: #3B82F6;
      padding: 12px 30px;
      border-radius: 6px;
      text-decoration: none;
      font-weight: 600;
      font-size: 15px;
    }
    .footer {
      background: #f9fafb;
      padding: 30px 20px;
      text-align: center;
      border-top: 1px solid #e5e7eb;
    }
    .footer-text {
      color: #6b7280;
      font-size: 14px;
      margin-bottom: 15px;
    }
    .social-links {
      margin-top: 20px;
    }
    .social-links a {
      color: #3B82F6;
      text-decoration: none;
      margin: 0 10px;
      font-size: 14px;
    }
    .checkmark {
      display: inline-block;
      width: 60px;
      height: 60px;
      background: rgba(255,255,255,0.2);
      border-radius: 50%;
      text-align: center;
      line-height: 60px;
      font-size: 30px;
      margin-bottom: 15px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="checkmark">✓</div>
      <h1>Thank You!</h1>
      <p>We've received your message</p>
    </div>
    
    <div class="content">
      <div class="greeting">
        Hello ${escapeHtml(data.name)},
      </div>
      
      <div class="message">
        Thank you for reaching out to Codenova Innovations! We've successfully received your message and appreciate you taking the time to contact us.
      </div>
      
      <div class="message">
        Our team reviews all inquiries carefully, and we'll get back to you within <strong>24-48 hours</strong> with a detailed response. In the meantime, feel free to explore our portfolio and learn more about what we do.
      </div>
      
      <div class="summary-box">
        <div class="summary-title">Your Submission Summary</div>
        <div class="summary-item">
          <span class="summary-label">Name:</span> ${escapeHtml(data.name)}
        </div>
        <div class="summary-item">
          <span class="summary-label">Email:</span> ${escapeHtml(data.email)}
        </div>
        ${data.company ? `
        <div class="summary-item">
          <span class="summary-label">Company:</span> ${escapeHtml(data.company)}
        </div>
        ` : ''}
        ${data.projectType ? `
        <div class="summary-item">
          <span class="summary-label">Project Type:</span> ${formatProjectType(data.projectType)}
        </div>
        ` : ''}
        ${data.budget ? `
        <div class="summary-item">
          <span class="summary-label">Budget:</span> ${formatBudget(data.budget)}
        </div>
        ` : ''}
        <div class="summary-item">
          <span class="summary-label">Submitted:</span> ${new Date().toLocaleString('en-US', { 
            dateStyle: 'medium', 
            timeStyle: 'short',
            timeZone: 'Africa/Lagos'
          })}
        </div>
      </div>
      
      <div class="cta-box">
        <div class="cta-title">Explore Our Work</div>
        <div class="cta-text">
          While you wait, check out our latest projects and discover how we help businesses succeed.
        </div>
        <a href="https://codenova.cc/projects" class="button">View Projects</a>
      </div>
      
      <div class="message">
        If you have any urgent questions or need to provide additional information, feel free to reply to this email.
      </div>
      
      <div class="message" style="margin-top: 30px;">
        Best regards,<br>
        <strong>The Codenova Innovations Team</strong>
      </div>
    </div>
    
    <div class="footer">
      <div class="footer-text">
        <strong>Codenova Innovations</strong><br>
        Building innovative solutions for the modern web
      </div>
      <div class="social-links">
        <a href="https://codenova.cc">Website</a> •
        <a href="https://codenova.cc/about">About Us</a> •
        <a href="https://codenova.cc/capabilities">Capabilities</a>
      </div>
      <div class="footer-text" style="margin-top: 20px; font-size: 12px;">
        This is an automated response. Please do not reply to confirm receipt.<br>
        If you didn't submit this form, you can safely ignore this email.
      </div>
    </div>
  </div>
</body>
</html>
  `
}

/**
 * Generate auto-reply plain text email
 */
function generateAutoReplyPlainText(data: ContactFormData): string {
  let text = `THANK YOU FOR CONTACTING CODENOVA INNOVATIONS\n`
  text += `===============================================\n\n`
  text += `Hello ${data.name},\n\n`
  text += `Thank you for reaching out to Codenova Innovations! We've successfully received your message and appreciate you taking the time to contact us.\n\n`
  text += `Our team reviews all inquiries carefully, and we'll get back to you within 24-48 hours with a detailed response.\n\n`
  text += `YOUR SUBMISSION SUMMARY\n`
  text += `----------------------\n`
  text += `Name: ${data.name}\n`
  text += `Email: ${data.email}\n`
  
  if (data.company) {
    text += `Company: ${data.company}\n`
  }
  
  if (data.projectType) {
    text += `Project Type: ${formatProjectType(data.projectType)}\n`
  }
  
  if (data.budget) {
    text += `Budget: ${formatBudget(data.budget)}\n`
  }
  
  text += `Submitted: ${new Date().toLocaleString('en-US', { 
    dateStyle: 'medium', 
    timeStyle: 'short',
    timeZone: 'Africa/Lagos'
  })}\n\n`
  
  text += `If you have any urgent questions or need to provide additional information, feel free to reply to this email.\n\n`
  text += `Best regards,\n`
  text += `The Codenova Innovations Team\n\n`
  text += `---\n`
  text += `Codenova Innovations\n`
  text += `Building innovative solutions for the modern web\n`
  text += `https://codenova.cc\n\n`
  text += `This is an automated response. If you didn't submit this form, you can safely ignore this email.\n`
  
  return text
}
