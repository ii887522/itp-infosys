import { ref } from 'vue'
import { api } from 'boot/axios'
import { defineStore } from 'pinia'
import { StudChangePassword, Student } from 'src/models/student'
import { Employee } from 'src/models/employee'
import { AxiosError } from 'axios'
import { LocalStorage } from 'quasar'
import { Admin } from 'src/models/admin'
import { Supervisor } from 'src/models/supervisor'
import { useLocalStorageStore } from './localstorage-store'

export const useStore = defineStore('user', () => {
  const registeringStudent = ref(false)
  const registeringEmployee = ref(false)
  const registeringSupervisor = ref(false)
  const registeringAdmin = ref(false)
  const loggingInStudent = ref(false)
  const loggingInEmployee = ref(false)
  const loggingInSupervisor = ref(false)
  const loggingInAdmin = ref(false)
  const loginError = ref(false)
  const errorMessage = ref('')
  const updatingStudentProfile = ref(false)
  const updatingStudentPassword = ref(false)
  const updatingResume = ref(false)

  const lsStore = useLocalStorageStore();

  async function registerStudent(value: Student) {
    registeringStudent.value = true
    await api.post('/user/register-stud', value)
    registeringStudent.value = false
  }

  function testing(value: string) {
    console.log(value);
  }

  async function registerEmployee(value: Employee) {
    registeringEmployee.value = true
    await api.post('/user/register-emp', value)
    registeringEmployee.value = false
  }

  async function registerSupervisor(value: Supervisor) {
    registeringSupervisor.value = true
    await api.post('/user/register-sup', value)
    registeringSupervisor.value = false
  }

  async function registerAdmin(value: Admin) {
    registeringAdmin.value = true
    await api.post('/user/register-admin', value)
    registeringAdmin.value = false
  }

  async function logInStudent(value: Student) {
    try {
      loggingInStudent.value = true
      const resp = await api.post('/user/login-stud', value)

      // Check the response status code
      if (resp.status === 200) {
        // if login successful
        loginError.value = false
        lsStore.setIsAuthenticated(true);
        lsStore.setAuthUserType('stud');
        lsStore.setUsername(value.student_id);
      }
      loggingInStudent.value = false
    } catch (error) {
        const errorMsg = error as AxiosError
        //console.log('Login error:', errorMsg)
        loginError.value = true
        errorMessage.value = (errorMsg.response?.data as { message: string }).message
        lsStore.setIsAuthenticated(false)
        lsStore.setAuthUserType('none');
        lsStore.setUsername('none');
    }
  }

  async function logInEmployee(value: Employee) {
    try {
      loggingInEmployee.value = true
      const resp = await api.post('/user/login-emp', value)

      // Check the response status code
      if (resp.status === 200) {
        loginError.value = false
        lsStore.setIsAuthenticated(true);
        lsStore.setAuthUserType('emp');
        lsStore.setUsername(value.emp_email);
      }
      loggingInEmployee.value = true
    } catch (error) {
      const errorMsg = error as AxiosError
      loginError.value = true
      errorMessage.value = (errorMsg.response?.data as { message: string }).message // get the error message
      lsStore.setIsAuthenticated(false);
      lsStore.setAuthUserType('none');
      lsStore.setUsername('none');
    }
  }

  async function logInSupervisor(value: Supervisor) {
    try {
      loggingInSupervisor.value = true;
      const resp = await api.post('/user/login-supervisor/', value)

      if (resp.status === 200) {
        loginError.value = false;
        lsStore.setIsAuthenticated(true);
        lsStore.setAuthUserType('sup');
        lsStore.setUsername(value.supervisor_id);
        loggingInSupervisor.value = false;
      }
    } catch (error) {
      const errorMsg = error as AxiosError
      loginError.value = true
      errorMessage.value = (errorMsg.response?.data as { message: string }).message
      lsStore.setIsAuthenticated(false);
      lsStore.setAuthUserType('none');
      lsStore.setUsername('none');
    }
  }

  async function logInAdmin(value: Admin) {
    try {
      loggingInAdmin.value = true;
      const resp = await api.post('/user/login-admin/', value)

      if (resp.status === 200) {
        loginError.value = false;
        lsStore.setIsAuthenticated(true);
        lsStore.setAuthUserType('admin');
        //setUsername();
      }
      loggingInAdmin.value = false;
    } catch (error) {
      const errorMsg = error as AxiosError
      loginError.value = true
      errorMessage.value = (errorMsg.response?.data as { message: string }).message
      lsStore.setIsAuthenticated(false);
      lsStore.setAuthUserType('none');
      lsStore.setUsername('none');
    }
  }

  async function logOut() {
    console.log('Logout function called');
    // Clear user-related data and reset to initial values
    lsStore.setIsAuthenticated(false); // Set the authentication status to unauthenticated
    lsStore.setAuthUserType('none');
    lsStore.setUsername('none');

    LocalStorage.remove('isAuthenticated');
    LocalStorage.remove('authUserType');
    LocalStorage.remove('username');
    console.log(lsStore.getIsAuthenticated());
    console.log(lsStore.getAuthUserType());
    console.log(lsStore.getUsername());
  }

  async function updateStudProfile(value: Student) {
    updatingStudentProfile.value = true;
    await api.post('/user/update-stud-profile', value)
    updatingStudentProfile.value = false;
  }

  async function updateStudPassword(value: StudChangePassword) {
    updatingStudentPassword.value = true;
    await api.post('/user/update-stud-password', value)
    updatingStudentPassword.value = false;
  }

  async function updateResume(resume: File) {
    updatingResume.value = true;

    // Create a FormData object and append the resume file
    const formData = new FormData();
    formData.append('resume', resume);

    // Make a POST request to the server with the FormData containing the resume file
    await api.post('/update-resume', formData);

    updatingResume.value = false;
  }
  
  return {
    registeringStudent,
    registeringEmployee,
    registeringSupervisor,
    registeringAdmin,
    loggingInStudent,
    loggingInEmployee,
    loggingInSupervisor,
    loggingInAdmin,
    loginError,
    errorMessage,
    updatingStudentProfile,
    updatingStudentPassword,
    updatingResume,
    registerStudent,
    registerEmployee,
    registerSupervisor,
    registerAdmin,
    logInStudent,
    logInEmployee,
    logInSupervisor,
    logInAdmin,
    logOut,
    updateStudProfile,
    updateStudPassword,
    updateResume,
    testing,
  }
})
