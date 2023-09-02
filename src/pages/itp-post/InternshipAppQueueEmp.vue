<template>
  <q-page padding>
    <q-table
      class="bg-grey-1"
      :columns="columns"
      title-class="text-h4"
      title="Student Internship Applications"
      :rows="incomingApplications"
      row-key="resume_url"
      :rows-per-page-options="rowsPerPageOptions"
      :pagination="{ rowsPerPage: defaultRowsPerPage }"
    >
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
        <div class="text-negative">
          <q-icon name="warning" left size="sm" />
          <span class="text-body1">No matching records found. Please broaden your searches.</span>
        </div>
      </template>
    </q-table>
  </q-page>
</template>

<script setup lang="ts">
import { incomingApplications } from 'src/consts/itp-post'
import { useMeta, useQuasar } from 'quasar'
import sanitizeHtml from 'sanitize-html'
import { rowsPerPageOptions, statusIcon, statusColor, defaultRowsPerPage } from 'src/consts'
import { type IncomingApplication } from 'src/models/itp-post'
import InternshipAppEmpDialog from 'components/itp-post/InternshipAppEmpDialog.vue'

useMeta({ title: 'Student Internship Application | MyITPHub' })
const { dialog } = useQuasar()

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
    name: 'actions',
    label: 'Actions',
    field: '',
    align: 'center',
    icon: 'settings',
    style: 'width: 350px',
  },
]

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
  })
}
</script>
