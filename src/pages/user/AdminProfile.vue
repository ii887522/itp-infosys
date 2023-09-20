<template>
    <q-page>
        <div class="q-pa-md">
            <q-card>
                <q-card-section>
                    <div class="text-h5">Admin Profile</div>
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
                                  <q-btn icon="close" flat round dense v-close-popup @click="cancelEdit"/>
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
                            <div class="q-pad-md" style="text-align:center;">
                              <!-- edit icon -->
                              <q-icon v-if="!editMode" name="edit" class="edit-icon" @click="editAvatar" />
                              
                              <!-- align center, admin username -->
                              <p>{{ adminUsername }}</p>
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
import { useMeta, useQuasar, Notify } from 'quasar';
import { api } from 'src/boot/axios';
import { useLocalStorageStore } from 'src/stores/localstorage-store';
import { useStore } from 'src/stores/user-store';
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';

useMeta({ title: 'Admin Profile | MyITPHub' })

// avatar
const editMode = ref(false);
const inputImage = ref(null); // image in the q-file
const editedImage = ref(''); // image in the avatar preview
const currentAvatar = ref(''); // for default display in the profile page

const adminUsername = ref('')
const adminEmail = ref('')

const store = useStore();
const { dialog } = useQuasar();
const loading = ref(true);
const lsStore = useLocalStorageStore();
const router = useRouter();

const profileRows = computed(() => [
    {
        icon: 'person',
        label: 'Admin Username',
        value: adminUsername.value,
    },
    {
        icon: 'email',
        label: 'Admin Email',
        value: adminEmail.value,
    },
])

async function fetchAdminProfile() {
    try {
        const admin_username = lsStore.getUsername()
        const resp = await api.get(`/user/get-admin-profile/${admin_username}`)

        adminUsername.value = resp.data.admin_username
        adminEmail.value = resp.data.admin_email
    } catch (error) {
        console.error('Error fetching admin profile:', error);
    }
}

onMounted(async () => {
    fetchAdminProfile()

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
    router.push('/admin/profile/edit')
}
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
