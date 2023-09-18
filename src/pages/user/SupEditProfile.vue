<template>
    <q-page>
        <div class="q-pa-md">
            <q-card>
                <q-card-section>
                    <div class="text-h5">Edit Supervisor Profile</div>
                </q-card-section>
                <q-card-section>
                    <q-linear-progress v-if="loading" color="primary" indeterminate />

                    <div v-else>
                        <q-form @submit="updateProfile">
                            <q-expansion-item default-opened icon="account_circle" label="Edit Profile Details" header-class="bg-blue text-white">
                                <q-separator/>
                                <q-card class="bg-blue-1">
                                    <q-card-section>
                                        <q-input filled v-model="supervisorId" label="Supervisor ID" dense class="input-field" :rules="[requiredRule]"/>
                                        <q-input filled v-model="supervisorName" label="Supervisor Name" dense class="input-field" :rules="[requiredRule]"/>
                                        <q-select filled v-model="gender" :options="genders" label="Gender" dense class="input-field" :rules="[requiredRule]" />
                                        <q-select filled v-model="faculty" :options="faculties" label="Faculty" dense class="input-field" :rules="[requiredRule]" />
                                        <q-input filled v-model="supervisorEmail" label="Supervisor Email" dense class="input-field" :rules="[requiredRule]"/>
                                        <br/>
                                        <q-btn label="Save Changes" color="primary" type="submit" :disable="!changesMade" />
                                    </q-card-section>
                                </q-card>
                            </q-expansion-item>
                        </q-form>

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
import { useQuasar } from 'quasar';
import { isTextEmpty } from 'src/common';
import { allFaculty, allGenders } from 'src/consts/student';
import { ref, onMounted, computed } from 'vue';

const supervisorId = ref('')
const supervisorName = ref('')
const gender = ref([])
const faculty = ref([])
const supervisorEmail = ref('')

const currentPassword = ref('');
const newPassword = ref('');
const confirmNewPassword = ref('');
const existing_password = ref(''); // to compare with the input current password

const loading = ref(true)
const genders = allGenders
const faculties = allFaculty
const { dialog } = useQuasar();

const requiredRule = (value: string) => !isTextEmpty(value) || 'This field is required';
const passwordRule = (value: string) => value.length >= 8 || 'Password must be at least 8 characters';
const confirmPasswordRule = (value: string) => value === newPassword.value || 'Passwords do not match';
const initialFormData = ref({
    supervisor_id: '',
    supervisor_name: '',
    gender: [],
    faculty: [],
    supervisor_email: '',
});
const changesMade = computed(() => {
    const formData = {
        supervisor_id: supervisorId.value,
        supervisor_name: supervisorName.value,
        gender: gender.value,
        faculty: faculty.value,
        supervisor_email: supervisorEmail.value,
    };

    return JSON.stringify(formData) !== JSON.stringify(initialFormData.value);
})

onMounted(() => {
    //fetchStudentProfile();
    setTimeout(() => {
        loading.value = false;
    }, 1000); // 1000 milliseconds = 1 second
});

const updateProfile = () => {
    dialog({
        title: 'Confirm Profile Update',
        message: 'Are you sure you want to save changes to your profile?',
        cancel: { icon: 'close', label: 'Cancel', color: 'negative', flat: true },
        ok: { icon: 'update', label: 'Save Changes', color: 'primary' },
    })
}

const updatePassword = () => {
    dialog({
        title: 'Confirm Password Update',
        message: 'Are you sure you want to change password?',
        cancel: { icon: 'close', label: 'Cancel', color: 'negative', flat: true },
        ok: { icon: 'update', label: 'Save Changes', color: 'primary' },
    })
}
</script>