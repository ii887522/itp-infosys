<template>
    <q-page padding>
      <q-layout view="lHh Lpr lFf">
        <q-page-container>
          <div class="q-pa-xl flex flex-center shadow-8">
              <q-card>
                  <p class="login-header text-h4 q-pt-md">Supervisor Login</p>
                  <q-card-section>
                    <q-form @submit="login" class="q-gutter-md">
                      <div v-if="displayErrorMessage" class="error-message">{{ store.errorMessage }}</div> <!-- Error Message (conditional) -->
  
                      <q-input filled v-model="supervisorId" label="Supervisor ID" dense class="input-field" />
                      <q-input filled v-model="password" label="Password" type="password" dense class="input-field" />
  
                      <div>
                        <q-btn flat color="primary" label="Sign Up" class="q-mt-md" @click="supSignUp" />
                        <q-btn type="submit" label="Login" color="primary" class="q-mt-md" />
                      </div>
                    </q-form>
                  </q-card-section>
              </q-card>
          </div>
        </q-page-container>
      </q-layout>
    </q-page>
  </template>
  
<script setup lang="ts">
  import { ref, computed } from 'vue'
  import { useMeta, type QInput } from 'quasar'
  import { useStore } from 'stores/user-store'
  import { useRouter } from 'vue-router';
  import { useLocalStorageStore } from 'src/stores/localstorage-store';
  
  useMeta({ title: 'Student Login | MyITPHub' })
  
  const store = useStore();
  const lsStore = useLocalStorageStore();
  const supervisorId = ref('');
  const password = ref('');
  const router = useRouter();
  
  console.log('Is Authenticated:', lsStore.isAuthenticated);
  
  const displayErrorMessage = computed(() => {
    return store.loginError && store.errorMessage !== '';
  });

  function supSignUp() {
    router.push('/sup/signup');
  }
  
  async function login() {
    store.loginError = false;
    store.errorMessage = '';
  
    await store.logInSupervisor({
      supervisor_id: supervisorId.value,
      supervisor_name: '',
      password: password.value,
      gender: [],
      faculty: [],
      supervisor_email: '',
    })
  
    console.log('Is Authenticated:', lsStore.isAuthenticated);
    if (!store.loginError) {
      router.push('/')
    }
  }
  </script>
  
  <style scoped>
  .login-header {
      font-weight: bold;
      text-align: center;
      color: green;
  }
  
  .input-field {
    min-width: 250px;
  }
  
  .error-message {
    color: red;
    margin-top: 5px;
  }
  </style>