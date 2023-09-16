<template>
  <q-btn-dropdown class="row items-center" unelevated color="primary" square dense>
    <template #label>
      <div class="text-left q-ml-xs" style="width: 192px">
        <q-icon class="float-left" name="face" left size="xl" />
        <span>Welcome</span>

        <div class="text-overflow-ellipsis">
          <span>{{ userName }}</span>
          <q-tooltip>{{ userName }}</q-tooltip>
        </div>
      </div>
    </template>

    <q-list dense>
      <q-item class="text-negative" clickable v-close-popup @click="confirmLogOut">
        <q-item-section avatar>
          <q-avatar icon="logout" />
        </q-item-section>

        <q-item-section>
          <q-item-label>Logout</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-btn-dropdown>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useQuasar } from 'quasar'
import { useStore } from 'src/stores/user-store'
import { useRouter } from 'vue-router'
import { api } from 'boot/axios'

const store = useStore()
const router = useRouter()
const { dialog, localStorage } = useQuasar()

const userName = ref('')

// Init
setTimeout(async () => {
  const resp = await api.get(`/user/users/${localStorage.getItem('authUserType')}/${localStorage.getItem('username')}`)
  userName.value = resp.data.result
}, 2000)

const confirmLogOut = () => {
  dialog({
    title: 'Confirm Logout',
    message: 'Are you sure you want to logout?',
    cancel: { icon: 'close', label: 'Cancel', color: 'negative', flat: true },
    ok: { icon: 'logout', label: 'Logout', color: 'primary' },
  }).onOk(() => {
    executeLogOut()
  })
  /* Dialog.create({
    title: 'Confirm Logout',
    message: 'Are you sure you want to logout?',
    cancel: {
      label: 'Cancel',
      color: 'negative',
    },
    ok: {
      label: 'Logout',
      color: 'primary',
      push: true,
      onClick: () => {
        console.log('Executing Logout function...');
        executeLogOut();
      }
    }
  }) */
}

const executeLogOut = () => {
  store.logOut()
  router.push('/login')
}
</script>
