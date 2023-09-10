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
            <div class="q-ml-md"> <!-- Add margin to the left for spacing -->
              <!-- align center, student name and student ID -->
              <!-- align right, view resume button -->
              <q-btn label="View Resume" color="primary" @click="viewResume"/>
            </div>
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
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useMeta } from 'quasar';
import { useStore } from 'src/stores/user-store';
import { api } from 'src/boot/axios';

useMeta({ title: 'Student Profile | MyITPHub' })

// get profile from the database
const studentName = ref('');
const student_id = ref('');
const icNo = ref('');
const gender = ref('');
const programme = ref('');
const studentEmail = ref('');
const personalEmail = ref('');
const router = useRouter();
const store = useStore();

const profileRows = computed(() => [
  {
    icon: 'person',
    label: 'Student Name',
    value: studentName.value,
  },
  {
    icon: 'fingerprint',
    label: 'Student ID',
    value: student_id.value,
  },
  {
    icon: 'perm_identity',
    label: 'IC No',
    value: icNo.value,
  },
  {
    icon: 'email',
    label: 'Student Email',
    value: studentEmail.value,
  },
  {
    icon: 'email',
    label: 'Personal Email',
    value: personalEmail.value,
  },
  {
    icon: 'school',
    label: 'Programme',
    value: programme.value,
  },
  {
    icon: 'wc',
    label: 'Gender',
    value: gender.value,
  }
]) 

async function fetchStudentProfile() {
  try {
    const studentId = store.getUsername();
    const resp = await api.get(`/user/get-student-profile/${studentId}`);
    console.log('API Response:', resp); // Log the response
  
    // Check the structure of resp.data
    studentName.value = resp.data.student_name;
    student_id.value = resp.data.student_id;
    icNo.value = resp.data.ic_no;
    studentEmail.value = resp.data.student_email;
    personalEmail.value = resp.data.personal_email;
    programme.value = resp.data.programme;
    gender.value = resp.data.gender;
    console.log(studentName.value);
  } catch (error) {
    console.error('Error fetching student profile:', error);
  }
}

onMounted(() => {
  fetchStudentProfile();
  //profileRows.values() = initProfileRows();
})

const viewResume = () => {
  // get the resume, this router push is temporary
  router.push('');
}
  
const editProfile = () => {
  // Redirect to the edit profile page
  router.push('/stud/profile/edit');
};

// view resume
</script>