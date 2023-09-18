<template>
    <q-page>
        <div class="q-pa-md">
            <q-card>
                <q-card-section>
                    <div class="text-h5">Edit Admin Profile</div>
                </q-card-section>
                <q-card-section>
                    <q-linear-progress v-if="loading" color="primary" indeterminate />

                    <div v-else>
                        <q-form @submit="updateProfile">
                            <q-expansion-item default-opened icon="account_circle" label="Edit Profile Details" header-class="bg-blue text-white">
                                <q-separator/>
                                <q-card class="bg-blue-1">
                                    <q-card-section>
                                        <q-input filled v-model="adminUsername" label="Username" dense class="input-field" :rules="[requiredRule]"/>
                                        <q-input filled v-model="adminEmail" label="Email" dense class="input-field" :rules="[requiredRule]"/>
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
import { Notify, useMeta, useQuasar } from 'quasar';
import { api } from 'src/boot/axios';
import { isTextEmpty } from 'src/common';
import { useLocalStorageStore } from 'src/stores/localstorage-store';
import { useStore } from 'src/stores/user-store';
import { ref, onMounted, computed } from 'vue';

useMeta({ title: 'Editing Admin Profile | MyITPHub' })

const ori_adminUsername = ref('');
const adminUsername = ref('');
const adminEmail = ref('');

const currentPassword = ref('');
const newPassword = ref('');
const confirmNewPassword = ref('');

const loading = ref(true)
const { dialog } = useQuasar();
const store = useStore();
const lsStore = useLocalStorageStore();

const requiredRule = (value: string) => !isTextEmpty(value) || 'This field is required';
const passwordRule = (value: string) => value.length >= 8 || 'Password must be at least 8 characters';
const confirmPasswordRule = (value: string) => value === newPassword.value || 'Passwords do not match';
const initialFormData = ref({
    admin_username: '',
    admin_email: '',
});
const changesMade = computed(() => {
    const formData = {
        admin_username: adminUsername.value,
        admin_email: adminEmail.value,
    };

    return JSON.stringify(formData) !== JSON.stringify(initialFormData.value);
})

onMounted(() => {
    fetchAdminProfile()
    setTimeout(() => {
        loading.value = false;
    }, 1000); // 1000 milliseconds = 1 second
});

async function fetchAdminProfile() {
    try {
        const admUsername = lsStore.getUsername();
        const resp = await api.get(`/user/get-admin-profile/${admUsername}`);

        ori_adminUsername.value = resp.data.admin_username
        adminUsername.value = resp.data.admin_username
        adminEmail.value = resp.data.admin_email
    } catch (error) {
        console.error('Error fetching admin profile:', error)
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
            /* await store.updateSupProfile({
                ori_supervisor_id: ori_supervisorId.value,
                supervisor_id: supervisorId.value,
                supervisor_name: supervisorName.value,
                gender: gender.value,
                faculty: faculty.value,
                supervisor_email: supervisorEmail.value,
            }) */

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
}

const updatePassword = () => {
    dialog({
        title: 'Confirm Password Update',
        message: 'Are you sure you want to change password?',
        cancel: { icon: 'close', label: 'Cancel', color: 'negative', flat: true },
        ok: { icon: 'update', label: 'Save Changes', color: 'primary' },
    }).onOk(async() => {
        try {
            /* await store.updateSupPassword({
                supervisor_id: supervisorId.value,
                current_password: currentPassword.value,
                new_password: newPassword.value,
            }) */

            Notify.create('Password updated successfully');
        } catch (error) {
            console.error('Error updating password:', error);

            Notify.create({
                message: 'Failed to update password',
                color: 'negative',
            })
        }
    })
}
</script>