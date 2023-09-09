import { ref, reactive } from 'vue'
import { api } from 'boot/axios'
import { defineStore } from 'pinia'
import { Student } from 'src/models/student'
import { Employee } from 'src/models/employee'
import { AxiosError } from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter();

export const useStore = defineStore('user', () => {
  const registeringStudent = ref(false)
  const registeringEmployee = ref(false)
  const loggingInStudent = ref(false)
  const loggingInEmployee = ref(false)
  const isAuthenticated = ref(false)
  const loginError = ref(false)
  const errorMessage = ref('')

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
    try {
      loggingInStudent.value = true
      const resp = await api.post(`/user/login-stud`, value)

      // Check the response status code
      if (resp.status === 200) {
        // if login successful
        isAuthenticated.value = true
        loginError.value = false
      }
      loggingInStudent.value = false
      router.push('/')
    } catch (error) {
        const errorMsg = error as AxiosError
        //console.log('Login error:', errorMsg)
        loginError.value = true
        errorMessage.value = (errorMsg.response?.data as { message: string }).message
        isAuthenticated.value = false
    }
  }

  async function logInEmployee(value: Employee) {
    try {
      loggingInEmployee.value = true
      const resp = await api.post(`/user/login-emp`, value)

      // Check the response status code
      if (resp.status === 200) {
        // if login successful
        isAuthenticated.value = true
        loginError.value = false
      }
      loggingInEmployee.value = true
      router.push('/')
    } catch (error) {
      const errorMsg = error as AxiosError
      loginError.value = true
      errorMessage.value = (errorMsg.response?.data as { message: string }).message // get the error message
      isAuthenticated.value = false
    }
  }

  return {
    registeringStudent,
    registeringEmployee,
    loggingInStudent,
    loggingInEmployee,
    isAuthenticated,
    loginError,
    errorMessage,
    registerStudent,
    registerEmployee,
    logInStudent,
    logInEmployee,
  }
})
