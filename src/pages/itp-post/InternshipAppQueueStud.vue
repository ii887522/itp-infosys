<template>
  <q-page class="bg-wallpaper" padding>
    <q-table
      class="bg-grey-1"
      :columns="columns"
      title-class="text-h4"
      title="My Internship Application"
      :rows="store.applications"
      row-key="resume_url"
      :rows-per-page-options="rowsPerPageOptions"
      :pagination="{ rowsPerPage: defaultRowsPerPage }"
      :loading="store.loadingApplications"
      color="primary"
      :filter="internshipAppQueueStudStore"
      :filter-method="filter"
    >
      <template #top-right>
        <q-select
          class="q-mr-md"
          style="width: 192px"
          name="status"
          behavior="menu"
          label="Status"
          v-model="internshipAppQueueStudStore.status"
          :options="statusOptions"
          outlined
        />

        <q-input
          style="width: 256px"
          name="q"
          type="search"
          clearable
          v-model="internshipAppQueueStudStore.q"
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
            icon="cancel"
            dense
            label="Cancel"
            outline
            :color="props.row.status !== 'pending' ? 'grey-5' : 'negative'"
            :disable="props.row.status !== 'pending'"
            @click="openConfirmDelDialog(props.row.title, props.row.company_name)"
          />
        </q-td>
      </template>

      <template #no-data>
        <div v-show="!store.loadingApplications" class="text-negative">
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
import type OutgoingApplication from 'src/models/outgoing-application'
import InternshipAppStudDialog from 'components/itp-post/InternshipAppStudDialog.vue'
import { useStore, useInternshipAppQueueStudStore } from 'stores/itp-post-store'
import Fuse from 'fuse.js'
import { formatTime } from 'src/common'

useMeta({ title: 'My Internship Application | MyITPHub' })
const { dialog, notify, localStorage } = useQuasar()
const store = useStore()
const internshipAppQueueStudStore = useInternshipAppQueueStudStore()

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
    name: 'company-name',
    label: 'Company',
    field: 'company_name',
    align: 'left',
    sortable: true,
    icon: 'apartment',
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
    style: 'width: 256px',
  },
]

// Init
store.listApplications(localStorage.getItem('username') ?? '')
let timer: NodeJS.Timer

onMounted(() => {
  timer = setInterval(() => {
    store.listApplications(localStorage.getItem('username') ?? '')
  }, 3_540_000)
})

onUnmounted(() => {
  clearInterval(timer)
})

function filter(
  rows: readonly OutgoingApplication[],
  terms: { status: string; q: string }
): readonly OutgoingApplication[] {
  let result = rows

  if (terms.status !== 'All') {
    result = result.filter(row => row.status === terms.status.toLowerCase())
  }

  if (terms.q?.trim()) {
    result = new Fuse(result, { threshold: 0.5, ignoreLocation: true, keys: ['title', 'company_name'] })
      .search(terms.q.trim())
      .map(item => item.item)
  }

  return result
}

function openDetailsDialog(row: OutgoingApplication) {
  dialog({ component: InternshipAppStudDialog, componentProps: { value: row } })
}

function openConfirmDelDialog(title: string, companyName: string) {
  dialog({
    title: '<span class="text-negative">Cancel Application</span>',
    message: `Are you sure you want to cancel the internship application for ${sanitizeHtml(title)} in ${sanitizeHtml(
      companyName
    )}? <span class="text-negative">CANCEL ACTION CANNOT BE UNDONE</span>`,
    ok: { icon: 'delete', label: 'Remove', color: 'negative' },
    cancel: { icon: 'close', label: 'Cancel', flat: true },
    html: true,
  }).onOk(async () => {
    // Tell the student the internship application is canceling
    const notif = notify({
      group: false,
      timeout: 0,
      type: 'ongoing',
      spinner: true,
      message: `Canceling internship application "${title}" from ${companyName}`,
      ignoreDefaults: true,
      position: 'top',
    })

    // Cancel the requested internship application
    await store.cancelApplication(companyName, title, localStorage.getItem('username') ?? '')

    // Signal the student that the internship applicaton is successfully canceled
    notif({
      timeout: 5000,
      type: 'positive',
      spinner: false,
      icon: 'done',
      message: `Successfully canceled the internship application "${title}" from ${companyName}`,
      progress: true,
      actions: [{ label: 'Close', color: 'white', flat: false, outline: true }],
    })
  })
}
</script>
