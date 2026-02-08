# Codenova Innovations - Image Guide

## 📁 Folder Structure

```
public/images/
├── hero/          # Large hero/header images for page tops
├── team/          # Team photos, people working together
├── workspace/     # Office, desks, equipment photos
├── process/       # Workflow, planning, collaboration images
├── about/         # Company culture, office environment
└── backgrounds/   # Subtle background patterns/textures
```

## 🎯 Images Needed by Page

### 1. HOME PAGE (index.vue) - 3-4 images

**Priority: HIGH**

#### Hero Section (1 image)
- **Location**: `public/images/hero/home-hero.jpg`
- **Type**: Wide panoramic shot of modern tech office OR developer at work
- **Specs**: 1920x1080px minimum, dark/moody lighting, blue/cyan tones preferred
- **Example searches**: 
  - "software developer dark office blue lighting"
  - "modern tech workspace night"
  - "developer coding multiple monitors dark"

#### What We Do Section (3 small images - optional)
- **Location**: `public/images/workspace/enterprise.jpg`, `fullstack.jpg`, `devops.jpg`
- **Type**: Supporting images for the 3 service cards
- **Specs**: 800x600px, can be more abstract/icon-like
- **Ideas**:
  - Enterprise: Server room, cloud infrastructure
  - Full-Stack: Developer with laptop and mobile device
  - DevOps: Terminal/command line interface

---

### 2. CAPABILITIES PAGE (capabilities.vue) - 2-3 images

**Priority: MEDIUM**

#### Page Hero (1 image)
- **Location**: `public/images/hero/capabilities-hero.jpg`
- **Type**: Team collaboration - 2-3 developers around screen
- **Specs**: 1920x800px minimum
- **Example searches**:
  - "software team collaboration meeting"
  - "developers pair programming"
  - "tech team planning whiteboard"

#### Development Process Section (1 image)
- **Location**: `public/images/process/development-workflow.jpg`
- **Type**: Whiteboard with diagrams, or team in planning session
- **Specs**: 1200x800px
- **Example searches**:
  - "agile planning board"
  - "software architecture whiteboard"
  - "tech team scrum meeting"

---

### 3. PROJECTS PAGE (projects.vue) - 1-2 images

**Priority: LOW** (GitHub data is already visual)

#### Page Hero (1 image - optional)
- **Location**: `public/images/hero/projects-hero.jpg`
- **Type**: Developer reviewing code on screen, or project dashboard
- **Specs**: 1920x600px
- **Example searches**:
  - "developer code review"
  - "software project dashboard"
  - "github projects screen"

---

### 4. STACK PAGE (stack.vue) - 1-2 images

**Priority: LOW** (Tech logos are already visual)

#### Page Hero (1 image - optional)
- **Location**: `public/images/hero/stack-hero.jpg`
- **Type**: Multiple monitors with code, modern developer setup
- **Specs**: 1920x600px
- **Example searches**:
  - "developer triple monitor setup"
  - "modern coding workspace"
  - "software engineer desk setup"

---

### 5. ABOUT PAGE (about.vue) - 3-5 images

**Priority: VERY HIGH** (Most important for human connection!)

#### Company Header (1 image)
- **Location**: `public/images/about/company-hero.jpg`
- **Type**: Professional team photo OR modern office reception
- **Specs**: 1920x800px
- **Example searches**:
  - "tech company team photo"
  - "diverse software development team"
  - "modern tech startup office"

#### Mission/Values Section (2-3 images)
- **Location**: `public/images/about/mission.jpg`, `values.jpg`, `culture.jpg`
- **Type**: Team moments showing collaboration, innovation, professionalism
- **Specs**: 800x600px each
- **Ideas**:
  - Mission: Team celebrating a launch/success
  - Values: Diverse team in discussion
  - Culture: Office environment with team working

#### Team Section (1-2 images - if you want to show team)
- **Location**: `public/images/team/team-1.jpg`, `team-2.jpg`
- **Type**: Individual or small group professional photos
- **Specs**: 400x400px (square), professional headshot style
- **Example searches**:
  - "professional developer headshot"
  - "tech professional portrait"

---

## 📐 Image Specifications

### General Guidelines
- **Format**: JPG for photos, WebP for optimized versions
- **File size**: Keep under 500KB (use compression)
- **Aspect ratios**: 
  - Hero images: 16:9 or 21:9
  - Card images: 4:3 or 1:1
  - Background images: Can be abstract patterns
- **Color scheme**: 
  - Dark tones with blue/cyan accents (match website theme)
  - Avoid bright, saturated colors
  - Professional, modern aesthetic

### Image Optimization
After adding images, we'll optimize them using:
- WebP conversion for better performance
- Lazy loading
- Responsive sizes

---

## 🔍 Where to Find Images

### Free High-Quality Sources:
1. **Unsplash** (unsplash.com) - Best for tech/office photos
   - Search: "developer", "coding", "tech office", "software team"
   
2. **Pexels** (pexels.com) - Great variety
   - Search: "programmer", "workspace", "technology office"
   
3. **Pixabay** (pixabay.com) - Good for abstract tech
   
4. **Freepik** (freepik.com) - More corporate/professional style

### Paid Options (if budget allows):
1. **Envato Elements** - Premium quality, diverse selection
2. **Adobe Stock** - Professional grade
3. **Shutterstock** - Huge library

---

## 📝 Naming Convention

Use descriptive, kebab-case names:
- ✅ `home-hero-developer.jpg`
- ✅ `about-team-collaboration.jpg`
- ✅ `workspace-modern-office.jpg`
- ❌ `IMG_1234.jpg`
- ❌ `photo1.jpg`

---

## 🎨 Style Guidelines

**DO:**
- ✅ Modern, clean, professional aesthetics
- ✅ Diverse representation (different genders, ethnicities)
- ✅ Dark/moody lighting to match website theme
- ✅ Technology visible (laptops, monitors, code)
- ✅ Natural, candid moments (not overly posed)

**DON'T:**
- ❌ Stock photo "cheese" (fake smiles, pointing at screens)
- ❌ Outdated technology (old monitors, flip phones)
- ❌ Bright, corporate fluorescent lighting
- ❌ Generic office clipart style
- ❌ Overly saturated colors

---

## 🚀 Priority Order for Image Collection

1. **FIRST** - About page images (3-5) - Most important for trust/connection
2. **SECOND** - Home hero image (1) - First impression
3. **THIRD** - Capabilities hero (1) - Shows team collaboration
4. **FOURTH** - Other supporting images as needed

---

## 📋 Checklist

- [ ] About page company hero
- [ ] About page mission/values images (2-3)
- [ ] Home page hero image
- [ ] Capabilities page hero
- [ ] Process/workflow image
- [ ] (Optional) Projects hero
- [ ] (Optional) Stack hero
- [ ] (Optional) What We Do card images

**Total needed: 6-10 images**  
**Minimum essential: 4-5 images**

---

Once you've collected the images, upload them to the appropriate folders and I'll:
1. Optimize them (WebP conversion, compression)
2. Add responsive image components
3. Integrate them into the pages with proper lazy loading
4. Add subtle animations/effects
5. Ensure accessibility (alt text, etc.)
