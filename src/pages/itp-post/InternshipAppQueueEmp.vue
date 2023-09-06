<template>
  <q-page class="bg-wallpaper" padding>
    <q-table
      class="bg-grey-1"
      :columns="columns"
      title-class="text-h4"
      title="Student Internship Applications"
      :rows="store.incomingApplications"
      row-key="resume_url"
      :rows-per-page-options="rowsPerPageOptions"
      :pagination="{ rowsPerPage: defaultRowsPerPage }"
      color="primary"
      :filter="internshipAppQueueEmpStore"
      :filter-method="filter"
      :loading="store.loadingIncomingApplications"
    >
      <template #top-right>
        <q-select
          class="q-mr-md"
          style="width: 192px"
          name="status"
          behavior="menu"
          label="Status"
          v-model="internshipAppQueueEmpStore.status"
          :options="statusOptions"
          outlined
        />

        <q-input
          style="width: 256px"
          name="q"
          type="search"
          clearable
          v-model="internshipAppQueueEmpStore.q"
          outlined
          label-slot
        >
          <template #label>
            <q-icon name="search" left size="sm" />
            <span>Search</span>
          </template>
        </q-input>
      </template>

      <template #header-cell="props">
        <q-th :props="props">
          <q-icon v-if="props.col.icon" class="q-mr-sm" :name="props.col.icon" size="xs" />
          <span class="vertical-middle">{{ props.col.label }}</span>
        </q-th>
      </template>

      <template #body-cell-status="props">
        <q-td :props="props" :class="`text-${statusColor[props.row.status]} text-bold`">
          <q-icon :name="statusIcon[props.row.status]" left size="xs" />
          <span>{{ props.row.status.toUpperCase() }}</span>
        </q-td>
      </template>

      <template #body-cell-actions="props">
        <q-td :props="props">
          <q-btn
            class="q-mr-md"
            icon="visibility"
            color="info"
            dense
            label="Read More"
            outline
            @click="openDetailsDialog(props.row)"
          />

          <q-btn
            class="q-mr-md"
            icon="thumb_up"
            :color="props.row.status !== 'pending' ? 'grey-5' : 'positive'"
            dense
            label="Accept"
            outline
            :disable="props.row.status !== 'pending'"
            @click="openConfirmAcceptDialog(props.row.title, props.row.student_name)"
          />

          <q-btn
            icon="thumb_down"
            :color="props.row.status !== 'pending' ? 'grey-5' : 'negative'"
            dense
            label="Reject"
            outline
            :disable="props.row.status !== 'pending'"
            @click="openConfirmRejectDialog(props.row.title, props.row.student_name)"
          />
        </q-td>
      </template>

      <template #no-data>
        <div v-show="!store.loadingIncomingApplications" class="text-negative">
          <q-icon name="warning" left size="sm" />
          <span class="text-body1">No matching records found. Please broaden your searches.</span>
        </div>
      </template>
    </q-table>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { useMeta, useQuasar } from 'quasar'
import sanitizeHtml from 'sanitize-html'
import { rowsPerPageOptions, statusIcon, statusColor, defaultRowsPerPage, statusOptions } from 'src/consts'
import { type IncomingApplication } from 'src/models/itp-post'
import InternshipAppEmpDialog from 'components/itp-post/InternshipAppEmpDialog.vue'
import { useStore, useInternshipAppQueueEmpStore } from 'stores/itp-post-store'
import Fuse from 'fuse.js'
import { formatTime } from 'src/common'

useMeta({ title: 'Student Internship Application | MyITPHub' })
const { dialog, notify } = useQuasar()
const store = useStore()
const internshipAppQueueEmpStore = useInternshipAppQueueEmpStore()

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const columns: any[] = [
  {
    name: 'title',
    label: 'Title',
    field: 'title',
    align: 'left',
    sortable: true,
    icon: 'title',
  },
  {
    name: 'student-name',
    label: 'Student',
    field: 'student_name',
    align: 'left',
    sortable: true,
    icon: 'person',
  },
  {
    name: 'status',
    label: 'Status',
    field: 'status',
    align: 'center',
    sortable: true,
  },
  {
    name: 'applied-at',
    label: 'Applied at',
    field: 'created_at',
    align: 'center',
    icon: 'schedule',
    sortable: true,
    format: (value: number) => formatTime(value),
  },
  {
    name: 'actions',
    label: 'Actions',
    field: '',
    align: 'center',
    icon: 'settings',
    style: 'width: 350px',
  },
]

