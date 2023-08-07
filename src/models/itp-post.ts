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
  company_size: number
  address: string
  company_url: string
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
    company_size: 0,
    address: '',
    company_url: '',
  }
}
