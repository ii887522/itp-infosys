export interface Student {
  student_id: string
  student_name: string
  password: string
  ic_no: string
  gender: string[]
  programme: string[]
  student_email: string
  personal_email: string
  faculty: string[]
}

export function makeStudent(): Student {
  return {
    student_id: '',
    student_name: '',
    password: '',
    ic_no: '',
    gender: [],
    programme: [],
    student_email: '',
    personal_email: '',
    faculty: [],
  }
}
