<template>
    <q-page>
        <div class="q-pa-md">
            <q-card>
                <q-card-section>
                    <div class="text-h5">Admin Profile</div>
                </q-card-section>
                <q-card-section>
                    <q-linear-progress v-if="loading" color="primary" indeterminate />
                    <div v-else>
                        <q-card-section>
                            <q-avatar size="100px" color="primary" class="center-contents">
                                <img src="https://via.placeholder.com/100" alt="Profile Picture" />
                            </q-avatar>
                            <div class="q-pad-md" style="text-align:center;">
                                <p>{{ adminUsername }}</p>
                            </div>
                        </q-card-section>

                        <q-card-section>
                            <q-table :rows="profileRows" row-key="field" :rows-per-page-options="[profileRows.length]">
                                <template v-slot:body="props">
                                    <q-tr :props="props">
                                        <q-td auto-width>
                                            <q-icon :name="props.row.icon" class="larger-icon"/>
                                        </q-td>
                                        <q-td>{{ props.row.label }}</q-td>
                                        <q-td>{{ props.row.value }}</q-td>
                                    </q-tr>
                                </template>
                            </q-table>
                        </q-card-section>

                        <q-card-actions align="right">
                            <q-btn label="Edit Profile" color="primary" @click="editProfile"/>
                        </q-card-actions>
                    </div>
                </q-card-section>
            </q-card>
        </div>
    </q-page>
</template>

<script setup lang="ts">
import { api } from 'src/boot/axios';
import { useLocalStorageStore } from 'src/stores/localstorage-store';
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';

const adminUsername = ref('')
const adminEmail = ref('')

const loading = ref(true);
const lsStore = useLocalStorageStore();
const router = useRouter();

const profileRows = computed(() => [
    {
        icon: 'person',
        label: 'Admin Username',
        value: adminUsername.value,
    },
    {
        icon: 'email',
        label: 'Admin Email',
        value: adminEmail.value,
    },
])

async function fetchAdminProfile() {
    try {
        const admin_username = lsStore.getUsername()
        const resp = await api.get(`/user/get-admin-profile/${admin_username}`)

        adminUsername.value = resp.data.admin_username
        adminEmail.value = resp.data.admin_email
    } catch (error) {
        console.error('Error fetching admin profile:', error);
    }
}

onMounted(() => {
    fetchAdminProfile()

    setTimeout(() => {
        loading.value = false;
    }, 1000);
})

const editProfile = () => {
    router.push('/admin/profile/edit')
}
</script>

<style scoped>
.larger-icon {
  font-size: 30px;
}

.center-contents {
  display: block;
  margin: 0 auto;
}
</style>