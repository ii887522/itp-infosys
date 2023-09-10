export interface Employee {
    emp_name: string
    password: string
    company_name: string
    emp_email: string
    emp_phone: string
}

export function makeEmployee(): Employee {
    return {
        emp_name: '',
        password: '',
        company_name: '',
        emp_email: '',
        emp_phone: '',
    }
}