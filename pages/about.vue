<template>
  <div>
    <!-- Page Header -->
    <section class="relative py-32 bg-gradient-dark overflow-hidden">
      <!-- Hero Background Image -->
      <div class="absolute inset-0 opacity-25">
        <img 
          src="/images/about/company-culture.jpg" 
          alt="Codenova company culture"
          class="w-full h-full object-cover"
          loading="eager"
        />
        <div class="absolute inset-0 bg-gradient-to-b from-deep-navy/90 via-deep-navy/80 to-deep-navy" />
      </div>
      
      <Container class="relative z-10">
        <div class="mx-auto max-w-3xl text-center animate-fade-in-up">
          <h1 class="mb-6 text-heading-1">About Codenova</h1>
          <p class="text-xl text-light-gray">
            Innovation-driven software development for businesses that demand excellence
          </p>
        </div>
      </Container>
    </section>

    <!-- Company Overview -->
    <section class="relative py-20 bg-deep-navy overflow-hidden">
      <!-- Workspace Background -->
      <div class="absolute inset-0 opacity-5">
        <img 
          src="/images/workspace/office-desk-setups.jpg" 
          alt="Modern office workspace"
          class="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      
      <Container class="relative z-10">
        <div class="mx-auto max-w-4xl">
          <Card class="glass">
            <div class="mb-6">
              <h2 class="text-2xl font-bold text-white mb-4">Who We Are</h2>
              <div class="space-y-4 text-light-gray">
                <p>
                  <span class="font-semibold text-white">Codenova Innovations Ltd</span> is a
                  full-spectrum technology solutions company delivering enterprise software, IoT systems,
                  EV infrastructure, smart security, and AI-powered automation.
                </p>
                <p>
                  Founded on the principle that technology should solve problems—not create
                  them—we focus on delivering robust, scalable solutions that integrate hardware
                  and software, built with cutting-edge technologies and best practices.
                </p>
              </div>
            </div>

            <div class="pt-6 border-t border-white/10 grid gap-4 md:grid-cols-2">
              <div>
                <p class="text-sm text-medium-gray mb-1">Registered Name</p>
                <p class="font-semibold text-white">Codenova Innovations Ltd</p>
              </div>
              <div>
                <p class="text-sm text-medium-gray mb-1">RC Number</p>
                <p class="font-semibold text-white">7144941</p>
              </div>
              <div>
                <p class="text-sm text-medium-gray mb-1">Country</p>
                <p class="font-semibold text-white">Nigeria</p>
              </div>
              <div>
                <p class="text-sm text-medium-gray mb-1">Founded</p>
                <p class="font-semibold text-white">2024</p>
              </div>
            </div>
          </Card>
        </div>
      </Container>
    </section>

    <!-- Mission & Values -->
    <section class="py-20 bg-darker-gray">
      <Container>
        <div class="mb-12 text-center">
          <h2 class="text-heading-2 mb-4">Our Mission</h2>
          <div class="mx-auto max-w-3xl">
            <blockquote class="text-xl text-light-gray italic leading-relaxed">
              "To deliver innovation-driven software solutions that empower businesses to achieve
              their full potential through technology excellence."
            </blockquote>
          </div>
        </div>

        <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <Card
            v-for="value in coreValues"
            :key="value.title"
            class="text-center hover:scale-105 transition-transform"
          >
            <div class="mb-4 text-4xl">{{ value.icon }}</div>
            <h3 class="mb-3 text-lg font-bold text-white">{{ value.title }}</h3>
            <p class="text-sm text-medium-gray">{{ value.description }}</p>
          </Card>
        </div>
      </Container>
    </section>

    <!-- What Drives Us -->
    <section class="py-20 bg-deep-navy">
      <Container>
        <div class="mb-12 text-center">
          <h2 class="text-heading-2 mb-4">What Drives Us</h2>
        </div>

        <div class="grid gap-6 md:grid-cols-2">
          <Card v-for="driver in drivers" :key="driver.title">
            <h3 class="mb-3 text-lg font-bold text-white">{{ driver.title }}</h3>
            <p class="text-medium-gray">{{ driver.description }}</p>
          </Card>
        </div>
      </Container>
    </section>

    <!-- Expertise -->
    <section class="py-20 bg-darker-gray">
      <Container>
        <div class="mb-12 text-center">
          <h2 class="text-heading-2 mb-4">Our Expertise</h2>
          <p class="text-light-gray">Technical capabilities that set us apart</p>
        </div>

        <div class="mx-auto max-w-4xl">
          <div class="grid gap-4 md:grid-cols-2">
            <div
              v-for="skill in expertise"
              :key="skill"
              class="flex items-center glass p-4 rounded-lg"
            >
              <span class="mr-3 text-electric-blue text-xl">✓</span>
              <span class="text-light-gray">{{ skill }}</span>
            </div>
          </div>
        </div>
      </Container>
    </section>

    <!-- Approach to Projects -->
    <section class="py-20 bg-deep-navy">
      <Container>
        <div class="mb-12 text-center">
          <h2 class="text-heading-2 mb-4">Our Approach</h2>
          <p class="text-light-gray">Principles that guide every project</p>
        </div>

        <div class="mx-auto max-w-3xl space-y-6">
          <Card v-for="approach in approaches" :key="approach.title" class="glass">
            <h3 class="mb-2 text-lg font-semibold text-white">{{ approach.title }}</h3>
            <p class="text-medium-gray">{{ approach.description }}</p>
          </Card>
        </div>
      </Container>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="py-20 bg-darker-gray scroll-mt-20">
      <Container>
        <div class="grid gap-12 lg:grid-cols-2">
          <!-- Contact Information -->
          <div>
            <h2 class="mb-6 text-heading-2">Get in Touch</h2>
            <p class="mb-8 text-light-gray">
              Have a project in mind? Let's discuss how we can help you achieve your goals.
            </p>

            <div class="space-y-6">
              <div class="flex items-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="mr-4 h-6 w-6 text-electric-blue flex-shrink-0"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                  />
                </svg>
                <div>
                  <p class="text-sm text-medium-gray mb-1">Email</p>
                  <a
                    href="mailto:contact@codenova.cc"
                    class="text-white hover:text-electric-blue transition-colors focus-ring rounded"
                  >
                    contact@codenova.cc
                  </a>
                </div>
              </div>

              <div class="flex items-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="mr-4 h-6 w-6 text-electric-blue flex-shrink-0"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                  />
                </svg>
                <div>
                  <p class="text-sm text-medium-gray mb-1">Phone</p>
                  <a
                    href="tel:+2348064962174"
                    class="text-white hover:text-electric-blue transition-colors focus-ring rounded"
                  >
                    +234 806 496 2174
                  </a>
                </div>
              </div>

              <div class="flex items-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="mr-4 h-6 w-6 text-electric-blue flex-shrink-0"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5"
                  />
                </svg>
                <div>
                  <p class="text-sm text-medium-gray mb-1">GitHub</p>
                  <a
                    href="https://github.com/donzeg"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="inline-flex items-center text-white hover:text-electric-blue transition-colors focus-ring rounded"
                  >
                    <span>github.com/donzeg</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="ml-1 h-4 w-4"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                      />
                    </svg>
                  </a>
                </div>
              </div>

              <div class="pt-6 border-t border-white/10">
                <p class="text-sm text-medium-gray mb-2">Response Time</p>
                <p class="text-white">
                  We typically respond to all inquiries within 24 hours during business days.
                </p>
              </div>
            </div>
          </div>

          <!-- Contact Form -->
          <div>
            <div class="glass rounded-lg p-8">
              <h3 class="mb-6 text-xl font-bold text-white">Send Us a Message</h3>
              <ContactForm />
            </div>
          </div>
        </div>
      </Container>
    </section>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'About Us | Codenova Innovations',
  meta: [
    {
      name: 'description',
      content:
        'Innovation-driven technology company. RC 7144941. Enterprise software, IoT systems, EV infrastructure, smart security, and AI solutions.',
    },
  ],
})

