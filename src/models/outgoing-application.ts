export default interface OutgoingApplication {
  title: string
  company_name: string
  status?: string
  note_to_employer?: string
  resume_url?: string
  created_at: number
}

export function makeOutgoingApplication(): OutgoingApplication {
  return {
    title: '',
    company_name: '',
    status: '',
    note_to_employer: '',
    resume_url: '',
    created_at: 0,
  }
}
