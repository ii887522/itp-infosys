<template>
  <q-card class="bg-amber-1">
    <q-card-section>
      <div class="text-h5 q-mb-lg">Internship Application</div>

      <q-form @submit="apply">
        <q-file
          class="q-mb-lg"
          name="resume_url"
          max-files="1"
          clearable
          label-slot
          v-model="resume"
          outlined
          counter
          lazy-rules="ondemand"
          bg-color="white"
          :rules="[value => value || 'Resume is required']"
        >
          <template #label>
            <q-icon name="attach_file" left size="xs" />
            <span>Resume / CV</span>
            <span class="text-negative"> *</span>
          </template>
        </q-file>

        <q-input
          class="q-mb-lg"
          name="remarks"
          clearable
          label-slot
          autogrow
          v-model="remarks"
          outlined
          bg-color="white"
        >
          <template #label>
            <q-icon name="description" left size="xs" />
            <span>Note to Employer</span>
          </template>
        </q-input>

        <div class="text-center">
          <q-btn type="submit" icon="touch_app" label="Apply For This Internship Now" color="primary" />
        </div>
      </q-form>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const resume = ref()
const remarks = ref('')

function apply() {
  console.log('APPLY FOR THIS INTERNSHIP NOW')
}
</script>
