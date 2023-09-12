<!-- TODO: Get from database and display in the placeholder -->
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
                        <!-- Back button -->
                        <q-form @submit="updateProfile">
                            <q-expansion-item default-opened icon="account_circle" label="Edit Profile Details" header-class="bg-blue text-white">
                                <q-separator/>
                                <q-card class="bg-blue-1">
                                    <q-card-section>
                                        <q-input v-model="student_name" label="Student Name" :rules="[requiredRule]"/>
                                        <q-input v-model="student_id" label="Student ID" :rules="[requiredRule, studentIdRule]"/>
                                        <q-input v-model="icNo" label="IC Number" :rules="[requiredRule, icNumberRule]"/>
                                        <q-select v-model="gender" :options="genders" label="Gender" :rules="[requiredRule]" />
                                        <q-select v-model="programme" :options="programmes" label="Programme" :rules="[requiredRule]"/>
                                        <q-select v-model="faculty" :options="faculties" label="Faculty" :rules="[requiredRule]"/>
                                        <q-input v-model="studentEmail" label="Student Email" :rules="[requiredRule, studentEmailRule]"/>
                                        <q-input v-model="personalEmail" label="Personal Email" :rules="[requiredRule, nonStudentEmailRule, personalEmailRule]"/>
                                        <br/>
                                        <!-- Set the button to enable only when a change is made -->
                                        <q-btn label="Save Changes" color="primary" type="submit" />
                                    </q-card-section>
                                </q-card>
                            </q-expansion-item>
                        </q-form>
                        
                        <br/>
                        <!-- Change Resume Section -->
                        <q-form @submit="updateResume">
                            <q-expansion-item popup icon="description" label="Change Resume">
                                <q-separator/>
                                <q-card>
                                    <q-card-section>
                                        <q-banner rounded class="bg-orange text-white">
                                            <template v-slot:avatar>
                                                <q-icon name="warning" />
                                            </template>
                                            <strong>Warning:</strong> Uploading a new resume will overwrite your current one. You can view your existing resume in your profile.
                                        </q-banner>
                                        <br/>
                                        <q-file filled bottom-slots v-model="model" label="Upload New Resume" counter accept=".pdf,.docx">
                                            <template v-slot:prepend>
                                                <q-icon name="cloud_upload" @click.stop.prevent />
                                            </template>
                                            <template v-slot:append>
                                                <q-icon name="close" @click.stop.prevent="model = null" class="cursor-pointer"/>
                                            </template>

                                            <template v-slot:hint>
                                                must be in pdf or word
                                            </template>
                                        </q-file>
                                        <br/>
                                        <q-btn label="Upload Resume" color="primary" type="submit" />
                                    </q-card-section>
                                </q-card>
                            </q-expansion-item>
                        </q-form>

                        <br/>
                        <!-- Change Internship / Fill in Internship Details -->
                        <q-form @submit="updateInternDetails">
                            <q-expansion-item popup icon="details" label="Internship Details">
                                <q-separator/>
                                <q-card>
                                    <q-card-section>
                                        <!-- form details here -->
                                        <!-- QDate - auto get current hours, minutes and seconds-->
                                        <!-- Supervisor Assigned At-->
                                        <q-date v-model="supervisor_assigned_at" today-btn disable subtitle="Supervisor Assigned At"/>
                                        <!-- ITP date -->
                                        <q-date v-model="itp_dates" range subtitle="ITP Dates" />
                                        <!-- Company name; may need to retrieve company names -->
                                        <q-input v-model="company_name" label="Company Name" :rules="[requiredRule]"/>
                                        <br/>
                                        <!-- Supervisor name -->
                                        <q-input v-model="supervisor_name" label="Supervisor Name" :rules="[requiredRule]"/>
                                        <br/>
                                        <q-btn label="Save Changes" color="primary" type="submit" />
                                    </q-card-section>
                                </q-card>
                            </q-expansion-item>
                        </q-form>

                        <br/>
                        <!-- Change Password Section -->
                        <q-form @submit="updatePassword">
                            <q-expansion-item popup icon="password" label="Change Password">
                                <q-separator/>
                                <q-card>
                                    <q-card-section>
                                        <q-input v-model="currentPassword" type="password" label="Current Password" />
                                        <q-input v-model="newPassword" type="password" label="New Password" :rules="[requiredRule, passwordRule]"/>
                                        <q-input v-model="confirmNewPassword" type="password" label="Confirm New Password" :rules="[requiredRule, confirmPasswordRule]"/>
                                        <br/>
                                        <!-- only enable when all the fields are filled in -->
                                        <q-btn label="Change Password" color="primary" type="submit" />
                                    </q-card-section>
                                </q-card>
                            </q-expansion-item>
                        </q-form>
                    </div>

                    <!-- confirmation dialogs -->
                </q-card-section>
            </q-card>
        </div>
    </q-page>
