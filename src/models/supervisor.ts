export interface Supervisor {
    supervisor_id: string
    supervisor_name: string
    password: string
    gender: string[]
    faculty: string[]
    supervisor_email: string
}

export interface SupEditProfile {
    ori_supervisor_id: string
    supervisor_id: string
    supervisor_name: string
    gender: string[]
    faculty: string[]
    supervisor_email: string
}

export interface SupChangePassword {
    supervisor_id: string
    current_password: string
    new_password: string
}

export function makeSupervisor(): Supervisor {
    return {
        supervisor_id: '',
        supervisor_name: '',
        password: '',
        gender: [],
        faculty: [],
        supervisor_email: '',
    }
}