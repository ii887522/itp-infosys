<template>
  <q-page padding>
    <q-table
      class="bg-grey-1"
      :columns="columns"
      title-class="text-h4"
      title="My Internship Application"
      :rows="applications"
      row-key="resume_url"
      :rows-per-page-options="rowsPerPageOptions"
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
            icon="cancel"
            color="negative"
            dense
            label="Cancel"
            outline
            @click="openConfirmDelDialog(props.row.title, props.row.company_name)"
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
import { applications } from 'src/consts/itp-post'
import { useMeta, useQuasar } from 'quasar'
import sanitizeHtml from 'sanitize-html'
import { rowsPerPageOptions, statusIcon, statusColor } from 'src/consts'
import { type OutgoingApplication } from 'src/models/itp-post'
import InternshipAppStudDialog from 'components/itp-post/InternshipAppStudDialog.vue'

useMeta({ title: 'My Internship Application | MyITPHub' })
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
    name: 'actions',
    label: 'Actions',
    field: '',
    align: 'center',
    icon: 'settings',
    style: 'width: 256px',
  },
]

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
  })
}
</script>