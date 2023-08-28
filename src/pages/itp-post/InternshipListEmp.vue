<template>
  <q-page padding>
    <q-table
      class="bg-grey-1"
      :columns="columns"
      title-class="text-h4"
      title="Internships"
      :rows="internships"
      :row-key="getRowKey"
      :rows-per-page-options="rowsPerPageOptions"
      :pagination="{ rowsPerPage: 10 }"
      :filter="searchStore"
      :filter-method="filter"
      wrap-cells
    >
      <template #top-right>
        <q-btn icon="add" color="positive" label="Add Internship" to="/emp/itp-post/internships/add" />
      </template>

      <template #header-cell="props">
        <q-th :props="props">
          <q-icon class="q-mr-sm" :name="props.col.icon" size="xs" />
          <span class="vertical-middle">{{ props.col.label }}</span>
        </q-th>
      </template>

      <template #body-cell-categories="props">
        <q-td :props="props">
          <q-chip
            v-for="category in props.row.categories"
            :key="category"
            class="q-ml-none q-mr-sm"
            :color="categoryColor[category]"
            text-color="white"
            :label="category"
            :ripple="false"
            size="sm"
          />
        </q-td>
      </template>

      <template #body-cell-actions="props">
        <q-td :props="props">
          <q-btn icon="visibility" flat round color="info" dense @click="viewDetails(props.row)" />
          <q-btn icon="edit" flat round color="warning" dense @click="editStore.navigate(router, props.row)" />
          <q-btn icon="delete" flat round color="negative" dense @click="openConfirmDelDialog(props.row.title)" />
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
import { internships } from 'src/consts/itp-post'
import { type Internship } from 'src/models/itp-post'
import { useInternshipSearchStore, useInternshipEditStore, useInternshipDetailsEmpStore } from 'stores/itp-post-store'
import Fuse from 'fuse.js'
import { useMeta, useQuasar } from 'quasar'
import { rowsPerPageOptions } from 'src/consts'
import { categoryColor } from 'src/consts/itp-post'
import sanitizeHtml from 'sanitize-html'
import { useRouter } from 'vue-router'

useMeta({ title: 'Manage Internships | MyITPHub' })
const { dialog } = useQuasar()
const router = useRouter()
const searchStore = useInternshipSearchStore()
const editStore = useInternshipEditStore()
const detailsStore = useInternshipDetailsEmpStore()

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
    name: 'categories',
    label: 'Categories',
    field: 'categories',
    align: 'left',
    sortable: true,
    icon: 'category',
  },
  {
    name: 'min-allowance',
    label: 'Min Allowance',
    field: 'min_allowance',
    align: 'right',
    sortable: true,
    icon: 'payments',
    format: (value?: number) => (value != null ? `RM ${value}` : ''),
  },
  {
    name: 'max-allowance',
    label: 'Max Allowance',
    field: 'max_allowance',
    align: 'right',
    sortable: true,
    icon: 'payments',
    format: (value?: number) => (value != null ? `RM ${value}` : ''),
  },
  {
    name: 'location',
    label: 'Location',
    field: 'location',
    align: 'left',
    sortable: true,
    icon: 'location_on',
  },
  {
    name: 'actions',
    label: 'Actions',
    field: '',
    align: 'center',
    icon: 'settings',
  },
]

searchStore.reset()

function getRowKey(row: Internship) {
  return `${row.title}#${row.company_name}`
}

function filter(
  rows: readonly Internship[],
  terms: { category?: string; minAllowance: number; location?: string; q?: string }
): readonly Internship[] {
  let result = rows.filter(
    row =>
      terms.minAllowance <= (row.max_allowance ?? row.min_allowance ?? 0) &&
      (!terms.category || row.categories.includes(terms.category ?? '')) &&
      (!terms.location || row.location === terms.location)
  )

  if (terms.q?.trim()) {
    result = new Fuse(result, { threshold: 0.5, ignoreLocation: true, keys: ['title'] })
      .search(terms.q.trim())
      .map(item => item.item)
  }

  return result
}

function openConfirmDelDialog(title: string) {
  dialog({
    title: `<span class="text-negative">Remove ${sanitizeHtml(title)}</span>`,
    message: `Are you sure you want to remove ${sanitizeHtml(
      title
    )}? <span class="text-negative">REMOVE ACTION CANNOT BE UNDONE</span>`,
    ok: { icon: 'delete', label: 'Remove', color: 'negative' },
    cancel: { icon: 'close', label: 'Cancel', flat: true },
    html: true,
  })
}

function viewDetails(row: Internship) {
  detailsStore.value = row
  router.push('/emp/itp-post/internship-details')
}
</script>
