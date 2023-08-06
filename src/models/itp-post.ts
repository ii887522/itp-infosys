export interface Internship {
  title: string
  company_name: string
  categories: string[]
  min_allowance?: number
  max_allowance?: number
  location: string
  learning_outcomes: string[]
  description: string
  company_description: string
}

export function makeInternship(): Internship {
  return {
    title: '',
    company_name: '',
    categories: [],
    location: '',
    learning_outcomes: [],
    description: '',
    company_description: '',
  }
}
