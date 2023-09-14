import { ref, onMounted } from 'vue'
import { api } from 'boot/axios'
import { defineStore } from 'pinia'
import { Student } from 'src/models/student'
import { Employee } from 'src/models/employee'
import { AxiosError } from 'axios'
import { LocalStorage } from 'quasar'
import { Admin } from 'src/models/admin'
import { Supervisor } from 'src/models/supervisor'

/*
LocalStorage:
- isAuthenticateed: false, true
- authUserType: stud, emp, sup, admin
- username: student_id, emp_email, supervisor_id, admin?
*/

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

  // authentication guard
  const isAuthenticated = ref(false)
  const authUserType = ref('')
  const username = ref('')

  // Function to set isAuthenticated in local storage
  function setIsAuthenticated(value: boolean) {
    isAuthenticated.value = value;
    LocalStorage.set('isAuthenticated', value);
  }

  function setAuthUserType(value: string) {
    authUserType.value = value;
    LocalStorage.set('authUserType', value);
  }

  function setUsername(value: string) {
    username.value = value;
    LocalStorage.set('username', value);
  }

  // Function to get isAuthenticated value from local storage
  function getIsAuthenticated() {
    return LocalStorage.getItem('isAuthenticated');
  }

  function getAuthUserType() {
    return LocalStorage.getItem('authUserType');
  }

  function getUsername() {
    return LocalStorage.getItem('username');
  }

  // Function to initialize isAuthenticated from local storage
  function initIsAuthenticated() {
    const storedValue = LocalStorage.getItem('isAuthenticated');
    console.log('Init is authenticated')
    if (storedValue !== null) {
      isAuthenticated.value = storedValue === 'true'; // Convert to boolean
    } else {
      setIsAuthenticated(false);
    }
  }

  // Function to initialize authUserType from local storage
  function initAuthUserType() {
    const storedValue = LocalStorage.getItem('authUserType') as string;
    console.log('Init user type')
    if (storedValue !== null) {
      authUserType.value = storedValue; // No need to convert
    } else {
      setAuthUserType('none')
    }
  }

  function initUsername() {
    // get the input login username (student ID if student; email if employee)
    const storedValue = LocalStorage.getItem('username') as string;
    console.log('Init current account username')
    if (storedValue !== null) {
      username.value = storedValue;
    } else {
      setUsername('none')
    }
  }

  // Call all the initialize functions when the app starts
  onMounted(() => {
    initIsAuthenticated();
    initAuthUserType();
    initUsername();
  });

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
        setIsAuthenticated(true);
        setAuthUserType('stud');
        setUsername(value.student_id);
      }
      loggingInStudent.value = false
    } catch (error) {
        const errorMsg = error as AxiosError
        //console.log('Login error:', errorMsg)
        loginError.value = true
        errorMessage.value = (errorMsg.response?.data as { message: string }).message
        setIsAuthenticated(false)
        setAuthUserType('none');
        setUsername('none');
    }
  }

  async function logInEmployee(value: Employee) {
    try {
      loggingInEmployee.value = true
      const resp = await api.post('/user/login-emp', value)

      // Check the response status code
      if (resp.status === 200) {
        loginError.value = false
        setIsAuthenticated(true);
        setAuthUserType('emp');
        setUsername(value.emp_email);
      }
      loggingInEmployee.value = true
    } catch (error) {
      const errorMsg = error as AxiosError
      loginError.value = true
      errorMessage.value = (errorMsg.response?.data as { message: string }).message // get the error message
      isAuthenticated.value = false
      setIsAuthenticated(false);
      setAuthUserType('none');
      setUsername('none');
    }
  }

  async function logInSupervisor(value: Supervisor) {
    try {
      loggingInSupervisor.value = true;
      const resp = await api.post('/user/login-supervisor/', value)

      if (resp.status === 200) {
        loginError.value = false;
        setIsAuthenticated(true);
        setAuthUserType('sup');
        setUsername(value.supervisor_id);
        loggingInSupervisor.value = false;
      }
    } catch (error) {
      const errorMsg = error as AxiosError
      loginError.value = true
      errorMessage.value = (errorMsg.response?.data as { message: string }).message
      isAuthenticated.value = false
      setIsAuthenticated(false);
      setAuthUserType('none');
      setUsername('none');
    }
  }

  async function logInAdmin(value: Admin) {
    try {
      loggingInAdmin.value = true;
      const resp = await api.post('/user/login-admin/', value)

      if (resp.status === 200) {
        loginError.value = false;
        setIsAuthenticated(true);
        setAuthUserType('admin');
        //setUsername();
      }
      loggingInAdmin.value = false;
    } catch (error) {
      const errorMsg = error as AxiosError
      loginError.value = true
      errorMessage.value = (errorMsg.response?.data as { message: string }).message
      isAuthenticated.value = false
      setIsAuthenticated(false);
      setAuthUserType('none');
      setUsername('none');
    }
  }

  async function logOut() {
    console.log('Logout function called');
    // Clear user-related data and reset to initial values
    setIsAuthenticated(false); // Set the authentication status to unauthenticated
    setAuthUserType('none');
    setUsername('none');

    LocalStorage.remove('isAuthenticated');
    LocalStorage.remove('authUserType');
    LocalStorage.remove('username');
    console.log(getIsAuthenticated());
    console.log(getAuthUserType());
    console.log(getUsername());

    // Redirect to home page
    //useRouter().push('/');
  }

  async function updateStudProfile(value: Student) {
    updatingStudentProfile.value = true;
    await api.post('/user/update-stud-profile', value)
    updatingStudentProfile.value = false;
  }

  async function updateStudPassword(value: Student) {
    updatingStudentPassword.value = true;
    await api.post('/user/update-stud-password', value)
    updatingStudentPassword.value = false;
  }

  // not sure yet
  async function updateResume(resume: File) {
    updatingResume.value = true;
    await api.post('/update-resume', getUsername())
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
    isAuthenticated,
    authUserType,
    username,
    setIsAuthenticated,
    setAuthUserType,
    setUsername,
    getIsAuthenticated,
    getAuthUserType,
    getUsername,
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
  }
})