// Init
store.listIncomingApplications('CMY Enterprise')
let timer: NodeJS.Timer

onMounted(() => {
  timer = setInterval(() => {
    store.listIncomingApplications('21WMR05319')
  }, 3_540_000)
})

onUnmounted(() => {
  clearInterval(timer)
})

function filter(
  rows: readonly IncomingApplication[],
  terms: { status: string; q: string }
): readonly IncomingApplication[] {
  let result = rows

  if (terms.status !== 'All') {
    result = result.filter(row => row.status === terms.status.toLowerCase())
  }

  if (terms.q?.trim()) {
    result = new Fuse(result, { threshold: 0.5, ignoreLocation: true, keys: ['title', 'student_name'] })
      .search(terms.q.trim())
      .map(item => item.item)
  }

  return result
}

function openDetailsDialog(row: IncomingApplication) {
  dialog({ component: InternshipAppEmpDialog, componentProps: { value: row } })
}

function openConfirmAcceptDialog(title: string, studentName: string) {
  dialog({
    title: '<span class="text-positive">Accept Application</span>',
    message: `Are you sure you want to accept the internship application for ${sanitizeHtml(title)} by ${sanitizeHtml(
      studentName
    )}? <span class="text-negative">ACCEPT ACTION CANNOT BE UNDONE</span>`,
    ok: { icon: 'thumb_up', label: 'Accept', color: 'positive' },
    cancel: { icon: 'close', label: 'Cancel', flat: true },
    html: true,
  }).onOk(async () => {
    // Tell the employee the internship application is being accepted
    const notif = notify({
      group: false,
      timeout: 0,
      type: 'ongoing',
      spinner: true,
      message: `Accepting internship "${title}" made by ${studentName}`,
      ignoreDefaults: true,
      position: 'top',
    })

    // Accept the requested internship application
    await store.updateApplication({
      internshipTitle: title,
      companyName: 'CMY Enterprise',
      studentId: '21WMR05319',
      status: 'accepted',
    })

    // Signal the employee that the internship application is successfully accepted
    notif({
      timeout: 5000,
      type: 'positive',
      spinner: false,
      icon: 'done',
      message: `Successfully accepted the internship "${title}" made by ${studentName}`,
      progress: true,
      actions: [{ label: 'Close', color: 'white', flat: false, outline: true }],
    })
  })
}

function openConfirmRejectDialog(title: string, studentName: string) {
  dialog({
    title: '<span class="text-negative">Reject Application</span>',
    message: `Are you sure you want to reject the internship application for ${sanitizeHtml(title)} by ${sanitizeHtml(
      studentName
    )}? <span class="text-negative">REJECT ACTION CANNOT BE UNDONE</span>`,
    ok: { icon: 'thumb_down', label: 'Reject', color: 'negative' },
    cancel: { icon: 'close', label: 'Cancel', flat: true },
    html: true,
  }).onOk(async () => {
    // Tell the employee the internship application is being rejected
    const notif = notify({
      group: false,
      timeout: 0,
      type: 'ongoing',
      spinner: true,
      message: `Rejecting internship "${title}" made by ${studentName}`,
      ignoreDefaults: true,
      position: 'top',
    })

    // Reject the requested internship application
    await store.updateApplication({
      internshipTitle: title,
      companyName: 'CMY Enterprise',
      studentId: '21WMR05319',
      status: 'rejected',
    })

    // Signal the employee that the internship application is successfully rejected
    notif({
      timeout: 5000,
      type: 'positive',
      spinner: false,
      icon: 'done',
      message: `Successfully rejected the internship "${title}" made by ${studentName}`,
      progress: true,
      actions: [{ label: 'Close', color: 'white', flat: false, outline: true }],
    })
  })
}
</script>
