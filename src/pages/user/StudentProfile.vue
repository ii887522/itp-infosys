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
          <!-- align right, view resume button -->
          <q-card-section>
            <q-table :rows="profileRows" row-key="field" :rows-per-page-options="[profileRows.length]">
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

  useMeta({ title: 'Student Profile | MyITPHub' })
  
  // get profile from the database
  const studentName = ref('John Doe');
  const studentId = ref('22WMR00111');
  const icNo = ref('012345-67-8901');
  const gender = ref('Male');
  const programme = ref('RSW');
  const studentEmail = ref('john.doe@student.tarc.edu.my');
  const personalEmail = ref('johndoe@gmail.com');
  const router = useRouter();

  const profileRows = ref([
    {
      icon: 'person',
      label: 'Student Name',
      value: studentName,
    },
    {
      icon: 'fingerprint',
      label: 'Student ID',
      value: studentId,
    },
    {
      icon: 'perm_identity',
      label: 'IC No',
      value: icNo,
    },
    {
      icon: 'email',
      label: 'Student Email',
      value: studentEmail,
    },
    {
      icon: 'email',
      label: 'Personal Email',
      value: personalEmail,
    },
    {
      icon: 'school',
      label: 'Programme',
      value: programme,
    },
    {
      icon: 'wc',
      label: 'Gender',
      value: gender,
    }
  ])

  // view resume button, get the associated resume file
  /*
  const viewResume = () => {
    ...
  }
  */
  
  const editProfile = () => {
    // Redirect to the edit profile page
    router.push('/stud/profile/edit');
  };

  // view resume
</script>