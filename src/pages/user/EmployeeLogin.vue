<template>
    <q-page padding>
      <q-layout view="lHh Lpr lFf">
        <q-page-container>
          <div class="q-pa-xl flex flex-center shadow-8">
              <q-card>
                  <p class="login-header text-h4 q-pt-md">Employee Login</p>
                  <q-card-section>
                    <q-form @submit="login" class="q-gutter-md">
                      <q-input filled v-model="email" label="Email" dense class="input-field" />
                      <q-input filled v-model="password" label="Password" type="password" dense class="input-field" />
  
                      <div>
                        <q-btn flat color="primary" label="Sign Up" class="q-mt-md" />
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
  import { ref } from 'vue'
  import { useMeta, type QInput } from 'quasar'
  import { useRouter } from 'vue-router'
  
  useMeta({ title: 'Employee Login | MyITPHub' })
  
  const email = ref('');
  const password = ref('');
  const router = useRouter(); // Import the router directly
  
  const login = () => {
    // Perform authentication logic here
    // Example: Can make an API request to verify the credentials
    // If success, navigate to the employee dashboard
    router.push('/dashboard');
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
  </style>