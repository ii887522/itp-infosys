import { ref, onMounted } from 'vue'
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
    //LocalStorage.clear();
    initIsAuthenticated();
    initAuthUserType();
    initUsername();
    setUsername('21WMR05319');
  });

  async function registerStudent(value: Student) {
    registeringStudent.value = true
    const resp = await api.post('/user/register-stud', value)
    registeringStudent.value = false
  }

  async function registerEmployee(value: Employee) {
    registeringEmployee.value = true
    const resp = await api.post('/user/register-emp', value)
    registeringEmployee.value = false
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
    }
  }

  // Function to get the student profile from the database
  // got error
  async function fetchStudentProfile() {
    try {
      const studentId = getUsername();
      console.log('Student ID:', studentId);
      const resp = await api.get(`/user/get-student-profile/${studentId}`);

      return resp.data;
    } catch (error) {
      console.error('Error fetching student profile:', error);
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
    username,
    setIsAuthenticated,
    setAuthUserType,
    setUsername,
    getIsAuthenticated,
    getAuthUserType,
    getUsername,
    registerStudent,
    registerEmployee,
    logInStudent,
    logInEmployee,
    fetchStudentProfile,
  }
})
