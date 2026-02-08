import { gsap } from 'gsap'

export const useAnimations = () => {
  /**
   * Fade In Up animation
   * Element starts below and fades in while moving up
   */
  const fadeInUp = (element: HTMLElement | string, options = {}) => {
    const defaults = {
      duration: 0.6,
      y: 20,
      opacity: 0,
      ease: 'power2.out',
      ...options
    }

    return gsap.from(element, {
      y: defaults.y,
      opacity: defaults.opacity,
      duration: defaults.duration,
      ease: defaults.ease,
      ...options
    })
  }

  /**
   * Scale In animation
   * Element starts slightly smaller and scales up while fading in
   */
  const scaleIn = (element: HTMLElement | string, options = {}) => {
    const defaults = {
      duration: 0.4,
      scale: 0.95,
      opacity: 0,
      ease: 'power2.out',
      ...options
    }

    return gsap.from(element, {
      scale: defaults.scale,
      opacity: defaults.opacity,
      duration: defaults.duration,
      ease: defaults.ease,
      ...options
    })
  }

  /**
   * Slide In Left animation
   * Element slides in from the left while fading in
   */
  const slideInLeft = (element: HTMLElement | string, options = {}) => {
    const defaults = {
      duration: 0.5,
      x: -20,
      opacity: 0,
      ease: 'power2.out',
      ...options
    }

    return gsap.from(element, {
      x: defaults.x,
      opacity: defaults.opacity,
      duration: defaults.duration,
      ease: defaults.ease,
      ...options
    })
  }

  /**
   * Slide In Right animation
   * Element slides in from the right while fading in
   */
  const slideInRight = (element: HTMLElement | string, options = {}) => {
    const defaults = {
      duration: 0.5,
      x: 20,
      opacity: 0,
      ease: 'power2.out',
      ...options
    }

    return gsap.from(element, {
      x: defaults.x,
      opacity: defaults.opacity,
      duration: defaults.duration,
      ease: defaults.ease,
      ...options
    })
  }

  /**
   * Pulse animation
   * Element continuously pulses (scale up and down)
   */
  const pulse = (element: HTMLElement | string, options = {}) => {
    const defaults = {
      duration: 2,
      scale: 1.05,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
      ...options
    }

    return gsap.to(element, {
      scale: defaults.scale,
      duration: defaults.duration,
      repeat: defaults.repeat,
      yoyo: defaults.yoyo,
      ease: defaults.ease,
      ...options
    })
  }

  /**
   * Stagger animation
   * Animates multiple elements with a delay between each
   */
  const staggerFadeInUp = (elements: HTMLElement[] | string, options = {}) => {
    const defaults = {
      duration: 0.6,
      y: 20,
      opacity: 0,
      stagger: 0.1,
      ease: 'power2.out',
      ...options
    }

    return gsap.from(elements, {
      y: defaults.y,
      opacity: defaults.opacity,
      duration: defaults.duration,
      stagger: defaults.stagger,
      ease: defaults.ease,
      ...options
    })
  }

  /**
   * Parallax scroll effect
   * Element moves at different speed than scroll
   */
  const parallax = (element: HTMLElement | string, speed = 0.5) => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const el = typeof element === 'string' ? document.querySelector(element) : element
      if (el) {
        gsap.to(el, {
          y: scrollY * speed,
          ease: 'none',
          duration: 0
        })
      }
    }

    window.addEventListener('scroll', handleScroll)
    
    // Cleanup function
    return () => window.removeEventListener('scroll', handleScroll)
  }

  /**
   * Count up animation for numbers
   */
  const countUp = (element: HTMLElement | string, endValue: number, options = {}) => {
    const defaults = {
      duration: 2,
      ease: 'power1.out',
      ...options
    }

    const el = typeof element === 'string' ? document.querySelector(element) : element
    if (!el) return

    const obj = { value: 0 }
    return gsap.to(obj, {
      value: endValue,
      duration: defaults.duration,
      ease: defaults.ease,
      onUpdate: () => {
        el.textContent = Math.round(obj.value).toString()
      },
      ...options
    })
  }

  return {
    fadeInUp,
    scaleIn,
    slideInLeft,
    slideInRight,
    pulse,
    staggerFadeInUp,
    parallax,
    countUp
  }
}
