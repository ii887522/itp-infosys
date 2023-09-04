export interface Internship {
    id: number
    firstName: String
    lastName: String
    email: String
    password: String
    company: String
    position: String
}

export function makeIntership(): Internship {
    return {
        id: 0,
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        company: '',
        position: '',
    }
}