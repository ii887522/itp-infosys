<template>
  <q-page class="bg-wallpaper" padding>
    <q-table
      grid
      :columns="columns"
      title-class="text-h4"
      title="Students"
      :rows="students"
      row-key="name"
      :rows-per-page-options="itemsPerPageOptions"
      :pagination="{ rowsPerPage: defaultItemsPerPage }"
      color="primary"
    >
      <template #item="{ row }">
        <div class="q-pa-md col-xs-12 col-sm-6 col-md-4 col-lg-3 col-xl-3">
          <stud-card :value="row" />
        </div>
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
import { useMeta } from 'quasar'
import { itemsPerPageOptions, defaultItemsPerPage } from 'src/consts'
import { students } from 'src/consts/itp-prog'
import StudCard from 'components/itp-prog/StudCard.vue'

useMeta({ title: 'Students | MyITPHub' })

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const columns: any[] = [
  {
    name: 'name',
    label: 'Name',
    field: 'student_name',
    align: 'left',
    sortable: true,
  },
  {
    name: 'assigned-at',
    label: 'Assigned at',
    field: 'supervisor_assigned_at',
    align: 'center',
    sortable: true,
  },
  {
    name: 'faculty',
    label: 'Faculty',
    field: 'faculty',
    align: 'left',
    sortable: true,
  },
  {
    name: 'location',
    label: 'Location',
    field: 'location',
    align: 'left',
    sortable: true,
  },
  {
    name: 'company',
    label: 'Company',
    field: 'company_name',
    align: 'left',
    sortable: true,
  },
]
</script>
