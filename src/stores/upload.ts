import { ref, reactive } from 'vue'
import { api } from 'boot/axios'
import { defineStore } from 'pinia'
import { Student } from 'src/models/student'
import { Employee } from 'src/models/employee'


export const useStore = defineStore('user', () => {
    const applyingCompany = ref(false)

    async function companyApply(value: Student) {
        applyingCompany.value = true
        const resp = await api.post(`/userUpload/register-stud`, value)
        applyingCompany.value = false
    }

    return {
        applyingCompany,
        companyApply,
    }
})