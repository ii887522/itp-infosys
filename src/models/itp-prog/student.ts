export default interface Student {
  student_id: string
  student_name: string
  supervisor_assigned_at?: number
  faculty: string
  location?: string
  company_name?: string
  supervisor_name?: string
  itp_start_at?: number
  itp_end_at?: number
}

export function makeStudent(): Student {
  return {
    student_id: '',
    student_name: '',
    supervisor_assigned_at: 0,
    faculty: '',
    location: '',
    company_name: '',
    supervisor_name: '',
    itp_start_at: 0,
    itp_end_at: 0,
  }
}
