<template>
  <q-page class="bg-wallpaper" padding>
    <q-table
      class="bg-grey-1"
      :columns="columns"
      title-class="text-h4"
      title="Internships"
      :rows="store.postedInternships"
      :row-key="getRowKey"
      :rows-per-page-options="rowsPerPageOptions"
      :pagination="{ rowsPerPage: defaultRowsPerPage }"
      :filter="searchStore"
      :filter-method="filter"
      wrap-cells
      :loading="store.loadingPostedInternships"
      color="primary"
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

      <template #body-cell-title-with-vacancy-count="props">
        <q-td :props="props">
          <span>{{ props.row.title }}</span>

          <span
            class="text-bold"
            :class="{
              'text-negative': props.row.vacancy_count === 0,
              'text-warning': props.row.vacancy_count === 1,
              'text-positive': props.row.vacancy_count > 1,
            }"
          >
            ({{ props.row.vacancy_count }})
          </span>
        </q-td>
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
        <div v-show="!store.loadingPostedInternships" class="text-negative">
          <q-icon name="warning" left size="sm" />
          <span class="text-body1">No matching records found. Please broaden your searches.</span>
        </div>
      </template>
    </q-table>
  </q-page>
</template>

<script setup lang="ts">
import type Internship from 'src/models/internship'
import { useInternshipSearchStore, useInternshipEditStore, useInternshipDetailsEmpStore } from 'stores/itp-post-store'
import Fuse from 'fuse.js'
import { useMeta, useQuasar } from 'quasar'
import { rowsPerPageOptions, defaultRowsPerPage } from 'src/consts'
import { categoryColor } from 'src/consts/itp-post'
import sanitizeHtml from 'sanitize-html'
import { useRouter } from 'vue-router'
import { useStore } from 'stores/itp-post-store'

useMeta({ title: 'Manage Internships | MyITPHub' })
const { dialog, notify } = useQuasar()
const router = useRouter()
const store = useStore()
const searchStore = useInternshipSearchStore()
const editStore = useInternshipEditStore()
const detailsStore = useInternshipDetailsEmpStore()

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const columns: any[] = [
  {
    name: 'title-with-vacancy-count',
    label: 'Title (Vacancy Count)',
    field: (row: Internship) => `${row.title} (${row.vacancy_count})`,
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

// Init
searchStore.reset()
store.listPostedInternships('CMY Enterprise')

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
  }).onOk(async () => {
    // Tell the student the internship is removing
    const notif = notify({
      group: false,
      timeout: 0,
      type: 'ongoing',
      spinner: true,
      message: `Removing internship "${title}"`,
      ignoreDefaults: true,
      position: 'top',
    })

    // Remove the requested internship
    await store.removeInternship('CMY Enterprise', title)

    // Signal the employee that the internship is successfully removed
    notif({
      timeout: 5000,
      type: 'positive',
      spinner: false,
      icon: 'done',
      message: `Successfully removed the internship "${title}"`,
      progress: true,
      actions: [{ label: 'Close', color: 'white', flat: false, outline: true }],
    })
  })
}

function viewDetails(row: Internship) {
  detailsStore.value = row
  router.push('/emp/itp-post/internship-details')
}
</script>
