<template>
  <q-banner class="shadow-6">
    <div class="row items-center q-col-gutter-md text-dark">
      <q-select
        class="col"
        name="category"
        clearable
        behavior="menu"
        label-slot
        v-model="store.category"
        :options="allCategories"
        outlined
      >
        <template #label>
          <q-icon name="category" left size="sm" />
          <span>Category</span>
        </template>
      </q-select>

      <div class="col">
        <div class="text-grey-7">
          <q-icon name="payments" left size="sm" />
          <span>Min Allowance</span>
        </div>

        <q-slider
          name="min_allowance"
          snap
          label-always
          markers
          :min="minAllowance"
          :max="maxAllowance"
          :step="100"
          v-model="store.minAllowance"
          switch-label-side
          :label-value="`RM ${store.minAllowance}${store.minAllowance !== maxAllowance ? '' : ' and above'}`"
        />
      </div>

      <q-select
        class="col"
        name="location"
        clearable
        behavior="menu"
        label-slot
        v-model="store.location"
        :options="allLocations"
        outlined
      >
        <template #label>
          <q-icon name="location_on" left size="sm" />
          <span>Location</span>
        </template>
      </q-select>

      <q-input class="col" name="q" type="search" clearable v-model="store.q" outlined label-slot>
        <template #label>
          <q-icon name="search" left size="sm" />
          <span>Search</span>
        </template>
      </q-input>
    </div>
  </q-banner>
</template>

<script setup lang="ts">
import { allCategories, minAllowance, maxAllowance, allLocations } from 'src/consts/itp-post'
import { useInternshipSearchStore } from 'stores/itp-post-store'

const store = useInternshipSearchStore()
</script>
