<template>
  <q-page class="bg-wallpaper" padding>
    <q-card class="bg-grey-1">
      <q-card-section>
        <div class="q-mb-md">
          <q-btn class="q-mr-sm" icon="arrow_back" to="/emp/itp-post/internships" size="xl" unelevated round dense />
          <span class="vertical-middle text-h4">Edit Internship</span>
        </div>

        <q-form class="row q-col-gutter-md" @submit="edit">
          <div class="col-6 q-mb-xs">
            <q-input
              name="title"
              clearable
              autofocus
              label-slot
              v-model="editStore.newTitle"
              outlined
              bg-color="white"
              :rules="[value => !isTextEmpty(value) || 'Title is required']"
            >
              <template #label>
                <q-icon class="q-mr-xs" name="title" size="sm" />
                <span>Title</span>
                <span class="text-negative"> *</span>
              </template>
            </q-input>
          </div>

          <div class="col-6 q-mb-xs">
            <q-select
              name="categories"
              clearable
              behavior="menu"
              label-slot
              v-model="editStore.categories"
              :options="allCategories"
              outlined
              multiple
              use-chips
              bg-color="white"
              :rules="[value => !isArrayEmpty(value) || 'At least 1 category is required']"
            >
              <template #label>
                <q-icon class="q-mr-sm" name="category" size="sm" />
                <span>Categories</span>
                <span class="text-negative"> *</span>
              </template>

              <template #selected-item="{ opt }">
                <q-chip
                  class="q-ml-none q-mr-sm q-mt-sm"
                  :color="categoryColor[opt]"
                  text-color="white"
                  :label="opt"
                  :ripple="false"
                />
              </template>
            </q-select>
          </div>

          <div class="col-4 q-mb-xs">
            <div class="text-grey-7">
              <q-icon class="q-mr-sm" name="payments" size="sm" />
              <span>Allowances</span>
            </div>

            <div class="q-pl-sm q-pr-sm q-mb-lg">
              <q-range
                name="allowance_range"
                snap
                label-always
                markers
                drag-range
                :left-label-value="`RM ${editStore.allowanceRange.min}`"
                :right-label-value="`RM ${editStore.allowanceRange.max}${
                  editStore.allowanceRange.max !== maxAllowance ? '' : ' and above'
                }`"
                :min="minAllowance"
                :max="maxAllowance"
                :step="100"
                v-model="editStore.allowanceRange"
                switch-label-side
              />
            </div>

            <div class="q-mb-xs text-caption text-info text-weight-medium">
              Set minimum to RM 0 and maximum to RM 2000 and above if do not want to disclose allowance to the students
            </div>
          </div>

          <div class="col-4 q-mb-xs">
            <q-select
              name="location"
              behavior="menu"
              label-slot
              v-model="editStore.location"
              :options="allLocations"
              outlined
              bg-color="white"
            >
              <template #label>
                <q-icon class="q-mr-sm" name="location_on" size="sm" />
                <span>Location</span>
              </template>
            </q-select>
          </div>

          <div class="col-4 q-mb-xs">
            <q-input
              ref="vacancyCountInput"
              name="vacancy_count"
              label-slot
              v-model="editStore.vacancyCount"
              outlined
              bg-color="white"
              :rules="[value => !isTextEmpty(value) || 'Vacancy count is required']"
            >
              <template #label>
                <q-icon class="q-mr-xs" name="calculate" size="sm" />
                <span>Vacancy Count</span>
                <span class="text-negative"> *</span>
              </template>
            </q-input>
          </div>

          <div class="col-12">
            <q-icon name="school" size="md" left />
            <span class="vertical-middle text-h6">Learning Outcomes</span>
            <span class="text-negative text-h6"> *</span>
          </div>

          <input-list class="col-6 q-mb-xs" v-model="editStore.learningOutcomes" v-slot="{ index, onItemChange }">
            <q-input
              :name="`learning_outcome_${index}`"
              clearable
              v-model="editStore.learningOutcomes[index]"
              outlined
              dense
              bg-color="white"
              :error="learningOutcomesError"
              :error-message="learningOutcomesErrorMsg"
              @update:model-value="value => onItemChange(index, value as string | null)"
              @blur="onLearningOutcomesChange(editStore.learningOutcomes)"
            />
          </input-list>

          <div class="col-12 q-mt-md">
            <q-icon name="description" size="md" left />
            <span class="vertical-middle text-h6">Description</span>
            <span class="text-negative text-h6"> *</span>
          </div>

          <div class="col-12 q-mb-md">
            <q-editor :class="{ error: descriptionError }" v-model="editStore.description" />

            <div v-show="descriptionError" class="q-ml-sm q-mt-xs text-negative text-caption">
              Description is required
            </div>
          </div>

          <div class="col-12 text-center">
            <q-btn type="submit" icon="edit" label="Edit" color="info" :loading="store.updatingInternship" />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useMeta, type QInput, useQuasar } from 'quasar'
import { isTextEmpty, isArrayEmpty } from 'src/common'
import { allCategories, categoryColor, minAllowance, maxAllowance, allLocations } from 'src/consts/itp-post'
import InputList from 'components/InputList.vue'
import { useInternshipEditStore } from 'stores/itp-post-store'
import AutoNumeric from 'autonumeric'
import { useStore } from 'stores/itp-post-store'

useMeta({ title: 'Edit Internship | MyITPHub' })

const { notify } = useQuasar()
const store = useStore()
const editStore = useInternshipEditStore()
const vacancyCountInput = ref<QInput | null>(null)
const learningOutcomesError = ref(false)
const learningOutcomesErrorMsg = ref('')
const descriptionError = ref(false)

onMounted(() => {
  new AutoNumeric(vacancyCountInput.value?.nativeEl as HTMLElement, null, {
    digitGroupSeparator: '',
    emptyInputBehavior: 'null',
    minimumValue: '0',
    onInvalidPaste: 'ignore',
    outputFormat: 'number',
    selectOnFocus: false,
    decimalPlaces: 0,
  })
})

watch(() => editStore.description, onDescriptionChange)
watch(() => editStore.learningOutcomes, onLearningOutcomesChange)

function onDescriptionChange(value: string | null) {
  descriptionError.value = isTextEmpty(value)
}

function onLearningOutcomesChange(value: string[]) {
  if (value.length === 1 && isTextEmpty(value[0])) {
    learningOutcomesError.value = true
    learningOutcomesErrorMsg.value = 'At least 1 learning outcome is required'
  } else if (new Set(value.map(learningOutcome => learningOutcome.trim())).size !== value.length) {
    learningOutcomesError.value = true
    learningOutcomesErrorMsg.value = 'Duplicate learning outcomes are not allowed'
  } else {
    learningOutcomesError.value = false
  }
}

async function edit() {
  // Validate
  onDescriptionChange(editStore.description)
  onLearningOutcomesChange(editStore.learningOutcomes)

  // Can proceed to add this internship ?
  if (descriptionError.value || learningOutcomesError.value) return

  // Update this internship
  await store.updateInternship(editStore.oldTitle, {
    title: editStore.newTitle,
    company_name: 'CMY Enterprise',
    categories: editStore.categories,
    min_allowance: editStore.allowanceRange.min,
    max_allowance: editStore.allowanceRange.max,
    location: editStore.location,
    learning_outcomes: editStore.learningOutcomes.filter(learningOutcome => !isTextEmpty(learningOutcome)),
    description: editStore.description,
    vacancy_count: Number(editStore.vacancyCount),
  })

  notify({
    type: 'positive',
    message: `Successfully edited internship "${editStore.newTitle}"`,
    icon: 'done',
  })
}
</script>
