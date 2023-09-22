import { ref } from 'vue'
import { api } from 'boot/axios'
import { defineStore } from 'pinia'
import { Company } from 'src/models/companyList'

export const useStore = defineStore('company', () => {
  const companies = ref([])
  const companiesList = ref<Company[]>([])
  const viewcompanylist = ref(false)
  const deletingCompany = ref(false)

  async function viewCompany() {
    if (companies.value.length !== 0) return
    viewcompanylist.value = true
    const rep = await api.get('/itp-company/get-companyList')
    companies.value = rep.data
    viewcompanylist.value = false
  }

  async function deleteCompany(company_name: string) {
    deletingCompany.value = true

    const rep = await api.delete(`/itp-company/companies/${company_name}`)

    companiesList.value.splice(
      companiesList.value.findIndex(value => value.company_name === rep.data.company_name),
      1
    )
    deletingCompany.value = false
  }

  return {
    companies,
    companiesList,
    viewCompany,
    viewcompanylist,
    deleteCompany,
  }
})
