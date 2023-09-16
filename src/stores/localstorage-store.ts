import { defineStore } from "pinia";
import { LocalStorage } from "quasar";
import { ref, onMounted } from "vue";

/*
LocalStorage:
- isAuthenticateed: false, true
- authUserType: stud, emp, sup, admin
- username: student_id, emp_email, supervisor_id, admin?
*/

export const useLocalStorageStore = defineStore('local-storage', () => {
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
  
    return {
      isAuthenticated,
      authUserType,
      username,
      setIsAuthenticated,
      setAuthUserType,
      setUsername,
      getIsAuthenticated,
      getAuthUserType,
      getUsername,
    }
  })