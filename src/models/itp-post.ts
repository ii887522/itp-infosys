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
  vacancy_count: number
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
    vacancy_count: 0,
  }
}

export interface OutgoingApplication {
  title: string
  company_name: string
  status: string
  note_to_employer: string
  resume_url: string
}

export function makeOutgoingApplication(): OutgoingApplication {
  return {
    title: '',
    company_name: '',
    status: '',
    note_to_employer: '',
    resume_url: '',
  }
}

export interface IncomingApplication {
  title: string
  student_name: string
  status: string
  note_to_employer: string
  resume_url: string
}

export function makeIncomingApplication(): IncomingApplication {
  return {
    title: '',
    student_name: '',
    status: '',
    note_to_employer: '',
    resume_url: '',
  }
}
