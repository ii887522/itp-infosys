import { ref, reactive } from 'vue'
import { api } from 'boot/axios'
import { defineStore } from 'pinia'
import { Student } from 'src/models/student'
import { Employee } from 'src/models/employee'
import { Upload } from 'src/models/uploadFile'


export const useStore = defineStore('user', () => {
    const applyingCompany = ref(false)

    async function companyApply(value: Upload) {
        applyingCompany.value = true
        const resp = await api.post(`/userUpload/company_apply`, value)
        applyingCompany.value = false
    }

    return {
        applyingCompany,
        companyApply,
    }
})