const coreValues = [
  {
    icon: '💡',
    title: 'Innovation First',
    description: "We don't follow trends—we identify problems and engineer solutions",
  },
  {
    icon: '⭐',
    title: 'Quality Over Quantity',
    description: 'Every project receives meticulous attention to detail',
  },
  {
    icon: '🤝',
    title: 'Long-term Partnerships',
    description: 'We build relationships, not just applications',
  },
  {
    icon: '📈',
    title: 'Continuous Improvement',
    description: 'Every project makes us better developers',
  },
]

const drivers = [
  {
    title: 'Innovation First',
    description:
      "We don't follow trends—we identify problems and engineer solutions that make a real difference.",
  },
  {
    title: 'Quality Over Quantity',
    description:
      'Every project receives meticulous attention to detail. We measure success by the value we deliver, not the number of projects we complete.',
  },
  {
    title: 'Long-term Partnerships',
    description:
      'We build relationships with our clients that extend beyond a single project. Your success is our success.',
  },
  {
    title: 'Continuous Improvement',
    description:
      'Every project is an opportunity to learn, grow, and refine our craft. We stay current with emerging technologies while maintaining expertise in proven solutions.',
  },
]

const expertise = [
  'Full-stack development (frontend + backend + database)',
  'Modern JavaScript/TypeScript ecosystem',
  'Cloud-native architecture',
  'Security-first development',
  'Performance optimization',
  'Scalable systems design',
  'Database design and optimization',
  'DevOps and CI/CD automation',
]

const approaches = [
  {
    title: 'Clean Code',
    description:
      'We write maintainable, testable code that future developers (including ourselves) will thank us for.',
  },
  {
    title: 'Agile Development',
    description:
      'Regular feedback cycles, iterative improvements, and transparent communication throughout the project lifecycle.',
  },
  {
    title: 'Security & Performance',
    description:
      'Security and performance are not afterthoughts—they are fundamental requirements built into every layer of our applications.',
  },
  {
    title: 'Thorough Documentation',
    description:
      'Comprehensive documentation ensures that your team can understand, maintain, and extend the solutions we build.',
  },
  {
    title: 'Automated Testing',
    description:
      'Automated tests give us confidence in our code and enable rapid, safe iterations and deployments.',
  },
]
</script>
