<template>
  <q-card class="bg-amber-1 cursor-pointer q-hoverable" v-ripple @click="onClick">
    <span class="q-focus-helper"></span>
    <div class="full-width bg-primary" style="height: 8px; border-radius: 8px 8px 0 0"></div>

    <q-card-section>
      <q-icon name="work" left size="sm" color="amber-8" />
      <span class="text-h6 vertical-middle">{{ value.title }}</span>
      <br />
      <div>{{ value.company_name }}</div>

      <q-chip
        v-for="category in value.categories"
        :key="category"
        class="q-ml-none q-mr-sm"
        :color="categoryColor[category]"
        text-color="white"
        icon="category"
        :label="category"
        :ripple="false"
      />
      <br />

      <template v-if="value.min_allowance != null">
        <span class="text-bold">
          RM {{ value.min_allowance }} {{ value.max_allowance != null ? '-' : '' }} {{ value.max_allowance }}
        </span>
        <br />
      </template>

      <q-icon class="q-mr-xs" name="location_on" size="xs" color="primary" />
      <span>{{ value.location }}</span>
      <br />

      <div class="q-mt-sm text-bold">Learning Outcomes</div>

      <ul class="q-my-none" style="padding-left: 18px">
        <li v-for="learningOutcome in value.learning_outcomes" :key="learningOutcome">{{ learningOutcome }}</li>
      </ul>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { type Internship } from 'src/models/itp-post'
import { categoryColor } from 'src/consts/itp-post'
import { useRouter } from 'vue-router'
import { useInternshipDetailsStore } from 'stores/itp-post-store'

const props = defineProps<{ value: Internship }>()

const router = useRouter()
const detailsStore = useInternshipDetailsStore()

function onClick() {
  detailsStore.value = props.value
  router.push('internship-details')
}
</script>
