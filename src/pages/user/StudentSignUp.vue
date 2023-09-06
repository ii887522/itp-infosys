<template>
    <q-page padding>
        <q-layout view="lHh Lpr lFf">
            <q-page container>
                <div class="q-pa-xl flex flex-center shadow-8">
                    <q-card>
                        <p class="signup-header text-h4 q-pt-md">Student Sign Up</p>
                        <q-card-section>
                            <q-form @submit="register" class="q-gutter-md">
                                <q-input filled v-model="studentName" label="Student Name" dense class="input-field" :rules="[requiredRule]"/>
                                <q-input filled v-model="studentId" label="Student ID" dense class="input-field" placeholder="22WMR00111" :rules="[requiredRule, studentIdRule]"/>
                                <q-input filled v-model="icNo" label="IC Number" dense class="input-field" placeholder="012345-67-8900" :rules="[requiredRule, icNumberRule]"/>
                                <q-select filled v-model="gender" :options="genders" label="Gender" dense class="input-field" :rules="[requiredRule]" />
                                <q-select filled v-model="programme" :options="programmes" label="Programme" dense class="input-field" :rules="[requiredRule]" />
                                <q-input filled v-model="studentEmail" label="Student Email" dense class="input-field" placeholder="someone-wm19@student.tarc.edu.my" :rules="[requiredRule, studentEmailRule]"/>
                                <q-input filled v-model="personalEmail" label="Personal Email" dense class="input-field" placeholder="someone@example.com" :rules="[requiredRule, personalEmailRule, nonStudentEmailRule]"/>
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
import { useMeta, useQuasar, type QInput } from 'quasar'
import { useRouter } from 'vue-router'
import { isTextEmpty } from 'src/common';
import { allGenders, allProgrammes } from 'src/consts/student'
import { useStore } from 'stores/user-store'

useMeta({ title: 'Student Sign Up | MyITPHub' })

const store = useStore();
const { notify } = useQuasar();

const studentName = ref('');
const studentId = ref('');
const icNo = ref('');
const gender = ref([]);
const programme = ref([]);
const studentEmail = ref('');
const personalEmail = ref('');
const password = ref('');
const confirmPassword = ref('');
const router = useRouter();

const model = ref<string | null>(null);
const programmes = allProgrammes;
const genders = allGenders;

// validation rules
const requiredRule = (value: string) => !isTextEmpty(value) || 'This field is required';
const studentIdRule = (value: string) => /^[0-9]{2}[A-Z]{3}[0-9]{5}$/.test(value) || 'Invalid Student ID format';
const icNumberRule = (value: string) => /^\d{6}-\d{2}-\d{4}$/.test(value) || 'Invalid IC Number format';
const studentEmailRule = (value: string) => /.+@student\.tarc\.edu\.my$/.test(value) || 'Student email must end with "@student.tarc.edu.my"';
const personalEmailRule = (value: string) => /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(value) || 'Invalid personal email format';
const nonStudentEmailRule = (value: string) => /^((?!\@student\.tarc\.edu\.my).)*$/.test(value) || 'Personal email must not end with "@student.tarc.edu.my"';
const passwordRule = (value: string) => value.length >= 8 || 'Password must be at least 8 characters';
const confirmPasswordRule = (value: string) => value === password.value || 'Passwords do not match';

async function register() {
  // add the student to database
  await store.registerStudent({
    student_id: studentId.value,
    student_name: studentName.value,
    password: password.value,
    ic_no: icNo.value,
    gender: gender.value,
    programme: programme.value,
    student_email: studentEmail.value,
    personal_email: personalEmail.value,
  })

  notify({
    progress: true,
    type: 'positive',
    message: 'Student successfully registered. You may now login with your credentials.',
    icon: 'done',
  })

  resetForm();
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
  min-width: 300px;
}
</style>