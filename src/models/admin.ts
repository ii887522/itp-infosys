export interface Admin {
    username: string
    email: string
    password: string
}

export function makeAdmin(): Admin {
    return {
        username: '',
        email: '',
        password: '',
    }
}