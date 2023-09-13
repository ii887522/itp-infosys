<template>
  <q-card>
    <q-card-section class="q-pa-none relative-position">
      <div class="row q-pa-sm bg-grey-2">
        <div class="col" style="padding-top: 2px">{{ value.student_name }}</div>

        <q-btn
          class="col-auto"
          icon="delete"
          color="negative"
          size="md"
          flat
          padding="none"
          rounded
          @click="openConfirmDelDialog"
        />
      </div>

      <q-separator />

      <div v-if="value.supervisor_assigned_at" class="row q-pa-sm bg-grey-2">
        <div class="col-6 q-px-sm text-right" style="border-right: 2px solid rgb(224, 224, 224)">
          <q-icon class="q-mr-xs" style="margin-bottom: 2px" name="calendar_month" size="xs" />
          <span>{{ formatTime(value.supervisor_assigned_at, 'D/M/YYYY') }}</span>
        </div>

        <div class="col-6 q-px-sm">
          <q-icon class="q-mr-xs" style="margin-bottom: 2px" name="schedule" size="xs" />
          <span>{{ formatTime(value.supervisor_assigned_at, 'h:mm A') }}</span>
        </div>
      </div>

      <q-expansion-item
        class="absolute full-width"
        style="z-index: 1"
        header-class="bg-primary text-white"
        label="More details"
        switch-toggle-side
        dense
      >
        <div class="q-pa-sm bg-white" style="border: 2px solid rgb(192, 192, 192)">
          <div class="q-pa-md bg-grey-3">
            <div class="text-bold text-caption">SUPERVISOR</div>
            <q-separator />
            <div class="q-mb-md">{{ value.supervisor_name }}</div>
            <div class="row text-bold text-caption">INTERNSHIP DATE START</div>
            <q-separator />
            <div v-if="value.itp_start_at">{{ formatTime(value.itp_start_at, 'D/M/YYYY') }}</div>
            <div class="row text-bold text-caption q-mt-md">INTERNSHIP DATE END</div>
            <q-separator />
            <div v-if="value.itp_end_at">{{ formatTime(value.itp_end_at, 'D/M/YYYY') }}</div>
            <div class="row text-bold text-caption q-mt-md">STUDENT ID</div>
            <q-separator />
            <div>{{ value.student_id }}</div>
          </div>
        </div>
      </q-expansion-item>

      <div class="q-pa-md q-mt-lg">
        <div class="text-bold text-caption q-mt-sm">FACULTY</div>
        <q-separator />
        <div class="q-mb-md">{{ value.faculty }}</div>

        <div class="text-bold text-caption">LOCATION</div>
        <q-separator />

        <div class="q-mb-md">
          <a :href="`https://www.google.com/maps/dir/?api=1&destination=${value.location}`" target="_blank">
            {{ value.location }}
          </a>
        </div>

        <div class="text-bold text-caption">COMPANY</div>
        <q-separator />
        <div>{{ value.company_name }}</div>
      </div>

      <div class="bg-grey-2" style="border-top: 2px solid rgb(224, 224, 224)">
        <q-btn icon="edit" label="EDIT" flat color="primary" @click="openEditDialog" />
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import type Student from 'src/models/itp-prog/student'
import { formatTime } from 'src/common'
import { useQuasar } from 'quasar'
import sanitizeHtml from 'sanitize-html'
import StudEditDialog from 'components/itp-prog/StudEditDialog.vue'
import { useStore } from 'stores/itp-prog-store'

const props = defineProps<{ value: Student }>()
const { dialog, notify } = useQuasar()
const store = useStore()

function openConfirmDelDialog() {
  dialog({
    title: `<span class="text-negative">Remove ${sanitizeHtml(props.value.student_name)}</span>`,
    message: `Are you sure you want to remove ${sanitizeHtml(
      props.value.student_name
    )}? <span class="text-negative">REMOVE ACTION CANNOT BE UNDONE</span>`,
    ok: { icon: 'delete', label: 'Remove', color: 'negative' },
    cancel: { icon: 'close', label: 'Cancel', flat: true },
    html: true,
  }).onOk(async () => {
    // Tell the admin the student is being removed
    const notif = notify({
      group: false,
      timeout: 0,
      type: 'ongoing',
      spinner: true,
      message: `Removing student "${props.value.student_name}"`,
      ignoreDefaults: true,
      position: 'top',
    })

    // Remove the student
    await store.removeStudent(props.value.student_id)

    // Signal the admin that the student is successfully removed
    notif({
      timeout: 5000,
      type: 'positive',
      spinner: false,
      icon: 'done',
      message: `Successfully removed the student "${props.value.student_name}"`,
      progress: true,
      actions: [{ label: 'Close', color: 'white', flat: false, outline: true }],
    })
  })
}

function openEditDialog() {
  dialog({ component: StudEditDialog, componentProps: { value: props.value } })
}
</script>
