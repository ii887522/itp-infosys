export default interface IncomingApplication {
  title: string
  student_id: string
  student_name: string
  status: string
  note_to_employer: string
  resume_url: string
  created_at: number
}

export function makeIncomingApplication(): IncomingApplication {
  return {
    title: '',
    student_id: '',
    student_name: '',
    status: '',
    note_to_employer: '',
    resume_url: '',
    created_at: 0,
  }
}
