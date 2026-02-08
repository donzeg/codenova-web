// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    '@nuxtjs/seo'
  ],

  css: ['~/assets/css/main.css'],

  // TypeScript configuration
  typescript: {
    strict: true,
    typeCheck: false // Disable type checking in dev for performance
  },

  // Color mode configuration (Dark mode only)
  colorMode: {
    preference: 'dark',
    fallback: 'dark',
    classSuffix: ''
  },

  // SEO configuration
  site: {
    url: process.env.NUXT_PUBLIC_SITE_URL || 'https://codenova.cc',
    name: 'Codenova Innovations',
    description: 'Innovation-driven software development for businesses that demand excellence',
    defaultLocale: 'en'
  },

  robots: {
    robotsTxt: false
  },

  // App configuration
  app: {
    baseURL: process.env.NODE_ENV === 'production' ? '/' : '/codenova-web/',
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      htmlAttrs: {
        lang: 'en'
      },
      link: [
        {
          rel: 'icon',
          type: 'image/svg+xml',
          href: process.env.NODE_ENV === 'production' ? '/favicon.svg' : '/codenova-web/favicon.svg'
        },
        {
          rel: 'preconnect',
          href: 'https://fonts.googleapis.com'
        },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: 'anonymous'
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap'
        }
      ],
      meta: [
        {
          property: 'og:image',
          content: process.env.NODE_ENV === 'production' ? '/og-image.svg' : '/codenova-web/og-image.svg'
        }
      ]
    }
  },

  // Runtime configuration
  runtimeConfig: {
    // Server-only keys
    githubToken: process.env.GITHUB_TOKEN || '',
    contactEmail: process.env.CONTACT_EMAIL || 'contact@codenova.cc',
    resendApiKey: process.env.RESEND_API_KEY || '',
    
    // Public keys (exposed to client)
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://codenova.cc',
      githubUsername: process.env.GITHUB_USERNAME || 'donzeg'
    }
  },

  // Vite configuration
  vite: {
    server: {
      hmr: {
        protocol: 'ws',
        host: '217.117.2.101',
        port: 24678,
        clientPort: 24678
      }
    }
  },

  // Nitro server configuration
  nitro: {
    preset: 'node-server',
    routeRules: {
      '/**': {
        headers: {
          'X-Frame-Options': 'DENY',
          'X-Content-Type-Options': 'nosniff',
          'Referrer-Policy': 'strict-origin-when-cross-origin',
          'Permissions-Policy': 'camera=(), microphone=(), geolocation=()'
        }
      }
    }
  }
})
