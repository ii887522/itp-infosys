<!--need change: to employee scope-->
<template>
    <q-page padding>
        <q-layout view="lHh Lpr lFf">
            <q-page container>
                <div class="q-pa-xl flex flex-center shadow-8">
                    <q-card>
                        <p class="signup-header text-h4 q-pt-md">Student Sign Up</p>
                        <q-card-section>
                            <q-form @submit="registerEmployee" class="q-gutter-md">
                                <q-input filled v-model="employeeName" label="Employee Name" dense class="input-field" :rules="[requiredRule]"/>
                                <q-input filled v-model="companyName" label="Company Name" dense class="input-field" placeholder="Something Sdn. Bhd." :rules="[requiredRule]"/>
                                <q-input filled v-model="employeeEmail" label="Employee Email" dense class="input-field" placeholder="someone@example.com" :rules="[requiredRule, companyEmailRule]"/>
                                <q-input filled v-model="password" label="Password" type="password" dense class="input-field" :rules="[requiredRule, passwordRule]"/>
                                <q-input filled v-model="confirmPassword" label="Confirm Password" type="password" dense class="input-field" :rules="[requiredRule, confirmPasswordRule]"/>

                                <div>
                                    <q-btn type="submit" label="Sign Up" color="primary" class="q-mt-md"/>
                                    <q-btn flat label="Reset" color="primary" class="q-mt-md" @click="resetForm" />
                                </div>
                            </q-form>
                        </q-card-section>
                    </q-card>
                </div>
            </q-page>
        </q-layout>
    </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useMeta, type QInput } from 'quasar'
import { useRouter } from 'vue-router'
import { isTextEmpty } from 'src/common';
import { allGenders, allProgrammes } from 'src/consts/student'

useMeta({ title: 'Employee Sign Up | MyITPHub' })

const employeeName = ref('');
const companyName = ref('');
const employeeEmail = ref('');
const password = ref('');
const confirmPassword = ref('');
const router = useRouter();

const model = ref<string | null>(null);
const programmes = allProgrammes;
const genders = allGenders;

// validation rules
const requiredRule = (value: string) => !isTextEmpty(value) || 'This field is required';
const companyEmailRule = (value: string) => /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(value) || 'Invalid email format';
const passwordRule = (value: string) => value.length >= 8 || 'Password must be at least 8 characters';
const confirmPasswordRule = (value: string) => value === password.value || 'Passwords do not match';

const registerEmployee = () => {
  if (employeeName.value && companyName.value && employeeEmail.value && password.value && confirmPassword.value) {
    alert('Registration successful!');
    router.push('/dashboard');
  }
  else {
    alert('Registration failed. Please fill in all required fields.');
  }
}

const resetForm = () => {
    employeeName.value = '';
    companyName.value = '';
    employeeEmail.value = '';
    password.value = '';
    confirmPassword.value = '';
}
</script>

<style scoped>
.signup-header {
  font-weight: bold;
  text-align: center;
  color: blue;
}

.input-field {
  min-width: 300px;
}
</style>