import { ref, reactive } from 'vue'
import { api } from 'boot/axios'
import { defineStore } from 'pinia'
import { Student } from 'src/models/student'
import { Employee } from 'src/models/employee'

export const useStore = defineStore('user', () => {
    const registeringStudent = ref(false)
    const registeringEmployee = ref(false)
    const loggingInStudent = ref(false)
    const loggingInEmployee = ref(false)

    async function registerStudent(value: Student) {
        registeringStudent.value = true
        const resp = await api.post(`/user/register-stud`, value)
        registeringStudent.value = false
    }

    async function registerEmployee(value: Employee) {
        registeringEmployee.value = true
        const resp = await api.post(`/user/register-emp`, value)
        registeringEmployee.value = false
    }

    async function logInStudent(value: Student) {
        loggingInStudent.value = true
        const resp = await api.post(`/user/login-stud`, value)
        loggingInStudent.value = false
    }

    async function logInEmployee(value: Employee) {
        loggingInEmployee.value = true
        const resp = await api.post(`/user/login-emp`, value)
        loggingInEmployee.value = false
    }

    return {
        registeringStudent,
        registeringEmployee,
        loggingInStudent,
        loggingInEmployee,
        registerStudent,
        registerEmployee,
        logInStudent,
        logInEmployee,
    }
})