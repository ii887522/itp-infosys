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
      :filter="studListStore"
      :filter-method="filter"
    >
      <template #top-right>
        <q-select
          class="q-mr-md"
          bg-color="white"
          style="width: 128px"
          name="faculty"
          behavior="menu"
          label="Faculty"
          v-model="studListStore.faculty"
          :options="['ALL', ...faculties]"
          outlined
        />

        <q-input
          class="q-mr-md"
          style="width: 256px"
          outlined
          label-slot
          bg-color="white"
          v-model="studListStore.internshipDateRangeText"
          readonly
        >
          <template #label>
            <q-icon name="calendar_month" left size="xs" />
            <span>Internship date range</span>
          </template>

          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                <q-date v-model="studListStore.internshipDateRange" range mask="D/M/YYYY">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>

        <q-input
          style="width: 256px"
          name="q"
          type="search"
          clearable
          v-model="studListStore.q"
          outlined
          bg-color="white"
          label-slot
        >
          <template #label>
            <q-icon name="search" left size="sm" />
            <span>Search</span>
          </template>
        </q-input>
      </template>

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
import { useMeta, date } from 'quasar'
import { itemsPerPageOptions, defaultItemsPerPage, type DateRange } from 'src/consts'
import { students, faculties } from 'src/consts/itp-prog'
import StudCard from 'components/itp-prog/StudCard.vue'
import { useStudListStore } from 'stores/itp-prog-store'
import type Student from 'src/models/itp-prog/student'
import Fuse from 'fuse.js'

useMeta({ title: 'Students | MyITPHub' })
const studListStore = useStudListStore()

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

function filter(
  rows: readonly Student[],
  terms: { faculty: string; internshipDateRange: DateRange; q: string }
): readonly Student[] {
  let result = terms.faculty === 'ALL' ? rows : rows.filter(row => row.faculty === terms.faculty)

  if (typeof terms.internshipDateRange === 'string') {
    result = result.filter(row =>
      date.isBetweenDates(
        date.extractDate(terms.internshipDateRange as string, 'D/M/YYYY'),
        row.itp_start_at * 1000,
        row.itp_end_at * 1000,
        {
          inclusiveFrom: true,
          inclusiveTo: true,
          onlyDate: true,
        }
      )
    )
  } else if (terms.internshipDateRange != null && typeof terms.internshipDateRange === 'object') {
    result = result.filter(
      row =>
        date.isBetweenDates(
          row.itp_start_at * 1000,
          date.extractDate((terms.internshipDateRange as { from: string }).from, 'D/M/YYYY'),
          date.extractDate((terms.internshipDateRange as { to: string }).to, 'D/M/YYYY'),
          { inclusiveFrom: true, inclusiveTo: true, onlyDate: true }
        ) ||
        date.isBetweenDates(
          row.itp_end_at * 1000,
          date.extractDate((terms.internshipDateRange as { from: string }).from, 'D/M/YYYY'),
          date.extractDate((terms.internshipDateRange as { to: string }).to, 'D/M/YYYY'),
          { inclusiveFrom: true, inclusiveTo: true, onlyDate: true }
        )
    )
  }

  if (terms.q == null || terms.q.trim() === '') return result

  return new Fuse(result, {
    threshold: 0.5,
    ignoreLocation: true,
    keys: ['student_id', 'student_name', 'location', 'company_name', 'supervisor_name'],
  })
    .search(terms.q.trim())
    .map(item => item.item)
}
</script>
