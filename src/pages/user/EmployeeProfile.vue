<template>
  <q-page>
    <div class="q-pa-md">
      <q-card>
        <q-card-section>
          <div class="text-h5">Employee Profile</div>
        </q-card-section>
        <q-card-section>
          <q-avatar size="100px" color="primary">
            <img src="https://via.placeholder.com/100" alt="Profile Picture" />
          </q-avatar>
        </q-card-section>
        <q-card-section>
          <q-table :rows="profileRows" row-key="field"  :rows-per-page-options="[profileRows.length]">
            <template v-slot:body="props">
              <q-tr :props="props">
                <q-td auto-width>
                  <q-icon :name="props.row.icon"/>
                </q-td>
                <q-td>{{ props.row.label }}</q-td>
                <q-td>{{ props.row.value }}</q-td>
              </q-tr>
            </template>
          </q-table>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn
            label="Edit Profile"
            color="primary"
            @click="editProfile"
          />
        </q-card-actions>
      </q-card>
    </div>
  </q-page>
</template>
  
<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useMeta } from 'quasar';

useMeta({ title: 'Employee Profile | MyITPHub' })
  
// get profile from the database
const employeeName = ref('John Doe')
const employeeRole = ref('Software Engineer')
const companyName = ref('Lorem Ipsum Sdn. Bhd.')
const employeeEmail = ref('john.doe@example.com')
const employeePhone = ref('+1 123-456-7890')
const router = useRouter();

const profileRows = ref([
  {
    icon: 'person',
    label: 'Employee Name',
    value: employeeName,
  },
  {
    icon: 'work',
    label: 'Employee Role',
    value: employeeRole,
  },
  {
    icon: 'business',
    label: 'Company Name',
    value: companyName,
  },
  {
    icon: 'email',
    label: 'Employee Email',
    value: employeeEmail,
  },
  {
    icon: 'phone',
    label: 'Employee Phone',
    value: employeePhone,
  }
])

const editProfile = () => {
  // Redirect to the edit profile page
  router.push('/emp/profile/edit');
};
</script>