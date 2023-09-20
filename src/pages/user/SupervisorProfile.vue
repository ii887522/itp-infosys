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

                        <div class="q-ml-md" style="text-align:center;">
                          <!-- edit icon -->
                          <q-icon v-if="!editMode" name="edit" class="edit-icon" @click="editAvatar" />

                          <!-- align center, supervisor name -->
                          {{ supervisorName }}
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
import { Notify, useMeta, useQuasar } from 'quasar';
import { api } from 'src/boot/axios';
import { useLocalStorageStore } from 'src/stores/localstorage-store';
import { useStore } from 'src/stores/user-store';
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';

useMeta({ title: 'Supervisor Profile | MyITPHub' })

// avatar
const editMode = ref(false);
const inputImage = ref(null); // image in the q-file
const editedImage = ref(''); // image in the avatar preview
const currentAvatar = ref(''); // for default display in the profile page

const loading = ref(true);
const { dialog } = useQuasar();
const store = useStore();
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

onMounted(async () => {
    fetchSupervisorProfile();

    setTimeout(() => {
        loading.value = false;
    }, 1000);

    await getAvatar();
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
        console.error('Error fetching supervisor profile:', error)
    }
}

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
