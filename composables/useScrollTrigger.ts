import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register ScrollTrigger plugin
if (import.meta.client) {
  gsap.registerPlugin(ScrollTrigger)
}

export const useScrollTrigger = () => {
  const isClient = import.meta.client

  /**
   * Fade in element when it enters viewport
   */
  const fadeInOnScroll = (element: HTMLElement | string, options: any = {}) => {
    if (!isClient) return null

    const defaults = {
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out',
      ...options
    }

    return gsap.from(element, {
      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
        end: 'top 20%',
        toggleActions: 'play none none reverse',
        ...(options.scrollTrigger || {})
      },
      y: defaults.y,
      opacity: defaults.opacity,
      duration: defaults.duration,
      ease: defaults.ease
    })
  }

  /**
   * Scale up element when scrolling into view
   */
  const scaleOnScroll = (element: HTMLElement | string, options: any = {}) => {
    if (!isClient) return null

    const defaults = {
      scale: 0.9,
      opacity: 0,
      duration: 0.6,
      ease: 'back.out(1.2)',
      ...options
    }

    return gsap.from(element, {
      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
        ...(options.scrollTrigger || {})
      },
      scale: defaults.scale,
      opacity: defaults.opacity,
      duration: defaults.duration,
      ease: defaults.ease
    })
  }

  /**
   * Stagger animation for multiple elements
   */
  const staggerOnScroll = (elements: HTMLElement[] | string, options: any = {}) => {
    if (!isClient) return null

    const defaults = {
      y: 40,
      opacity: 0,
      duration: 0.6,
      stagger: 0.15,
      ease: 'power2.out',
      ...options
    }

    return gsap.from(elements, {
      scrollTrigger: {
        trigger: elements,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
        ...(options.scrollTrigger || {})
      },
      y: defaults.y,
      opacity: defaults.opacity,
      duration: defaults.duration,
      stagger: defaults.stagger,
      ease: defaults.ease
    })
  }

  /**
   * Slide in from left on scroll
   */
  const slideInLeftOnScroll = (element: HTMLElement | string, options: any = {}) => {
    if (!isClient) return null

    const defaults = {
      x: -60,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out',
      ...options
    }

    return gsap.from(element, {
      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
        ...(options.scrollTrigger || {})
      },
      x: defaults.x,
      opacity: defaults.opacity,
      duration: defaults.duration,
      ease: defaults.ease
    })
  }

  /**
   * Slide in from right on scroll
   */
  const slideInRightOnScroll = (element: HTMLElement | string, options: any = {}) => {
    if (!isClient) return null

    const defaults = {
      x: 60,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out',
      ...options
    }

    return gsap.from(element, {
      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
        ...(options.scrollTrigger || {})
      },
      x: defaults.x,
      opacity: defaults.opacity,
      duration: defaults.duration,
      ease: defaults.ease
    })
  }

  /**
   * Parallax effect - element moves slower than scroll
   */
  const parallaxOnScroll = (element: HTMLElement | string, speed = 0.5, options: any = {}) => {
    if (!isClient) return null

    return gsap.to(element, {
      scrollTrigger: {
        trigger: element,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
        ...(options.scrollTrigger || {})
      },
      y: (i, target) => {
        const elementTop = target.offsetTop
        const elementHeight = target.offsetHeight
        const scrollDistance = elementTop + elementHeight - window.innerHeight
        return scrollDistance * speed
      },
      ease: 'none'
    })
  }

  /**
   * Pin element while scrolling through section
   */
  const pinOnScroll = (element: HTMLElement | string, options: any = {}) => {
    if (!isClient) return null

    return ScrollTrigger.create({
      trigger: element,
      start: 'top top',
      end: 'bottom bottom',
      pin: true,
      pinSpacing: false,
      ...options
    })
  }

  /**
   * Reveal text by lines
   */
  const revealTextOnScroll = (element: HTMLElement | string, options: any = {}) => {
    if (!isClient) return null

    const defaults = {
      y: 20,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power2.out',
      ...options
    }

    return gsap.from(element, {
      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
        ...(options.scrollTrigger || {})
      },
      y: defaults.y,
      opacity: defaults.opacity,
      duration: defaults.duration,
      stagger: defaults.stagger,
      ease: defaults.ease
    })
  }

  /**
   * Progress bar that fills on scroll
   */
  const progressOnScroll = (element: HTMLElement | string, options: any = {}) => {
    if (!isClient) return null

    return gsap.to(element, {
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        ...(options.scrollTrigger || {})
      },
      scaleX: 1,
      transformOrigin: 'left center',
      ease: 'none'
    })
  }

  /**
   * Cleanup all ScrollTrigger instances
   */
  const cleanup = () => {
    if (isClient && ScrollTrigger) {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }

  /**
   * Refresh ScrollTrigger (useful after DOM changes)
   */
  const refresh = () => {
    if (isClient && ScrollTrigger) {
      ScrollTrigger.refresh()
    }
  }

  return {
    fadeInOnScroll,
    scaleOnScroll,
    staggerOnScroll,
    slideInLeftOnScroll,
    slideInRightOnScroll,
    parallaxOnScroll,
    pinOnScroll,
    revealTextOnScroll,
    progressOnScroll,
    cleanup,
    refresh
  }
}
