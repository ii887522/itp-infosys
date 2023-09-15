<template>
  <q-page padding>
    <q-layout view="lHh Lpr lFf">
      <q-page-container>
        <div class="q-pa-xl flex flex-center shadow-8">
            <q-card>
                <p class="login-header text-h4 q-pt-md">Student Login</p>
                <q-card-section>
                  <q-form @submit="login" class="q-gutter-md">
                    <div v-if="displayErrorMessage" class="error-message">{{ store.errorMessage }}</div> <!-- Error Message (conditional) -->

                    <q-input filled v-model="studentId" label="Student ID" dense class="input-field" />
                    <q-input filled v-model="password" label="Password" type="password" dense class="input-field" />

                    <div>
                      <q-btn flat color="primary" label="Sign Up" class="q-mt-md" /> <!--link to student sign up page-->
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

useMeta({ title: 'Student Login | MyITPHub' })

const store = useStore();
const studentId = ref('');
const password = ref('');
const router = useRouter();

console.log('Is Authenticated:', store.isAuthenticated);

const displayErrorMessage = computed(() => {
  return store.loginError && store.errorMessage !== '';
});

async function login() {
  store.loginError = false;
  store.errorMessage = '';

  await store.logInStudent({
    student_id: studentId.value,
    student_name: '',
    password: password.value,
    ic_no: '',
    gender: [],
    programme: [],
    student_email: '',
    personal_email: '',
  })

  console.log('Is Authenticated:', store.isAuthenticated);
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

<!--
upload form [student]
upload progress report [student]
login [student]
logout [student]
update profile [student]
-->