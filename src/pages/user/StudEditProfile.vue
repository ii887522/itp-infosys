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
                                        <q-input v-model="studentName" label="Student Name"/>
                                        <q-input v-model="studentId" label="Student ID" />
                                        <q-input v-model="icNo" label="IC Number" />
                                        <q-select v-model="gender" :options="genders" label="Gender" />
                                        <q-select v-model="programme" :options="programmes" label="Programme" />
                                        <q-input v-model="studentEmail" label="Student Email" />
                                        <q-input v-model="personalEmail" label="Personal Email" />
                                        <br/>
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
                        <!-- Change Password Section -->
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
import { allGenders, allProgrammes } from 'src/consts/student'
import { useMeta } from 'quasar';

useMeta({ title: 'Editing Student Profile | MyITPHub' })

const loading = ref(true);
const model = ref(null);
const router = useRouter();

// Add an onMounted hook to set loading to false after 1 second
onMounted(() => {
  setTimeout(() => {
    loading.value = false;
  }, 1000); // 1000 milliseconds = 1 second
});

// Basic Form fields
const studentName = ref('');
const studentId = ref('');
const icNo = ref('');
const gender = ref('');
const programme = ref('');
const studentEmail = ref('');
const personalEmail = ref('');

const programmes = allProgrammes;
const genders = allGenders;

// Change Password Section
const currentPassword = ref('');
const newPassword = ref('');
const confirmNewPassword = ref('');

const updateProfile = async () => {
  // Implement logic to update the profile data
  router.push('/profile'); // Redirect to the profile page
};

const updateResume = async () => {
  // Implement logic to upload a new resume and update it
  router.push('/profile'); // Redirect to the profile page
};

const updatePassword = async () => {
  // Implement logic to update the password
  router.push('/profile'); // Redirect to the profile page
};
</script>