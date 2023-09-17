<template>
  <q-page>
    <div class="q-pa-md">
      <q-card>
        <q-card-section>
          <div class="text-h5">Employee Profile</div>
        </q-card-section>
        <q-card-section>
          <q-linear-progress v-if="loading" color="primary" indeterminate />
          <div v-else>
            <q-card-section>
              <q-avatar size="100px" color="primary" class="center-contents">
                <img src="https://via.placeholder.com/100" alt="Profile Picture" />
              </q-avatar>
              <div class="q-ml-md" style="text-align:center;">
                <p>{{ employeeName }}</p>
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
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useMeta } from 'quasar';
import { useLocalStorageStore } from 'src/stores/localstorage-store';
import { api } from 'src/boot/axios';
import { useStore } from 'src/stores/user-store'

useMeta({ title: 'Employee Profile | MyITPHub' })
  
// get profile from the database
const employeeName = ref('')
const companyName = ref('')
const employeeEmail = ref('')
const employeePhone = ref('')

const router = useRouter();
const lsStore = useLocalStorageStore();
const store = useStore();
const loading = ref(true);

const profileRows = computed(() => [
  {
    icon: 'person',
    label: 'Employee Name',
    value: employeeName.value,
  },
  {
    icon: 'business',
    label: 'Company Name',
    value: companyName.value,
  },
  {
    icon: 'email',
    label: 'Employee Email',
    value: employeeEmail.value,
  },
  {
    icon: 'phone',
    label: 'Employee Phone',
    value: employeePhone.value,
  }
])

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

onMounted(() => {
  fetchEmployeeProfile();

  setTimeout(() => {
    loading.value = false;
  }, 1000);
})

const editProfile = () => {
  // Redirect to the edit profile page
  router.push('/emp/profile/edit');
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