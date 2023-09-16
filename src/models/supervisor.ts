export interface Supervisor {
    supervisor_id: string
    supervisor_name: string
    password: string
    gender: string[]
    faculty: string[]
    supervisor_email: string
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