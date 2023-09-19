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
                        <q-form @submit="updateCompany">
                            <q-expansion-item popup icon="business" label="Edit Company Details">
                                <q-separator/>
                                <q-card>
                                    <q-card-section>
                                        <!-- Retrieve the company name associated with the user from database -->
                                        <q-input v-model="companyName" label="Company Name" dense class="input-field" :rules="[requiredRule]"/>
                                        <q-editor v-model="companyDesc" label="Company Description" min-height="5rem" dense class="input-field" :rules="[requiredRule]"/>
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
import { Notify, useMeta, useQuasar } from 'quasar';
import { api } from 'src/boot/axios';
import { isTextEmpty } from 'src/common';
import { useLocalStorageStore } from 'src/stores/localstorage-store'
import { useStore } from 'src/stores/user-store'

useMeta({ title: 'Editing Employee Profile | MyITPHub' })

// On loading
onMounted(async () => {
    setTimeout(() => {
        loading.value = false;
    }, 1000); // 1000 milliseconds = 1 second

    const default_company_name = fetchEmployeeProfile()
    fetchCompanyNames()
    fetchCompanyDetails(await default_company_name)
});

// Utilties
const loading = ref(true);
const store = useStore();
const lsStore = useLocalStorageStore();
const { dialog } = useQuasar();

// Basic Form details
const employeeName = ref('');
const companyName = ref('');
const companyOptions = ref([]);
const selectedCompany = ref('');
const newCompany = ref('');
const employeeEmail = ref('');
const ori_employeeEmail = ref('');
const ori_companyName = ref('');
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
    selectedCompany.value = resp.data.company_name;
    employeeEmail.value = resp.data.emp_email;
    ori_employeeEmail.value = resp.data.emp_email;
    employeePhone.value = resp.data.emp_phone;

    // Pass the company name to retrieve company details
    return(resp.data.company_name);
  } catch (error) {
    console.error('Error fetching employee profile:', error);
    return ('')
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
async function fetchCompanyDetails(company_name : string) {
    try {
        const resp = await api.get(`/user/get-company-details/${company_name}`);

        companyName.value = resp.data.company_name;
        ori_companyName.value = resp.data.company_name;
        companyDesc.value = resp.data.company_desc;
        companySize.value = resp.data.company_size;
        companyAddress.value = resp.data.company_address;
        companyUrl.value = resp.data.company_url;
    } catch (error) {
        console.error('Error fetching company details:', error);
    }
}

const updateProfile = () => {
    dialog({
        title: 'Confirm Profile Update',
        message: 'Are you sure you want to save changes to your profile?',
        cancel: { icon: 'close', label: 'Cancel', color: 'negative', flat: true },
        ok: { icon: 'update', label: 'Save Changes', color: 'primary' },
    }).onOk(async() => {
        try {
            await store.updateEmpProfile({
                ori_emp_email: ori_employeeEmail.value,
                emp_name: employeeName.value,
                company_name: companyName.value,
                emp_email: employeeEmail.value,
                emp_phone: employeePhone.value,
            })

            Notify.create('Profile updated successfully');
        } catch (error) {
            console.error('Error updating profile:', error);

            Notify.create({
                message: 'Failed to update profile',
                color: 'negative',
            });
        }
    })
};

const updateCompany = async () => {
    dialog({
        title: 'Confirm Company Update',
        message: 'Are you sure you want to update company details?',
        cancel: { icon: 'close', label: 'Cancel', color: 'negative', flat: true },
        ok: { icon: 'update', label: 'Change Password', color: 'primary' },
    }).onOk(async() => {
        try {
            await store.updateCompanyDetails({
                ori_company_name: ori_companyName.value,
                company_name: companyName.value,
                company_desc: companyDesc.value,
                company_size: companySize.value,
                company_address: companyAddress.value,
                company_url: companyUrl.value,
            })

            Notify.create('Company details updated successfully');
        } catch (error) {
            console.error('Error updating company details:', error);

            Notify.create({
                message: 'Failed to update company details',
                color: 'negative',
            });
        }
    })
}

const updatePassword = () => {
    dialog({
        title: 'Confirm Password Update',
        message: 'Are you sure you want to change password?',
        cancel: { icon: 'close', label: 'Cancel', color: 'negative', flat: true },
        ok: { icon: 'update', label: 'Change Password', color: 'primary' },
    }).onOk(async() => {
        try {
            await store.updateEmpPassword({
                emp_email: employeeEmail.value,
                current_password: currentPassword.value,
                new_password: newPassword.value,
            })

            Notify.create('Password updated successfully');
        } catch (error) {
            console.error('Error updating password:', error);

            Notify.create({
                message: 'Failed to update password',
                color: 'negative',
            })
        }
    })
};
</script>
