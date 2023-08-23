<template>
  <q-page class="text-body1" padding>
    <div class="row">
      <div class="col-8">
        <div class="q-mb-md">
          <q-btn class="q-mr-sm" icon="arrow_back" size="xl" unelevated round dense @click="router.back()" />
          <span class="vertical-middle text-h4">{{ store.value.title }}</span>
        </div>

        <q-chip
          v-for="category in store.value.categories"
          :key="category"
          class="q-ml-none q-mr-sm"
          :color="categoryColor[category]"
          text-color="white"
          icon="category"
          :label="category"
          :ripple="false"
        />
        <br />

        <template v-if="store.value.min_allowance != null">
          <span class="text-bold">
            RM {{ store.value.min_allowance }} {{ store.value.max_allowance != null ? '-' : '' }}
            {{ store.value.max_allowance }}
          </span>
          <br />
        </template>

        <div class="q-mb-xl">
          <q-icon class="q-mr-xs" name="location_on" size="sm" color="primary" />
          <span>{{ store.value.location }}</span>
        </div>

        <div class="text-h5">Learning Outcome</div>

        <ul class="q-mb-xl" style="padding-left: 18px">
          <li v-for="learningOutcome in store.value.learning_outcomes" :key="learningOutcome">{{ learningOutcome }}</li>
        </ul>
      </div>
    </div>

    <div class="text-h5 q-mb-md">Job Description</div>
    <div class="q-mb-xl" v-html="sanitizeHtml(store.value.description)"></div>
  </q-page>
</template>

<script setup lang="ts">
import { useInternshipDetailsEmpStore } from 'stores/itp-post-store'
import { useMeta } from 'quasar'
import { categoryColor } from 'src/consts/itp-post'
import sanitizeHtml from 'sanitize-html'
import { useRouter } from 'vue-router'

const router = useRouter()
const store = useInternshipDetailsEmpStore()
useMeta({ title: `${store.value.title} | MyITPHub` })
</script>
