export interface Employee {
    emp_name: string
    password: string
    company_name: string
    emp_email: string
    emp_phone: string
}

export interface EmpEditProfile {
    ori_emp_email: string
    emp_name: string
    company_name: string
    emp_email: string
    emp_phone: string
}

export interface EmpChangePassword {
    emp_email: string
    current_password: string
    new_password: string
}

export interface CompanyDetails {
    ori_company_name: string
    company_name: string
    company_desc: string
    company_size: number
    company_address: string
    company_url: string
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