# Codenova Innovations - Design System

## Design Philosophy
**"Tech Lab Dark"** - A sophisticated, developer-focused aesthetic that emphasizes innovation, technical excellence, and modern engineering. The design should feel like stepping into a cutting-edge development lab, not a corporate marketing site.

## Color Palette

### Primary Colors
- **Deep Navy (Background)**: `#0A1929` - Main background, creates depth
- **Electric Blue (Primary)**: `#3B82F6` - CTAs, highlights, interactive elements
- **Cyan Accent (Secondary)**: `#06B6D4` - Code blocks, technical highlights, secondary actions

### Neutral Scale
- **Pure White**: `#FFFFFF` - Primary text on dark backgrounds
- **Light Gray**: `#E5E7EB` - Secondary text, subtle borders
- **Medium Gray**: `#9CA3AF` - Tertiary text, muted elements
- **Dark Gray**: `#1F2937` - Card backgrounds, elevated surfaces
- **Darker Gray**: `#111827` - Secondary backgrounds, subtle depth

### Accent Colors
- **Success Green**: `#10B981` - Success states, positive metrics
- **Warning Amber**: `#F59E0B` - Warnings, important notices
- **Error Red**: `#EF4444` - Errors, critical alerts
- **Purple Highlight**: `#8B5CF6` - Special features, premium elements

### Gradients
- **Primary Gradient**: `linear-gradient(135deg, #3B82F6 0%, #06B6D4 100%)`
- **Dark Gradient**: `linear-gradient(180deg, #0A1929 0%, #1F2937 100%)`
- **Glow Effect**: `radial-gradient(circle at center, #3B82F6 0%, transparent 70%)`

## Typography

### Font Families
- **Headings**: `Inter` (700, 800 weights) - Modern, professional, highly legible
- **Body Text**: `Inter` (400, 500, 600 weights) - Same family for consistency
- **Code/Technical**: `JetBrains Mono` (400, 500 weights) - Monospace for code snippets

### Type Scale
```
H1: 3.5rem (56px) / Line: 1.1 / Weight: 800 / Letter-spacing: -0.02em
H2: 2.5rem (40px) / Line: 1.2 / Weight: 700 / Letter-spacing: -0.01em
H3: 2rem (32px) / Line: 1.3 / Weight: 700
H4: 1.5rem (24px) / Line: 1.4 / Weight: 600
H5: 1.25rem (20px) / Line: 1.5 / Weight: 600
Body: 1rem (16px) / Line: 1.7 / Weight: 400
Small: 0.875rem (14px) / Line: 1.6 / Weight: 400
Caption: 0.75rem (12px) / Line: 1.5 / Weight: 500
```

## Spacing System
Using 8px base unit (Tailwind-compatible):
- **xs**: 0.5rem (8px)
- **sm**: 1rem (16px)
- **md**: 1.5rem (24px)
- **lg**: 2rem (32px)
- **xl**: 3rem (48px)
- **2xl**: 4rem (64px)
- **3xl**: 6rem (96px)

## Component Styles

