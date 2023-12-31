import { ref } from 'vue'
import { api } from 'boot/axios'
import { defineStore } from 'pinia'
import { StudChangePassword, Student, StudUploadResume } from 'src/models/student'
import { CompanyDetails, EmpChangePassword, EmpEditProfile, Employee } from 'src/models/employee'
import { AxiosError } from 'axios'
import { LocalStorage } from 'quasar'
import { Admin, AdminChangePassword, AdminEditProfile } from 'src/models/admin'
import { SupChangePassword, SupEditProfile, Supervisor } from 'src/models/supervisor'
import { useLocalStorageStore } from './localstorage-store'
import { UploadAvatar } from 'src/models/user'

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
  const updatingAvatar = ref(false)
  const updatingStudentProfile = ref(false)
  const updatingStudentPassword = ref(false)
  const updatingResume = ref(false)
  const updatingEmployeeProfile = ref(false)
  const updatingEmployeePassword = ref(false)
  const updatingCompanyDetails = ref(false)
  const updatingSupervisorProfile = ref(false)
  const updatingSupervisorPassword = ref(false)
  const updatingAdminProfile = ref(false)
  const updatingAdminPassword = ref(false)

  const lsStore = useLocalStorageStore()

  async function registerStudent(value: Student) {
    registeringStudent.value = true
    await api.post('/user/register-stud', value)
    registeringStudent.value = false
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
        lsStore.setIsAuthenticated(true)
        lsStore.setAuthUserType('stud')
        lsStore.setUsername(value.student_id)
      }
      loggingInStudent.value = false
    } catch (error) {
      const errorMsg = error as AxiosError
      //console.log('Login error:', errorMsg)
      loginError.value = true
      errorMessage.value = (errorMsg.response?.data as { message: string }).message
      lsStore.setIsAuthenticated(false)
      lsStore.setAuthUserType('none')
      lsStore.setUsername('none')
    }
  }

  async function logInEmployee(value: Employee) {
    try {
      loggingInEmployee.value = true
      const resp = await api.post('/user/login-emp', value)

      // Check the response status code
      if (resp.status === 200) {
        loginError.value = false
        lsStore.setIsAuthenticated(true)
        lsStore.setAuthUserType('emp')
        lsStore.setUsername(value.emp_email)
        lsStore.setCompanyName(resp.data.company_name)
      }
      loggingInEmployee.value = false
    } catch (error) {
      const errorMsg = error as AxiosError
      loginError.value = true
      errorMessage.value = (errorMsg.response?.data as { message: string }).message // get the error message
      lsStore.setIsAuthenticated(false)
      lsStore.setAuthUserType('none')
      lsStore.setUsername('none')
      lsStore.setCompanyName('none')
    }
  }

  async function logInSupervisor(value: Supervisor) {
    try {
      loggingInSupervisor.value = true
      const resp = await api.post('/user/login-sup', value)

      if (resp.status === 200) {
        loginError.value = false
        lsStore.setIsAuthenticated(true)
        lsStore.setAuthUserType('sup')
        lsStore.setUsername(value.supervisor_id)
        loggingInSupervisor.value = false
      }
    } catch (error) {
      const errorMsg = error as AxiosError
      loginError.value = true
      errorMessage.value = (errorMsg.response?.data as { message: string }).message
      lsStore.setIsAuthenticated(false)
      lsStore.setAuthUserType('none')
      lsStore.setUsername('none')
    }
  }

  async function logInAdmin(value: Admin) {
    try {
      loggingInAdmin.value = true
      const resp = await api.post('/user/login-admin', value)

      if (resp.status === 200) {
        loginError.value = false
        lsStore.setIsAuthenticated(true)
        lsStore.setAuthUserType('admin')
        lsStore.setUsername(value.username)
      }
      loggingInAdmin.value = false
    } catch (error) {
      const errorMsg = error as AxiosError
      loginError.value = true
      errorMessage.value = (errorMsg.response?.data as { message: string }).message
      lsStore.setIsAuthenticated(false)
      lsStore.setAuthUserType('none')
      lsStore.setUsername('none')
    }
  }

  async function logOut() {
    console.log('Logout function called')
    // Clear user-related data and reset to initial values
    lsStore.setIsAuthenticated(false) // Set the authentication status to unauthenticated
    lsStore.setAuthUserType('none')
    lsStore.setUsername('none')
    lsStore.setCompanyName('none')

    LocalStorage.remove('isAuthenticated')
    LocalStorage.remove('authUserType')
    LocalStorage.remove('username')
    LocalStorage.remove('companyName')
    console.log(lsStore.getIsAuthenticated())
    console.log(lsStore.getAuthUserType())
    console.log(lsStore.getUsername())
  }

  async function updateAvatar(value: UploadAvatar) {
    updatingAvatar.value = true
    console.log(value)

    const user_type = value.user_type
    const username = value.username
    const formData = new FormData();
    formData.append('avatar', value.avatar)

    await api.post(`/user/update-avatar/${user_type}/${username}`, formData)
    updatingAvatar.value = false
  }

  async function updateStudProfile(value: Student) {
    updatingStudentProfile.value = true
    await api.post('/user/update-stud-profile', value)
    updatingStudentProfile.value = false
  }

  async function updateStudPassword(value: StudChangePassword) {
    updatingStudentPassword.value = true
    await api.post('/user/update-stud-password', value)
    updatingStudentPassword.value = false
  }

  async function updateResume(value: StudUploadResume) {
    updatingResume.value = true
    console.log(value)

    const student_id = value.student_id
    const formData = new FormData();
    // formData.append('student_id', value.student_id)
    formData.append('resume', value.resume)
    //console.log(formData.get('student_id'))
    console.log(formData.get('resume'))

    // Make a POST request to the server with the FormData containing the resume file
    await api.post(`/user/update-resume/${student_id}`, formData)
    updatingResume.value = false
  }

  async function updateEmpProfile(value: EmpEditProfile) {
    updatingEmployeeProfile.value = true
    await api.post('/user/update-emp-profile', value)
    updatingEmployeeProfile.value = false
  }

  async function updateEmpPassword(value: EmpChangePassword) {
    updatingEmployeePassword.value = true
    await api.post('/user/update-emp-password', value)
    updatingEmployeePassword.value = false
  }

  async function updateCompanyDetails(value: CompanyDetails) {
    updatingCompanyDetails.value = true
    await api.post('/user/update-company-details', value)
    updatingCompanyDetails.value = false
  }

  async function updateSupProfile(value: SupEditProfile) {
    updatingSupervisorProfile.value = true
    await api.post('/user/update-sup-profile', value)
    updatingSupervisorProfile.value = false
  }

  async function updateSupPassword(value: SupChangePassword) {
    updatingSupervisorPassword.value = true
    await api.post('/user/update-sup-password', value)
    updatingSupervisorPassword.value = false
  }

  async function updateAdminProfile(value: AdminEditProfile) {
    updatingAdminProfile.value = true
    await api.post('/user/update-admin-profile', value)
    updatingAdminProfile.value = true
  }

  async function updateAdminPassword(value: AdminChangePassword) {
    updatingAdminPassword.value = true
    await api.post('/user/update-admin-password', value)
    updatingAdminPassword.value = false
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
    updatingAvatar,
    updatingStudentProfile,
    updatingStudentPassword,
    updatingResume,
    updatingEmployeeProfile,
    updatingEmployeePassword,
    updatingCompanyDetails,
    updatingSupervisorProfile,
    updatingSupervisorPassword,
    updatingAdminPassword,
    registerStudent,
    registerEmployee,
    registerSupervisor,
    registerAdmin,
    logInStudent,
    logInEmployee,
    logInSupervisor,
    logInAdmin,
    logOut,
    updateAvatar,
    updateStudProfile,
    updateStudPassword,
    updateResume,
    updateEmpProfile,
    updateEmpPassword,
    updateCompanyDetails,
    updateSupProfile,
    updateSupPassword,
    updateAdminProfile,
    updateAdminPassword,
  }
})
