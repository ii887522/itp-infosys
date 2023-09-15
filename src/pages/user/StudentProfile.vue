<template>
    <q-page>
      <div class="q-pa-md">
        <q-card>
          <q-card-section>
            <div class="text-h5">Student Profile</div>
          </q-card-section>
          <q-card-section>
            <q-linear-progress v-if="loading" color="primary" indeterminate />

            <div v-else>
              <q-card-section>
                <q-avatar size="100px" color="primary" class="center-contents">
                  <img src="https://via.placeholder.com/100" alt="Profile Picture" />
                </q-avatar>
                <div class="q-ml-md" style="text-align:center;"> <!-- Add margin to the left for spacing -->
                  <!-- align center, student name and student ID -->
                  <p>{{ studentName }}</p>
                  <p>{{ student_id }}</p>
                  <q-btn label="View Resume" color="primary" @click="viewResume"/>
                </div>
              </q-card-section>

              <!-- Basic profile details -->
              <q-card-section>
                <q-expansion-item default-opened icon="account_circle" label="General Profile" header-class="bg-blue text-white">
                  <q-separator/>
                  <q-card class="bg-blue-1">
                    <q-card-section>
                      <q-table :rows="profileRows" row-ley="field" :rows-per-page-options="[profileRows.length]">
                        <template v-slot:body="props">
                          <q-tr :props="props">
                            <q-td auto-width><q-icon :name="props.row.icon" class="larger-icon"/></q-td>
                            <q-td>{{ props.row.label }}</q-td>
                            <q-td>{{ props.row.value }}</q-td>
                          </q-tr>
                        </template>
                      </q-table>
                    </q-card-section>
                  </q-card>
                </q-expansion-item>
              </q-card-section>

              <!-- Student internship details -->
              <q-card-section v-if="internDataAvailable">
                <q-expansion-item popup icon="description" label="Internship Details">
                  <q-separator/>
                  <q-card>
                    <q-card-section>
                      <q-table :rows="internRows" row-ley="field" :rows-per-page-options="[internRows.length]">
                        <template v-slot:body="props">
                          <q-tr :props="props">
                            <q-td auto-width><q-icon :name="props.row.icon" class="larger-icon"/></q-td>
                            <q-td>{{ props.row.label }}</q-td>
                            <q-td>{{ props.row.value }}</q-td>
                          </q-tr>
                        </template>
                      </q-table>
                    </q-card-section>
                  </q-card>
                </q-expansion-item>
              </q-card-section>

              <!-- Edit profile button -->
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
import { useStore } from 'src/stores/user-store';
import { api } from 'src/boot/axios';

useMeta({ title: 'Student Profile | MyITPHub' })

// basic profile
const studentName = ref('');
const student_id = ref('');
const icNo = ref('');
const gender = ref('');
const faculty = ref('');
const programme = ref('');
const studentEmail = ref('');
const personalEmail = ref('');

// internship details
const supervisor_assigned_at = ref('');
const company_name = ref('');
const supervisor_name = ref('');
const itp_start_at = ref('');
const itp_end_at = ref('');

// utilties
const router = useRouter();
const store = useStore();
const loading = ref(true);
const internDataAvailable = ref(true);

// table rows
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
    icon: 'corporate_fare',
    label: 'Faculty',
    value: faculty.value,
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

const internRows = computed(() => [
  {
    icon: 'task',
    label: 'Supervisor Assigned At',
    value: supervisor_assigned_at.value,
  },
  {
    icon: 'business',
    label: 'Company Name',
    value: company_name.value,
  },
  {
    icon: 'supervised_user_circle',
    label: 'Supervisor Name',
    value: supervisor_name.value,
  },
  {
    icon: 'schedule',
    label: 'ITP Start At',
    value: itp_start_at.value,
  },
  {
    icon: 'done_all',
    label: 'ITP End At',
    value: itp_end_at.value,
  },
])

// add faculty

async function fetchStudentProfile() {
  try {
    const studentId = store.getUsername();
    const resp = await api.get(`/user/get-student-profile/${studentId}`);
    console.log('API Response:', resp); // Log the response
  
    // Fetch the basic profile details from student table
    studentName.value = resp.data.student_name;
    student_id.value = resp.data.student_id;
    icNo.value = resp.data.ic_no;
    studentEmail.value = resp.data.student_email;
    personalEmail.value = resp.data.personal_email;
    faculty.value = resp.data.faculty;
    programme.value = resp.data.programme;
    gender.value = resp.data.gender;

    // Optional: assign if found data in student intern table
    supervisor_assigned_at.value = resp.data?.supervisor_assigned_at;
    company_name.value = resp.data?.company_name;
    supervisor_name.value = resp.data?.supervisor_name;
    itp_start_at.value = resp.data?.itp_start_at;
    itp_end_at.value = resp.data?.itp_end_at;
  } catch (error) {
    console.error('Error fetching student profile:', error);
  }
}

onMounted(() => {
  // fetch student profile details
  fetchStudentProfile();

  // loading
  setTimeout(() => {
    loading.value = false;
  }, 1000);
})

const viewResume = async () => {
  try {
    const studentId = store.getUsername();
    const response = await api.get(`/user/get-resume-url/${studentId}`);

  }
  // get the resume, this router push is temporary
  router.push('');
}
  
const editProfile = () => {
  // Redirect to the edit profile page
  router.push('/stud/profile/edit');
};

// view resume - implement logic
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