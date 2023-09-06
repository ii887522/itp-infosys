export interface Employee {
    emp_name: String
    password: String
    company_name: String
    emp_email: String
    emp_phone: String
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