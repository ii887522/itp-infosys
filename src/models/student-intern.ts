// extension of Student table
export interface Student_Internship {
    student_id: string // primary key; foriegn key references student table
    supervisor_assigned_at: number // assign date
    company_name: string // foriegn key references company table
    supervisor_name: string
    itp_start_at: number
    itp_end_at: number
}

export function makeStudentInternship(): Student_Internship {
    return {
        student_id: '',
        supervisor_assigned_at: 0,
        company_name: '',
        supervisor_name: '',
        itp_start_at: 0,
        itp_end_at: 0,
    }
}