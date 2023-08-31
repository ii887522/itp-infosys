<template>
  <q-page padding>
    <q-card class="bg-grey-1">
      <q-card-section>
        <div class="q-mb-md">
          <q-btn class="q-mr-sm" icon="arrow_back" to="/emp/itp-post/internships" size="xl" unelevated round dense />
          <span class="vertical-middle text-h4">Add Internship</span>
        </div>

        <q-form class="row q-col-gutter-md" @submit="add">
          <div class="col-6 q-mb-xs">
            <q-input
              name="title"
              clearable
              autofocus
              label-slot
              v-model="title"
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
              v-model="categories"
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
                :left-label-value="`RM ${allowanceRange.min}`"
                :right-label-value="`RM ${allowanceRange.max}${
                  allowanceRange.max !== maxAllowance ? '' : ' and above'
                }`"
                :min="minAllowance"
                :max="maxAllowance"
                :step="100"
                v-model="allowanceRange"
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
              v-model="location"
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
              v-model="vacancyCount"
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

          <input-list class="col-6 q-mb-xs" v-model="learningOutcomes" v-slot="{ index, onItemChange }">
            <q-input
              :name="`learning_outcome_${index}`"
              clearable
              v-model="learningOutcomes[index]"
              outlined
              dense
              bg-color="white"
              :error="learningOutcomesError"
              error-message="At least 1 learning outcome is required"
              @update:model-value="value => onItemChange(index, value as string | null)"
              @blur="onLearningOutcomesChange(learningOutcomes)"
            />
          </input-list>

          <div class="col-12 q-mt-md">
            <q-icon name="description" size="md" left />
            <span class="vertical-middle text-h6">Description</span>
            <span class="text-negative text-h6"> *</span>
          </div>

          <div class="col-12 q-mb-md">
            <q-editor :class="{ error: descriptionError }" v-model="description" />

            <div v-show="descriptionError" class="q-ml-sm q-mt-xs text-negative text-caption">
              Description is required
            </div>
          </div>

          <div class="relative-position full-width">
            <q-field
              no-error-icon
              name="accept_rules"
              v-model="acceptRules"
              borderless
              :rules="[
                value =>
                  value ||
                  'You must read and agree with the TARUMT industrial training rules and regulations to post a new internship',
              ]"
            >
              <template #control="{ modelValue, emitValue }">
                <q-checkbox :model-value="modelValue" @update:model-value="emitValue">
                  <span>I have read and agree with the</span>
                </q-checkbox>
              </template>
            </q-field>

            <a
              class="q-pl-xs absolute"
              style="text-decoration: underline; left: 246px; bottom: 37.5px"
              href="https://www.tarc.edu.my/files/admissions/termcondition2023/C627BD51-F25B-4CA6-AE5E-A8E19ADF4603.pdf"
              target="_blank"
            >
              TARUMT industrial training rules and regulations
            </a>
          </div>

          <div class="col-12 text-center">
            <q-btn type="submit" icon="add" label="Add" color="positive" />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useMeta, type QInput } from 'quasar'
import { isTextEmpty, isArrayEmpty } from 'src/common'
import { allCategories, categoryColor, minAllowance, maxAllowance, allLocations } from 'src/consts/itp-post'
import InputList from 'components/InputList.vue'
import AutoNumeric from 'autonumeric'

useMeta({ title: 'Add Internship | MyITPHub' })

const vacancyCountInput = ref<QInput | null>(null)
const title = ref('')
const categories = ref([])
const allowanceRange = ref({ min: minAllowance, max: maxAllowance })
const location = ref(allLocations[0])
const learningOutcomes = ref([''])
const learningOutcomesError = ref(false)
const description = ref('')
const descriptionError = ref(false)
const vacancyCount = ref('1')
const acceptRules = ref(false)

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

watch(description, onDescriptionChange)
watch(learningOutcomes, onLearningOutcomesChange)

function onDescriptionChange(value: string | null) {
  descriptionError.value = isTextEmpty(value)
}

function onLearningOutcomesChange(value: string[]) {
  learningOutcomesError.value = value.length === 1 && isTextEmpty(value[0])
}

function add() {
  // Validate
  onDescriptionChange(description.value)
  onLearningOutcomesChange(learningOutcomes.value)

  // Can proceed to add this internship ?
  if (descriptionError.value || learningOutcomesError.value) return

  // Add this internship
  console.log('ADDING INTERNSHIP...')
}
</script>
