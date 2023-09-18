export interface Admin {
    username: string
    email: string
    password: string
}

export interface AdminEditProfile {
    ori_username: string
    username: string
    email: string
}

export interface AdminChangePassword {
    username: string
    current_password: string
    new_password: string
}

export function makeAdmin(): Admin {
    return {
        username: '',
        email: '',
        password: '',
    }
}