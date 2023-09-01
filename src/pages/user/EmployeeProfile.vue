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
            <div><strong>Employee Name:</strong> {{ employeeName }}</div>
            <div><strong>Employee Role:</strong> {{ employeeRole }}</div>
            <div><strong>Company Name:</strong> {{ companyName }}</div>
            <div><strong>Employee Email:</strong> {{ employeeEmail }}</div>
            <div><strong>Employee Phone:</strong> {{ employeePhone }}</div>
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
  
const employeeName = ref('John Doe')
const employeeRole = ref('Software Engineer')
const companyName = ref('EMP12345')
const employeeEmail = ref('john.doe@example.com')
const employeePhone = ref('+1 123-456-7890')
  const router = useRouter();
  
  const editProfile = () => {
    // Redirect to the edit profile page
    router.push('/edit-profile');
  };
  </script>  