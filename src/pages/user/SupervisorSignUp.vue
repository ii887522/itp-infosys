<template>
    <q-page padding>
        <q-layout view="lHh Lpr lFf">
            <q-page container>
                <div class="q-pa-xl flex flex-center shadow-8">
                    <q-card>
                        <p class="signup-header text-h4 q-pt-md">Supervisor Sign Up</p>
                        <q-card-section>
                            <q-form @submit="register" class="q-gutter-md">
                                <q-input filled v-model="supervisorId" label="Supervisor ID" dense class="input-field" :rules="[requiredRule]"/>
                                <q-input filled v-model="supervisorName" label="Supervisor Name" dense class="input-field" :rules="[requiredRule]"/>
                                <q-select filled v-model="gender" :options="genders" label="Gender" dense class="input-field" :rules="[requiredRule]" />
                                <q-select filled v-model="faculty" :options="faculties" label="Faculty" dense class="input-field" :rules="[requiredRule]" />
                                <q-input filled v-model="supervisorEmail" label="Supervisor Email" dense class="input-field" :rules="[requiredRule]"/> <!-- must end with @tarc.edu.my -->
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
import { isTextEmpty } from 'src/common';
import { useStore } from 'stores/user-store'
import { allFaculty, allGenders } from 'src/consts/student';

useMeta({ title: 'Supervisor Sign Up | MyITPHub' })

const store = useStore();
const { notify } = useQuasar();

const supervisorId = ref('');
const supervisorName = ref('');
const gender = ref([]);
const faculty = ref([]);
const supervisorEmail = ref('');
const password = ref('');
const confirmPassword = ref('');

const genders = allGenders;
const faculties = allFaculty;

// validation rules
// supervisor id = 4 numbers or "P" + 4 numbers
const requiredRule = (value: string) => !isTextEmpty(value) || 'This field is required';
const passwordRule = (value: string) => value.length >= 8 || 'Password must be at least 8 characters';
const confirmPasswordRule = (value: string) => value === password.value || 'Passwords do not match';

// execute the register logic
async function register() {
    await store.registerSupervisor({
        supervisor_id: supervisorId.value,
        supervisor_name: supervisorName.value,
        password: password.value,
        gender: gender.value,
        faculty: faculty.value,
        supervisor_email: supervisorEmail.value,
    })

    notify({
        progress: true,
        type: 'positive',
        message: 'Supervisor successfully registered. You may now login with your credentials.',
        icon: 'done',
    })

    resetForm();
}

const resetForm = () => {
    supervisorId.value = '';
    supervisorName.value = '';
    gender.value = [];
    faculty.value = [];
    supervisorEmail.value = '';
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