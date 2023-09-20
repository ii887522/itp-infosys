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
                  <img :src="currentAvatar || 'https://via.placeholder.com/100'" alt="Profile Picture" />
                </q-avatar>

                <q-dialog v-model="editMode" persistent>
                  <q-card>
                    <q-card-section class="row items-center q-pb-none">
                      <div class="text-h6">Edit Avatar</div>
                      <q-space />
                      <q-btn icon="close" flat round dense v-close-popup @click="cancelEdit" />
                    </q-card-section>

                    <q-card-section>
                      <!-- avatar preview -->
                      <q-avatar size="100px" color="primary" class="center-contents">
                        <img :src="editedImage || 'https://via.placeholder.com/100'" />
                      </q-avatar>
                      <br/>
                      <!-- file upload -->
                      <q-file filled bottom-slots v-model="inputImage" label="Upload Avatar" counter accept="image/*" @update:model-value="handleImageChange">
                        <template v-slot:prepend>
                          <q-icon name="cloud_upload" @click.stop.prevent />
                        </template>
                        <template v-slot:append>
                          <q-icon name="close" @click.stop.prevent="editedImage = '', inputImage = null" class="cursor-pointer"/>
                        </template>
                      </q-file>
                    </q-card-section>

                    <q-card-actions align="right">
                      <q-btn label="Save Changes" color="primary" @click="saveAvatar" />
                      <q-btn label="Cancel" color="negative" @click="cancelEdit" />
                    </q-card-actions>
                  </q-card>
                </q-dialog>

                <div class="q-ml-md" style="text-align:center;"> <!-- Add margin to the left for spacing -->
                  <!-- edit icon -->
                  <q-icon v-if="!editMode" name="edit" class="edit-icon" @click="editAvatar" />

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
import { Notify, useMeta, useQuasar } from 'quasar';
import { useStore } from 'src/stores/user-store';
import { api } from 'src/boot/axios';
import { useLocalStorageStore } from 'src/stores/localstorage-store';
import { formatTime } from 'src/common';

useMeta({ title: 'Student Profile | MyITPHub' })

// avatar
const editMode = ref(false);
const inputImage = ref(null); // image in the q-file
const editedImage = ref(''); // image in the avatar preview
const currentAvatar = ref(''); // for default display in the profile page

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
const { dialog } = useQuasar();
const lsStore = useLocalStorageStore();
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

async function fetchStudentProfile() {
  try {
    const studentId = lsStore.getUsername();
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
    supervisor_assigned_at.value = formatTime(resp.data?.supervisor_assigned_at, 'D/M/YYYY h:mm A');
    company_name.value = resp.data?.company_name;
    supervisor_name.value = resp.data?.supervisor_name;
    itp_start_at.value = formatTime(resp.data?.itp_start_at, 'D/M/YYYY h:mm A');
    itp_end_at.value = formatTime(resp.data?.itp_end_at, 'D/M/YYYY h:mm A');
  } catch (error) {
    console.error('Error fetching student profile:', error);
  }
}

onMounted(async () => {
  // fetch student profile details
  fetchStudentProfile();

  // loading
  setTimeout(() => {
    loading.value = false;
  }, 1000);

  await getAvatar();
})

const getAvatar = async () => {
  try {
    const user_type = lsStore.getAuthUserType();
    const username = lsStore.getUsername();
    const resp = await api.get(`/user/get-avatar/${user_type}/${username}`);
    console.log(resp.data)
    if (resp.data && resp.data.avatarUrl) {
      currentAvatar.value = resp.data.avatarUrl;
    } else {
      console.error('Avatar URL not found in the response.');
    }
  } catch (error) {
    console.error('Error fetching avatar URL:', error);
  }
}

const editAvatar = () => {
  editMode.value = true;
};

const viewResume = async () => {
  try {
    const studentId = lsStore.getUsername();
    const response = await api.get(`/user/get-resume-url/${studentId}`);

    if (response.data && response.data.resumeUrl) {
      // Open the resume in a new browser window or tab
      window.open(response.data.resumeUrl, '_blank');
    } else {
      console.error('Resume URL not found in the response.');
    }
  } catch (error) {
    console.error('Error fetching resume URL:', error);
  }
}

// function to get the input avatar to display as preview
const handleImageChange = () => {
  editedImage.value = URL.createObjectURL(inputImage.value as unknown as MediaSource);
}

const saveAvatar = () => {
  // Upload the edited image to the server and save it as the current avatar
  // This is where you would make an API call to save the image
  dialog({
    title: 'Confirm Update Avatar',
    message: 'Are you sure you want to update your avatar?',
    cancel: { icon: 'close', label: 'Cancel', color: 'negative', flat: true },
    ok: { icon: 'update', label: 'Upload Avatar', color: 'primary' },
  }).onOk(async() => {
    const avatarFile = inputImage.value as unknown as File;
    if (!avatarFile) {
      console.error('No file selected.');
      return;
    }
    const userType = lsStore.getAuthUserType() as string
    const studentId = lsStore.getUsername() as string

    try {
      await store.updateAvatar({
        user_type: userType,
        username: studentId,
        avatar: avatarFile,
      })

      Notify.create('Avatar updated successfully');
      editMode.value = false;
    } catch (error) {
      console.error('Error uploading avatar:', error);

      // Show an error message here
      Notify.create({
        message: 'Failed to upload avatar',
        color: 'negative',
      });
    }
  })
};

const cancelEdit = () => {
  // Reset the edited image and exit edit mode
  editedImage.value = '';
  inputImage.value = null;
  editMode.value = false;
};

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
