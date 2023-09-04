export interface Internship {
    name: String
    studentId: String
    password: String
    icNo: String
    gender: String[]
    programme: String[]
    studentEmail: String
    personalEmail: String
    mobileNumber: String
}

export function makeIntership(): Internship {
    return {
        name: '',
        studentId: '',
        password: '',
        icNo: '',
        gender: [],
        programme: [],
        studentEmail: '',
        personalEmail: '',
        mobileNumber: '',
    }
}