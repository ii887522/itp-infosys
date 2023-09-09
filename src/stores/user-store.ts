import { ref, reactive, onMounted } from 'vue'
import { api } from 'boot/axios'
import { defineStore } from 'pinia'
import { Student } from 'src/models/student'
import { Employee } from 'src/models/employee'
import { AxiosError } from 'axios'
import { LocalStorage } from 'quasar'

export const useStore = defineStore('user', () => {
  const registeringStudent = ref(false)
  const registeringEmployee = ref(false)
  const loggingInStudent = ref(false)
  const loggingInEmployee = ref(false)
  const loginError = ref(false)
  const errorMessage = ref('')

  // authentication guard
  const isAuthenticated = ref(false)
  const authUserType = ref('')

  // Function to set isAuthenticated in local storage
  function setIsAuthenticated(value: boolean) {
    isAuthenticated.value = value;
    LocalStorage.set('isAuthenticated', value);
  }

  function setAuthUserType(value: string) {
    authUserType.value = value;
    LocalStorage.set('authUserType', value);
  }

  // Function to initialize isAuthenticated from local storage
  function initIsAuthenticated() {
    const storedValue = LocalStorage.getItem('isAuthenticated');
    if (storedValue !== null) {
      isAuthenticated.value = storedValue === 'true'; // Convert to boolean
    }
  }

  // Function to initialize authUserType from local storage
  function initAuthUserType() {
    const storedValue = LocalStorage.getItem('authUserType') as string;
    if (storedValue !== null) {
      authUserType.value = storedValue; // No need to convert
    }
  }

  // Call initIsAuthenticated when the app starts
  onMounted(() => {
    initIsAuthenticated();
    initAuthUserType();
  });

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
    loginError,
    errorMessage,
    isAuthenticated,
    authUserType,
    setAuthUserType,
    setIsAuthenticated,
    registerStudent,
    registerEmployee,
    logInStudent,
    logInEmployee,
  }
})