### Buttons
**Primary Button**:
- Background: Electric Blue (#3B82F6)
- Text: White
- Padding: 0.75rem 2rem (12px 32px)
- Border Radius: 0.5rem (8px)
- Hover: Brightness(110%), Scale(1.02)
- Active: Scale(0.98)
- Transition: all 0.2s ease

**Secondary Button**:
- Background: Transparent
- Border: 2px solid Electric Blue
- Text: Electric Blue
- Hover: Background Electric Blue, Text White

**Ghost Button**:
- Background: Transparent
- Text: Light Gray
- Hover: Background Dark Gray

### Cards
- Background: Dark Gray (#1F2937)
- Border: 1px solid rgba(59, 130, 246, 0.1)
- Border Radius: 1rem (16px)
- Padding: 2rem (32px)
- Box Shadow: 0 4px 6px rgba(0, 0, 0, 0.3)
- Hover: Border color Electric Blue, translate Y(-4px)

### Code Blocks
- Background: #111827
- Border: 1px solid rgba(6, 182, 212, 0.3)
- Border Radius: 0.5rem (8px)
- Padding: 1.5rem
- Font: JetBrains Mono
- Syntax Highlighting: VS Code Dark+ theme

### Navigation
- Background: rgba(10, 25, 41, 0.8) with backdrop-blur
- Height: 4rem (64px)
- Logo: Left-aligned
- Links: Center/Right-aligned
- Mobile: Hamburger menu with slide-in drawer

## Visual Effects

### Glassmorphism
```css
background: rgba(31, 41, 55, 0.6);
backdrop-filter: blur(12px);
border: 1px solid rgba(255, 255, 255, 0.1);
```

### Glow Effects (for interactive elements)
```css
box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
transition: box-shadow 0.3s ease;
```

### Animations
- **Fade In Up**: opacity 0→1, translateY(20px)→0, 0.6s ease
- **Scale In**: scale 0.95→1, opacity 0→1, 0.4s ease
- **Slide In Left**: translateX(-20px)→0, opacity 0→1, 0.5s ease
- **Pulse (for CTAs)**: scale 1→1.05→1, 2s infinite

## Layout Grid
- **Container Max Width**: 1280px (xl)
- **Gutter**: 2rem (32px)
- **Columns**: 12-column grid system
- **Breakpoints**:
  - sm: 640px
  - md: 768px
  - lg: 1024px
  - xl: 1280px
  - 2xl: 1536px

## Iconography
- **Icon Library**: Heroicons (outline for light, solid for emphasis)
- **Size Scale**: 16px, 20px, 24px, 32px, 48px
- **Style**: Consistent stroke width (1.5px for outline)
- **Color**: Inherit from parent or Electric Blue for emphasis

## Dark Mode Implementation
- **Default**: Dark mode ONLY (no light mode toggle needed)
- **Contrast**: WCAG AA compliant (4.5:1 for normal text, 3:1 for large)
- **Focus States**: 2px Electric Blue outline with 2px offset

## Accessibility
- **Focus Indicators**: Visible 2px outline on all interactive elements
- **Color Contrast**: Minimum 4.5:1 for text, 3:1 for UI components
- **Keyboard Navigation**: All interactive elements reachable via Tab
- **Screen Readers**: Semantic HTML, ARIA labels where needed
- **Motion**: Respect prefers-reduced-motion

## Page-Specific Design Notes

### Home Page
- Full-height hero with animated gradient background
- Large typography with glowing effects
- Floating tech stack icons with parallax
- CTA buttons with glow hover states

### Projects Page
- Grid layout for project cards (3 columns desktop, 2 tablet, 1 mobile)
- GitHub integration with live stats
- Hover reveals project details
- Tech stack badges with color-coding

### Capabilities Page
- Icon-led feature cards
- Clean, scannable layout
- Technical specifications in code blocks
- Process diagrams with connection lines

### Stack Page
- Technology cards with logos
- Proficiency indicators (visual bars)
- Categorized sections (Frontend, Backend, DevOps, etc.)
- Hover shows experience level/years

### About/Contact Page
- Company profile with timeline
- Contact form with validation
- Social links with icon buttons
- Embedded map/office information

## Code Style Examples

### Tailwind Class Patterns
```html
<!-- Primary Button -->
<button class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200 hover:scale-105 active:scale-95">

<!-- Card -->
<div class="bg-gray-800 border border-blue-500/10 rounded-2xl p-8 shadow-xl hover:border-blue-500 hover:-translate-y-1 transition-all duration-300">

<!-- Heading with Gradient -->
<h1 class="text-5xl font-extrabold bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
```

## Design References
- **Inspiration**: Vercel, Linear, GitHub Dark, Railway
- **Avoid**: Generic corporate templates, stock photos, bright colors
- **Embrace**: Code aesthetics, terminal vibes, developer tools UI
