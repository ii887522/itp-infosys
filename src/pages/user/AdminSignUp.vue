<template>
    <q-page padding>
        <q-layout view="lHh Lpr lFf">
            <q-page container>
                <div class="q-pa-xl flex flex-center shadow-8">
                    <q-card>
                        <p class="signup-header text-h4 q-pt-md">Admin Sign Up</p>
                        <q-card-section>
                            <q-form @submit="register" class="q-gutter-md">
                                <q-input filled v-model="adminUsername" label="Username" dense class="input-field" :rules="[requiredRule]"/>
                                <q-input filled v-model="adminEmail" label="Email" dense class="input-field" :rules="[requiredRule, personalEmailRule]"/>
                                <q-input filled v-model="password" label="Password" type="password" dense class="input-field" :rules="[requiredRule, passwordRule]"/>
                                <q-input filled v-model="confirmPassword" label="Confirm Password" type="password" dense class="input-field" :rules="[requiredRule, confirmPasswordRule]"/>

                                <div>
                                    <q-btn type="submit" label="Sign Up" color="primary" class="q-mt-md" :disable="signUpSuccess"/>
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

useMeta({ title: 'Admin Sign Up | MyITPHub' })

const store = useStore();
const { notify } = useQuasar();
const signUpSuccess = ref(false);

const adminUsername = ref('');
const adminEmail = ref('');
const password = ref('');
const confirmPassword = ref('');

// validation rules
// supervisor id = 4 numbers or "P" + 4 numbers
const requiredRule = (value: string) => !isTextEmpty(value) || 'This field is required';
const personalEmailRule = (value: string) => /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(value) || 'Invalid personal email format';
const passwordRule = (value: string) => value.length >= 8 || 'Password must be at least 8 characters';
const confirmPasswordRule = (value: string) => value === password.value || 'Passwords do not match';

// execute the register logic
async function register() {
    await store.registerAdmin({
        username: adminUsername.value,
        email: adminEmail.value,
        password: password.value,
    })

    notify({
        progress: true,
        type: 'positive',
        message: 'Admin successfully registered. You may now login with your credentials.',
        icon: 'done',
    })

    signUpSuccess.value = true
}

const resetForm = () => {
    adminUsername.value = '';
    adminEmail.value = '';
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
