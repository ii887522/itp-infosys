export interface Upload {
    student_id: string
    company_name: string
    company_address : string
    monthly_allowance: number
    company_supervisor_name: string
    company_supervisor_email: string
    company_acc_file : File
    parent_file: File
    letter_file: File
}

export interface ResumeUpload{
   student_id: string
   resume_file: File
}

export interface ReportUpload{
  student_id: string
  report_file: File
}
