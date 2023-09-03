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
                                        <q-input v-model="employeeName" label="Employee Name"/>
                                        <q-input v-model="employeeRole" label="Employee Role"/>
                                        <q-input v-model="companyName" label="Company Name"/>
                                        <q-input v-model="employeeEmail" label="Employee Email"/>
                                        <q-input v-model="employeePhone" label="Employee Phone"/>
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
                                        <!-- After successfully retrieved, get the details and fill in all the fields here as placeholder -->
                                        <q-input v-model="companyName" label="Company Name"/>
                                        <q-input v-model="workingDays" label="Working Days"/>
                                        <q-input v-model="workingHours" label="Working Hours"/>
                                        <q-input v-model="companyAddress" label="Company Address"/>
                                        <br/>
                                        Internship opens for:
                                        <q-option-group
                                            name="internship_levels"
                                            v-model="openFor"
                                            :options="internLevels"
                                            type="checkbox"
                                            color="primary"
                                            inline
                                        />
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
                                        <q-input v-model="newPassword" type="password" label="New Password" />
                                        <q-input v-model="confirmNewPassword" type="password" label="Confirm New Password" />
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

useMeta({ title: 'Editing Employee Profile | MyITPHub' })

const loading = ref(true);
const model = ref(null);
const router = useRouter();

// Add an onMounted hook to set loading to false after 1 second
onMounted(() => {
  setTimeout(() => {
    loading.value = false;
  }, 1000); // 1000 milliseconds = 1 second
});

// Basic Form details
const employeeName = ref('');
const employeeRole = ref('');
const companyName = ref('');
const employeeEmail = ref('');
const employeePhone = ref('');

/*
PLANNED:
companyName - list (once database has been implemented)
*/

// Update company details
const workingDays = ref('');
const workingHours = ref('');
const companyAddress = ref('');
const openFor = ref([]);

const internLevels = [
    {
        label: 'Diploma',
        value: 'diploma',
    },
    {
        label: 'Degree',
        value: 'degree',
    }
];

// Update Password
const currentPassword = ref('');
const newPassword = ref('');
const confirmNewPassword = ref('');

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