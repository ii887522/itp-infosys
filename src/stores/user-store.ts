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
            loggingInStudent.value = true;
            const resp = await api.post(`/user/login-stud`, value);

            // Check the response status code
            if (resp.status === 200) {
                // if login successful
                isAuthenticated.value = true;
                loginError.value = false;
            } else if (resp.status === 401) {
                // if login failed, display error message
                const responseData = await resp.data as { error: string };
                loginError.value = true;
                errorMessage.value = responseData.error;
                isAuthenticated.value = false;
            }
            loggingInStudent.value = false;
        } catch (error) {
            console.error('Login error:', error);
            loginError.value = true;
            errorMessage.value = 'An error occurred during login.';
            isAuthenticated.value = false;
        }
    }

    async function logInEmployee(value: Employee) {
        if (!isAuthenticated.value) {
            loggingInEmployee.value = true
            const resp = await api.post(`/user/login-emp`, value)
            loggingInEmployee.value = false
            isAuthenticated.value = true
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