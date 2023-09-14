export interface Admin {
    username: string
    password: string
}

export function makeAdmin(): Admin {
    return {
        username: '',
        password: '',
    }
}