import type { Config } from 'tailwindcss'

export default {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Primary Colors
        'deep-navy': '#0A1929',
        'electric-blue': '#3B82F6',
        'cyan-accent': '#06B6D4',
        
        // Neutral Scale
        'light-gray': '#E5E7EB',
        'medium-gray': '#9CA3AF',
        'dark-gray': '#1F2937',
        'darker-gray': '#111827',
        'form-bg': '#374151',
        
        // Accent Colors
        'success-green': '#10B981',
        'warning-amber': '#F59E0B',
        'error-red': '#EF4444',
        'purple-highlight': '#8B5CF6'
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace']
      },
      fontSize: {
        'heading-1': ['3.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '800' }],
        'heading-2': ['2.5rem', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '700' }],
        'heading-3': ['2rem', { lineHeight: '1.3', fontWeight: '700' }],
        'heading-4': ['1.5rem', { lineHeight: '1.4', fontWeight: '600' }],
        'heading-5': ['1.25rem', { lineHeight: '1.5', fontWeight: '600' }],
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #3B82F6 0%, #06B6D4 100%)',
        'gradient-dark': 'linear-gradient(180deg, #0A1929 0%, #1F2937 100%)',
        'glow-effect': 'radial-gradient(circle at center, #3B82F6 0%, transparent 70%)'
      },
      boxShadow: {
        'glow': '0 0 20px rgba(59, 130, 246, 0.3)',
        'glow-lg': '0 0 30px rgba(59, 130, 246, 0.4)',
        'card': '0 4px 6px rgba(0, 0, 0, 0.3)'
      },
      backdropBlur: {
        'glass': '12px'
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'scale-in': 'scaleIn 0.4s ease-out',
        'slide-in-left': 'slideInLeft 0.5s ease-out',
        'pulse-slow': 'pulse 2s infinite'
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' }
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' }
        }
      }
    }
  },
  plugins: []
} satisfies Config
