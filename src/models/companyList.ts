export interface Company {
  company_name: string
  company_address: string
  company_website: string
  company_desc: string
}

export function showCompany(): Company {
  return {
    company_name: '',
    company_address: '',
    company_website: '',
    company_desc: '',
  }
}
