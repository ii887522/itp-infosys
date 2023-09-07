export interface Student {
    student_id: String
    student_name: String
    password: String
    ic_no: String
    gender: String[]
    programme: String[]
    student_email: String
    personal_email: String
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
    }
}