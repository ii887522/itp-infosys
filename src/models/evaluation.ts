export interface Evaluation {
  name: string
  email: string
  faculty: string
  supervisor: string
  companyName: string
  satisfaction: string
  satisfaction2: string
  satisfaction3: string
  satisfaction4: string
  satisfaction5: string
  satisfaction6: string
  satisfaction7: string
  satisfaction8: string
  satisfaction9: string
  satisfaction10: string
  satisfaction11: string
  satisfaction12: string
  satisfaction13: string
  satisfaction14: string
  comments: string
}

export interface Evaluation2 {
  name: string
  email: string
  faculty: string
  supervisor: string
  companyName: string
  file: File | null
}

export function makeEvaluation(): Evaluation {
  return {
    name: '',
    email: '',
    faculty: '',
    supervisor: '',
    companyName: '',
    satisfaction: '',
    satisfaction2: '',
    satisfaction3: '',
    satisfaction4: '',
    satisfaction5: '',
    satisfaction6: '',
    satisfaction7: '',
    satisfaction8: '',
    satisfaction9: '',
    satisfaction10: '',
    satisfaction11: '',
    satisfaction12: '',
    satisfaction13: '',
    satisfaction14: '',
    comments: '',
  }
}

export function makeEvaluation2(): Evaluation2 {
  return {
    name: '',
    email: '',
    faculty: '',
    supervisor: '',
    companyName: '',
    file: null,
  }
}
