<template>
    <q-page>
        <div class="q-pa-md">
            <q-card-section>
                <div class="text-h5">Supervisor Profile</div>
            </q-card-section>
            <q-card-section>
                <q-linear-progress v-if="loading" color="primary" indeterminate/>
                <div v-else>
                    <q-card-section>
                        <q-avatar size="100px" color="primary" class="center-contents">
                            <img src="https://via.placeholder.com/100" alt="Profile Picture" />
                        </q-avatar>
                        <div class="q-ml-md" style="text-align:center;">
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
        </div>
    </q-page>
</template>

<script setup lang="ts">
import { useMeta } from 'quasar';
import { api } from 'src/boot/axios';
import { useLocalStorageStore } from 'src/stores/localstorage-store';
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';

useMeta({ title: 'Employee Profile | MyITPHub' })

const loading = ref(true);
const lsStore = useLocalStorageStore(); // get username = Supervisor ID
const router = useRouter();

const supervisorId = ref('');
const supervisorName = ref('');
const gender = ref('');
const faculty = ref('');
const supervisorEmail = ref('');

const profileRows = computed(() => [
    {
        icon: 'fingerprint',
        label: 'Supervisor ID',
        value: supervisorId.value,
    },
    {
        icon: 'person',
        label: 'Supervisor Name',
        value: supervisorName.value,
    },
    {
        icon: 'wc',
        label: 'Gender',
        value: gender.value,
    },
    {
        icon: 'corporate_fare',
        label: 'Faculty',
        value: faculty.value,
    },
    {
        icon: 'email',
        label: 'Supervisor Email',
        value: supervisorEmail.value,
    },
])

onMounted(() => {
    fetchSupervisorProfile();
    
    setTimeout(() => {
        loading.value = false;
    }, 1000);
})

async function fetchSupervisorProfile() {
    try {
        const supervisor_id = lsStore.getUsername()
        const resp = await api.get(`/user/get-supervisor-profile/${supervisor_id}`)
        console.log('API Response:', resp);

        supervisorId.value = resp.data.supervisor_id
        supervisorName.value = resp.data.supervisor_name
        gender.value = resp.data.gender
        faculty.value = resp.data.faculty
        supervisorEmail.value = resp.data.supervisor_email
    } catch (error) {
        console.error("Error fetching supervisor profile:", error)
    }
}

const editProfile = () => {
    // Redirect to the edit profile page
    router.push('/sup/profile/edit');
};
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