<template>
  <q-page padding>
    <q-table
      grid
      :columns="columns"
      title-class="text-h4"
      title="Internships"
      :rows="store.internships"
      :row-key="getRowKey"
      hide-pagination
      :pagination="{ rowsPerPage: 0 }"
      :filter="searchStore"
      :filter-method="filter"
      :loading="store.loadingInternships"
      color="primary"
    >
      <template #item="{ row }">
        <div class="q-pa-md col-xs-12 col-sm-6 col-md-6 col-lg-4 col-xl-3">
          <internship-card :value="row" />
        </div>
      </template>

      <template #no-data>
        <div v-show="!store.loadingInternships" class="text-negative">
          <q-icon name="warning" left size="sm" />
          <span class="text-body1">No matching records found. Please broaden your searches.</span>
        </div>
      </template>
    </q-table>
  </q-page>
</template>

<script setup lang="ts">
import { type Internship } from 'src/models/itp-post'
import InternshipCard from 'components/itp-post/InternshipCard.vue'
import { useInternshipSearchStore } from 'stores/itp-post-store'
import Fuse from 'fuse.js'
import { useMeta } from 'quasar'
import { useStore } from 'stores/itp-post-store'

useMeta({ title: 'Internships | MyITPHub' })
const searchStore = useInternshipSearchStore()
const store = useStore()

const columns = [
  {
    name: 'title',
    label: 'Title',
    field: 'title',
  },
  {
    name: 'company-name',
    label: 'Company',
    field: 'company_name',
  },
  {
    name: 'categories',
    label: 'Categories',
    field: 'categories',
  },
  {
    name: 'min-allowance',
    label: 'Min Allowance (RM)',
    field: 'min_allowance',
  },
  {
    name: 'max-allowance',
    label: 'Max Allowance (RM)',
    field: 'max_allowance',
  },
  {
    name: 'location',
    label: 'Location',
    field: 'location',
  },
  {
    name: 'learning-outcomes',
    label: 'Learning Outcomes',
    field: 'learning_outcomes',
  },
]

// Init
searchStore.reset()
store.listInternships()

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
    result = new Fuse(result, { threshold: 0.5, ignoreLocation: true, keys: ['title', 'company_name'] })
      .search(terms.q.trim())
      .map(item => item.item)
  }

  return result
}
</script>
