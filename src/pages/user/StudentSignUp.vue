<template>
    <q-page padding>
        <q-layout view="lHh Lpr lFf">
            <q-page container>
                <div class="q-pa-xl flex flex-center shadow-8">
                    <q-card>
                        <p class="signup-header text-h4 q-pt-md">Student Sign Up</p>
                        <q-card-section>
                            <q-form @submit="registerStudent" class="q-gutter-md">
                                <q-input filled v-model="studentName" label="Student Name" dense class="input-field" :rules="[requiredRule]"/>
                                <q-input filled v-model="studentId" label="Student ID" dense class="input-field" required :rules="[requiredRule, studentIdRule]"/> <!-- example: if 22WMR00111 -->
                                <q-input filled v-model="studentEmail" label="Student Email" dense class="input-field" required :rules="[requiredRule, studentEmailRule]"/>
                                <q-input filled v-model="personalEmail" label="Personal Email" dense class="input-field" required :rules="[requiredRule, personalEmailRule, nonStudentEmailRule]"/>
                                <q-input filled v-model="password" label="Password" type="password" dense class="input-field" required :rules="[requiredRule, passwordRule]"/>
                                <q-input filled v-model="confirmPassword" label="Confirm Password" type="password" dense class="input-field" required :rules="[requiredRule, confirmPasswordRule]"/>

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
import { isText } from '@vue/compiler-core';

useMeta({ title: 'Student Sign Up | MyITPHub' })

const studentName = ref('');
const studentId = ref('');
const studentEmail = ref('');
const personalEmail = ref('');
const password = ref('');
const confirmPassword = ref('');
const router = useRouter();

// validation rules
const requiredRule = (value: string) => !isTextEmpty(value) || 'This field is required';
const studentIdRule = (value: string) => /^[0-9]{2}[A-Z]{3}[0-9]{5}$/.test(value) || 'Invalid Student ID format';
const studentEmailRule = (value: string) => /.+@student\.tarc\.edu\.my$/.test(value) || 'Student email must end with "@student.tarc.edu.my"';
const personalEmailRule = (value: string) => /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(value) || 'Invalid personal email format';
const nonStudentEmailRule = (value: string) => /^((?!\@student\.tarc\.edu\.my).)*$/.test(value) || 'Personal email must not end with "@student.tarc.edu.my"';
const passwordRule = (value: string) => value.length >= 8 || 'Password must be at least 8 characters';
const confirmPasswordRule = (value: string) => value === password.value || 'Passwords do not match';

const registerStudent = () => {
  // Perform authentication logic here
  // Example: Can make an API request to verify the credentials
  // If success, navigate to the student dashboard
  router.push('/dashboard');
}

const resetForm = () => {
    studentName.value = '';
    studentId.value = '';
    studentEmail.value = '';
    personalEmail.value = '';
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
  min-width: 250px;
}
</style>