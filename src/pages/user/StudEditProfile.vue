<!-- 
TODO:
* Implement update profile logic - for Edit Profile Details section; if possible verify student with password
* Change Resume
    - Check if the resume exists, if already exists, then display this form section
    - After upload, then implement the change resume logic
* Change Password logic - check if the current password matches with the database, and the new password must be different from current one
-->
<template>
    <q-page>
        <div class="q-pa-md">
            <q-card>
                <q-card-section>
                    <div class="text-h5">Edit Student Profile</div>
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
                                        <q-input v-model="student_id" label="Student ID" :rules="[requiredRule, studentIdRule]" disable/>
                                        <q-input v-model="icNo" label="IC Number" :rules="[requiredRule, icNumberRule]"/>
                                        <q-select v-model="gender" :options="genders" label="Gender" :rules="[requiredRule]" />
                                        <q-select v-model="programme" :options="programmes" label="Programme" :rules="[requiredRule]"/>
                                        <q-select v-model="faculty" :options="faculties" label="Faculty" :rules="[requiredRule]"/>
                                        <q-input v-model="studentEmail" label="Student Email" :rules="[requiredRule, studentEmailRule]"/>
                                        <q-input v-model="personalEmail" label="Personal Email" :rules="[requiredRule, nonStudentEmailRule, personalEmailRule]"/>
                                        <br/>
                                        <!-- Set the button to enable only when a change is made -->
                                        <q-btn label="Save Changes" color="primary" type="submit" :disable="!changesMade" />
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
                                        <q-file filled bottom-slots v-model="resumeInput" label="Upload New Resume" counter accept=".pdf">
                                            <template v-slot:prepend>
                                                <q-icon name="cloud_upload" @click.stop.prevent />
                                            </template>
                                            <template v-slot:append>
                                                <q-icon name="close" @click.stop.prevent="resumeInput = null" class="cursor-pointer"/>
                                            </template>

                                            <template v-slot:hint>
                                                must be in pdf
                                            </template>
                                        </q-file>
                                        <br/>
                                        <q-btn label="Upload Resume" color="primary" type="submit" />
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
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { allGenders, allProgrammes, allFaculty } from 'src/consts/student'
import { useMeta, Notify, useQuasar } from 'quasar';
import { useStore } from 'src/stores/user-store';
import { api } from 'src/boot/axios';
import { isTextEmpty } from 'src/common';
import { useLocalStorageStore } from 'src/stores/localstorage-store';

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

// Change Resume Section
const resumeInput = ref(null);

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
const router = useRouter();
const store = useStore();
const lsStore = useLocalStorageStore();
const { dialog } = useQuasar();

// trackers
const profileUpdated = ref(false);
const initialFormData = ref({
  student_name: '',
  student_id: '',
  icNo: '',
  gender: '',
  programme: '',
  studentEmail: '',
  personalEmail: '',
  faculty: '',
});
const changesMade = computed(() => {
    const formData = {
        student_name: student_name.value,
        student_id: student_id.value,
        icNo: icNo.value,
        gender: gender.value,
        programme: programme.value,
        studentEmail: studentEmail.value,
        personalEmail: personalEmail.value,
        faculty: faculty.value,
    };

    return JSON.stringify(formData) !== JSON.stringify(initialFormData.value);
})
const updatingResume = ref(false);

async function fetchStudentProfile() {
    try {
        const studentId = lsStore.getUsername();
        const resp = await api.get(`/user/get-student-profile/${studentId}`);
        console.log('API Response:', resp); // Log the response

        // Populate initialFormData
        initialFormData.value = {
            student_name: resp.data.student_name,
            student_id: resp.data.student_id,
            icNo: resp.data.ic_no,
            gender: resp.data.gender,
            programme: resp.data.programme,
            studentEmail: resp.data.student_email,
            personalEmail: resp.data.personal_email,
            faculty: resp.data.faculty,
        }
  
        // Populate the basic profile form fields with fetched data
        student_name.value = resp.data.student_name;
        student_id.value = resp.data.student_id;
        existing_password.value = resp.data.password;
        icNo.value = resp.data.ic_no;
        studentEmail.value = resp.data.student_email;
        personalEmail.value = resp.data.personal_email;
        faculty.value = resp.data.faculty;
        programme.value = resp.data.programme;
        gender.value = resp.data.gender;
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

const updateProfile = () => {
    // show confirmation message for updating basic profile
    dialog({
        title: 'Confirm Profile Update',
        message: 'Are you sure you want to save changes to your profile?',
        cancel: { icon: 'close', label: 'Cancel', color: 'negative', flat: true },
        ok: { icon: 'update', label: 'Save Changes', color: 'primary' },
    }).onOk(async() => {
        try {
            await store.updateStudProfile({
                student_id: student_id.value,
                student_name: student_name.value,
                password: '',
                ic_no: icNo.value,
                gender: gender.value,
                programme: programme.value,
                student_email: studentEmail.value,
                personal_email: personalEmail.value,
                faculty: faculty.value,
            })

            // set profileUpdated to true after a successful update
            profileUpdated.value = true;

            // Show a successful message
            Notify.create('Profile updated successfully');
        } catch (error) {
            console.error('Error updating profile:', error);

            // Show an error message here
            Notify.create({
                message: 'Failed to update profile',
                color: 'negative',
            });
        }
    })
};

const updatePassword = () => {
    dialog({
        title: 'Confirm Password Update',
        message: 'Are you sure you want to change password?',
        cancel: { icon: 'close', label: 'Cancel', color: 'negative', flat: true },
        ok: { icon: 'update', label: 'Change Password', color: 'primary' },
    }).onOk(async() => {
        try {
            await store.updateStudPassword({
                student_id: student_id.value,
                current_password: newPassword.value,
                new_password: newPassword.value,
            })
        } catch (error) {
            console.error('Error updating password:', error);

            Notify.create({
                message: 'Failed to update password',
                color: 'negative',
            })
        }
    })
};

const updateResume = () => {
    dialog({
        title: 'Confirm Resume Update',
        message: 'Are you sure you want to update your resume?',
        cancel: { icon: 'close', label: 'Cancel', color: 'negative', flat: true },
        ok: { icon: 'update', label: 'Update Resume', color: 'primary' },
    }).onOk(async() => {
        const fileInput = resumeInput!.value; // Access the file input using the ref
        if (!fileInput) {
            // No file selected
            console.error('No file selected.');
            return;
        }

        const resumeFile = fileInput[0]; // Get the selected file
        
        try {
            // Call the updateResume store function and pass the file
            await store.updateResume(resumeFile);

            Notify.create('Resume updated successfully');
        } catch (error) {
            console.error('Error uploading resume:', error);

            // Show an error message here
            Notify.create({
                message: 'Failed to upload resume',
                color: 'negative',
            });
        }
    });
};

const executeUpdatePassword = async () => {
    // Implement logic to update the password here
    router.push('/profile')
}
</script>