<template>
    <q-page>
        <div class="q-pa-md">
            <q-card>
                <q-card-section>
                    <div class="text-h5">Edit Profile</div>
                </q-card-section>
                <q-card-section>
                    <!-- Linear Progress Indeterminate state -->
                    <q-linear-progress v-if="loading" color="primary" indeterminate />

                    <!-- Profile Form -->
                    <div v-else>
                        <q-form @submit="updateProfile">
                            <q-expansion-item default-opened icon="account_circle" label="Edit Profile Details" header-class="bg-blue text-white">
                                <q-separator/>
                                <q-card class="bg-blue-1">
                                    <q-card-section>
                                        <q-input filled v-model="employeeName" label="Employee Name" dense class="input-field" :rules="[requiredRule]"/>
                                        <q-select filled v-model="selectedCompany" :options="companyOptions" label="Company" dense class="input-field"/>
                                        <br/>
                                        <q-input v-if="selectedCompany === 'Add new...'" filled v-model="newCompany" label="New Company" dense class="input-field" :rules="[requiredRule]"/>

                                        <!-- <q-input v-model="companyName" label="Company Name"/> -->
                                        <q-input filled v-model="employeeEmail" label="Employee Email" dense class="input-field" placeholder="someone@example.com" :rules="[requiredRule, companyEmailRule]"/>
                                        <q-input filled v-model="employeePhone" label="Employee Phone" dense class="input-field" placeholder="0123456789" :rules="[requiredRule, phoneRule]"/>
                                        <br/>
                                        <q-btn label="Save Changes" color="primary" type="submit" />
                                    </q-card-section>
                                </q-card>
                            </q-expansion-item>
                        </q-form>

                        <br/>
                        <!-- Company Details -->
                        <!--
                            Company Name, Company description, Company size, Company address, Company URL
                        -->
                        <q-form @submit="updateCompany">
                            <q-expansion-item popup icon="business" label="Edit Company Details">
                                <q-separator/>
                                <q-card>
                                    <q-card-section>
                                        <!-- Retrieve the company name associated with the user from database -->
                                        <q-input v-model="companyName" label="Company Name" dense class="input-field" :rules="[requiredRule]"/>
                                        <q-input v-model="companyDesc" label="Company Description" type="textarea" dense class="input-field" :rules="[requiredRule]"/>
                                        <q-input v-model.number="companySize" label="Company Size" type="number" dense class="input-field" :rules="[requiredRule]"/>
                                        <q-input v-model="companyAddress" label="Company Address" dense class="input-field" :rules="[requiredRule]"/>
                                        <q-input v-model="companyUrl" label="Company URL" type="url" dense class="input-field" :rules="[requiredRule]"/>
                                        <br/>
                                        <q-btn label="Save Changes" color="primary" type="submit" />
                                    </q-card-section>
                                </q-card>
                                
                            </q-expansion-item>
                        </q-form>

                        <br/>
                        <!-- Change Password -->
                        <q-form @submit="updatePassword">
                            <q-expansion-item popup icon="password" label="Change Password">
                                <q-separator/>
                                <q-card>
                                    <q-card-section>
                                        <q-input v-model="currentPassword" type="password" label="Current Password" />
                                        <q-input v-model="newPassword" type="password" label="New Password" :rules="[requiredRule, passwordRule]"/>
                                        <q-input v-model="confirmNewPassword" type="password" label="Confirm New Password" :rules="[requiredRule, confirmPasswordRule]"/>
                                        <br/>
                                        <q-btn label="Change Password" color="primary" type="submit" />
                                    </q-card-section>
                                </q-card>
                            </q-expansion-item>
                        </q-form>
                    </div>
                </q-card-section>
            </q-card>
        </div>
    </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useMeta } from 'quasar';
import { api } from 'src/boot/axios';
import { isTextEmpty } from 'src/common';
import { useLocalStorageStore } from 'src/stores/localstorage-store'

useMeta({ title: 'Editing Employee Profile | MyITPHub' })

// On loading
onMounted(() => {
  setTimeout(() => {
    loading.value = false;
  }, 1000); // 1000 milliseconds = 1 second

  fetchEmployeeProfile();
  fetchCompanyNames();
  fetchCompanyDetails();
});

// Utilties
const loading = ref(true);
const router = useRouter();
const lsStore = useLocalStorageStore();

// Basic Form details
const employeeName = ref('');
const companyName = ref('');
const companyOptions = ref([]);
const selectedCompany = ref('');
const newCompany = ref('');
const employeeEmail = ref('');
const employeePhone = ref('');

// Company details
const companyDesc = ref('');
const companySize = ref();
const companyAddress = ref('');
const companyUrl = ref('');

// Update Password
const currentPassword = ref('');
const newPassword = ref('');
const confirmNewPassword = ref('');

// Validation rules
const requiredRule = (value: string) => !isTextEmpty(value) || 'This field is required';
const companyEmailRule = (value: string) => /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(value) || 'Invalid email format';
const passwordRule = (value: string) => value.length >= 8 || 'Password must be at least 8 characters';
const confirmPasswordRule = (value: string) => value === newPassword.value || 'Passwords do not match';
const phoneRule = (value: string) => /^\d{10}$/.test(value) || 'Invalid phone number format';

async function fetchEmployeeProfile() {
  try {
    const empEmail = lsStore.getUsername();
    const resp = await api.get(`/user/get-emp-profile/${empEmail}`);
    
    employeeName.value = resp.data.emp_name;
    companyName.value = resp.data.company_name;
    employeeEmail.value = resp.data.emp_email;
    employeePhone.value = resp.data.emp_phone;
  } catch (error) {
    console.error('Error fetching employee profile:', error);
  }
}

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

// Fetch company details
async function fetchCompanyDetails() {
    try {
        const resp = await api.get(`/user/get-company-details/${companyName}`);

        companyName.value = resp.data.company_name;
        companyDesc.value = resp.data.company_desc;
        companySize.value = resp.data.company_size;
        companyAddress.value = resp.data.company_address;
        companyUrl.value = resp.data.company_url;
    } catch (error) {
        console.error('Error fetching company details:', error);
    }
}


const updateProfile = async () => {
  // Implement logic to update the profile data
  router.push('/profile'); // Redirect to the profile page
};

const updateCompany = async () => {
    // Send a message to confirm whether the user want to update the company details.
    // If yes, the request is sent to admin for approval
    router.push('/profile');
}

const updatePassword = async () => {
  // Implement logic to update the password
  router.push('/profile'); // Redirect to the profile page
};
</script>