<template>
    <q-page>
      <div class="q-pa-md">
        <q-card>
          <q-card-section>
            <div class="text-h5">Student Profile</div>
          </q-card-section>
          <q-card-section>
            <q-avatar size="100px" color="primary">
              <img src="https://via.placeholder.com/100" alt="Profile Picture" />
            </q-avatar>
          </q-card-section>
          <q-card-section>
            <div><strong>Name:</strong> {{ studentName }}</div>
            <div><strong>Student ID:</strong> {{ studentId }}</div>
            <div><strong>Email:</strong> {{ studentEmail }}</div>
            <div><strong>Programme:</strong> {{ programme }}</div>
            <div><strong>Gender:</strong> {{ gender }}</div>
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
  
  const studentName = ref('John Doe');
  const studentId = ref('22WMR00111');
  const studentEmail = ref('john.doe@student.tarc.edu.my');
  const programme = ref('Computer Science');
  const gender = ref('Male');
  const router = useRouter();
  
  const editProfile = () => {
    // Redirect to the edit profile page
    router.push('/edit-profile');
  };

  // view resume
  </script>