</template>

<script setup lang="ts">
// TODO: Dialog for confirm to save changes

import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { allGenders, allProgrammes, allFaculty } from 'src/consts/student'
import { useMeta } from 'quasar';
import { useStore } from 'src/stores/user-store';
import { api } from 'src/boot/axios';
import { isTextEmpty } from 'src/common';

useMeta({ title: 'Editing Student Profile | MyITPHub' })

// Basic Form fields
const student_name = ref('');
const student_id = ref('');
const icNo = ref('');
const gender = ref([]);
const programme = ref([]);
const studentEmail = ref('');
const personalEmail = ref('');
const faculty = ref([]);

const programmes = allProgrammes;
const genders = allGenders;
const faculties = allFaculty;

// Internship details fields
const supervisor_assigned_at = ref('');
const company_name = ref('');
const supervisor_name = ref('');
const itp_start_at = ref('');
const itp_end_at = ref('');
const itp_dates = ref({
    from: '',
    to: '',
});

// Change Password Section
const currentPassword = ref('');
const newPassword = ref('');
const confirmNewPassword = ref('');
const existing_password = ref(''); // to compare with the input current password

// validation rules
const requiredRule = (value: string) => !isTextEmpty(value) || 'This field is required';
const studentIdRule = (value: string) => /^[0-9]{2}[A-Z]{3}[0-9]{5}$/.test(value) || 'Invalid Student ID format';
const icNumberRule = (value: string) => /^\d{6}-\d{2}-\d{4}$/.test(value) || 'Invalid IC Number format';
const studentEmailRule = (value: string) => /.+@student\.tarc\.edu\.my$/.test(value) || 'Student email must end with "@student.tarc.edu.my"';
const personalEmailRule = (value: string) => /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(value) || 'Invalid personal email format';
const nonStudentEmailRule = (value: string) => /^((?!\@student\.tarc\.edu\.my).)*$/.test(value) || 'Personal email must not end with "@student.tarc.edu.my"';
const passwordRule = (value: string) => value.length >= 8 || 'Password must be at least 8 characters';
const confirmPasswordRule = (value: string) => value === newPassword.value || 'Passwords do not match';

// utilties
const loading = ref(true);
const model = ref(null);
const router = useRouter();
const store = useStore();

async function fetchStudentProfile() {
    try {
        const studentId = store.getUsername();
        const resp = await api.get(`/user/get-student-profile/${studentId}`);
        console.log('API Response:', resp); // Log the response
  
        // Check the structure of resp.data
        student_name.value = resp.data.student_name;
        student_id.value = resp.data.student_id;
        existing_password.value = resp.data.password;
        icNo.value = resp.data.ic_no;
        studentEmail.value = resp.data.student_email;
        personalEmail.value = resp.data.personal_email;
        faculty.value = resp.data.faculty;
        programme.value = resp.data.programme;
        gender.value = resp.data.gender;

        // Optional: assign if found data in student intern
        /* supervisor_assigned_at.value = resp.data?.supervisor_assigned_at;
        company_name.value = resp.data?.company_name;
        supervisor_name.value = resp.data?.supervisor_name;
        itp_start_at.value = resp.data?.itp_start_at;
        itp_end_at.value = resp.data?.itp_end_at; */
    } catch (error) {
        console.error('Error fetching student profile:', error);
    }
}

// Add an onMounted hook to set loading to false after 1 second
onMounted(() => {
    fetchStudentProfile();
    setTimeout(() => {
        loading.value = false;
    }, 1000); // 1000 milliseconds = 1 second
});

const updateProfile = async () => {
    // Implement logic to update the profile data
    router.push('/profile'); // Redirect to the profile page
};

const updateResume = async () => {
    // Implement logic to upload a new resume and update it
    router.push('/profile'); // Redirect to the profile page
};

const updateInternDetails = async() => {
    // Implement logic here
}

const updatePassword = async () => {
    // Implement logic to update the password
    router.push('/profile'); // Redirect to the profile page
};
</script>