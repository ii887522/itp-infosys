<template>
    <q-page padding>
        <q-layout view="lHh Lpr lFf">
            <q-page container>
                <div class="q-pa-xl flex flex-center shadow-8">
                    <q-card>
                        <p class="signup-header text-h4 q-pt-md">Employee Sign Up</p>
                        <q-card-section>
                            <q-form @submit="register" class="q-gutter-md">
                                <q-input filled v-model="employeeName" label="Employee Name" dense class="input-field" :rules="[requiredRule]"/>
                                <!-- <q-input filled v-model="companyName" label="Company Name" dense class="input-field" placeholder="Something Sdn. Bhd." :rules="[requiredRule]"/> -->

                                <!-- Dropdown for selecting an existing company or adding a new one -->
                                <!-- If too many company names, need to limit the dropdown size; and allow them to search company name -->
                                <q-select filled v-model="selectedCompany" :options="companyOptions" label="Company" dense class="input-field"/>
                                <br/>
                                <!-- Text box for adding a new company (displayed conditionally) -->
                                <q-input v-if="selectedCompany === 'Add new...'" filled v-model="newCompany" label="New Company" dense class="input-field" :rules="[requiredRule]"/>

                                <q-input filled v-model="employeeEmail" label="Employee Email" dense class="input-field" placeholder="someone@example.com" :rules="[requiredRule, companyEmailRule]"/>
                                <q-input filled v-model="employeePhone" label="Employee Phone" dense class="input-field" placeholder="0123456789" :rules="[requiredRule, phoneRule]"/>
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
import { onMounted, ref } from 'vue'
import { useMeta, useQuasar, type QInput } from 'quasar'
import { isTextEmpty } from 'src/common';
import { useStore } from 'stores/user-store'
import { api } from 'src/boot/axios';

useMeta({ title: 'Employee Sign Up | MyITPHub' })

const store = useStore();
const { notify } = useQuasar();
const signUpSuccess = ref(false);

const employeeName = ref('');
const companyName = ref('');

const companyOptions = ref([]);
const selectedCompany = ref('');
const newCompany = ref('');

const employeeEmail = ref('');
const employeePhone = ref('');
const password = ref('');
const confirmPassword = ref('');

// validation rules
const requiredRule = (value: string) => !isTextEmpty(value) || 'This field is required';
const companyEmailRule = (value: string) => /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(value) || 'Invalid email format';
const passwordRule = (value: string) => value.length >= 8 || 'Password must be at least 8 characters';
const confirmPasswordRule = (value: string) => value === password.value || 'Passwords do not match';
const phoneRule = (value: string) => /^\d{10}$/.test(value) || 'Invalid phone number format';

// Function to retrieve existing company names
async function fetchCompanyNames() {
  try {
    const response = await api.get('/user/get-companies');
    const companies = response.data.companies;

    // Add "Add new..." to the list of companies
    companies.push('Add new...');

    // Set the options for the dropdown
    companyOptions.value = companies;
  } catch (error) {
    console.error('Error fetching company names:', error);
  }
}

onMounted(() => {
  fetchCompanyNames();
})

// execute the register logic
async function register() {
  let companyNameToAdd = selectedCompany.value;

  // Check if the user selected "Add new..." and use the newCompany value
  if (selectedCompany.value === 'Add new...') {
    companyNameToAdd = newCompany.value;
  }

  await store.registerEmployee({
    emp_name: employeeName.value,
    password: password.value,
    company_name: companyNameToAdd,
    emp_email: employeeEmail.value,
    emp_phone: employeePhone.value,
  })

  notify({
    progress: true,
    type: 'positive',
    message: 'Employee successfully registered. You may now login with your credentials.',
    icon: 'done',
  })

  signUpSuccess.value = true
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
