export interface Technology {
  name: string
  category: 'frontend' | 'backend' | 'database' | 'devops' | 'cloud' | 'testing' | 'tools'
  proficiency: 'expert' | 'advanced' | 'intermediate'
  yearsOfExperience: number
  description: string
  icon?: string
}

export interface TechCategory {
  name: string
  technologies: Technology[]
}
