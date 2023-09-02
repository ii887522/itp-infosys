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
          accept="application/pdf"
          hint="Only PDF format is accepted"
          :rules="[value => value || 'Resume is required']"
        >
          <template #label>
            <q-icon name="attach_file" left size="xs" />
            <span>Resume / CV PDF file</span>
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
          <q-btn
            type="submit"
            icon="touch_app"
            label="Apply For This Internship Now"
            color="primary"
            :loading="store.applyingInternship"
          />
        </div>
      </q-form>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useStore } from 'stores/itp-post-store'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'

const props = defineProps<{ companyName: string; internshipTitle: string; studentId: string }>()

const store = useStore()
const router = useRouter()
const { notify } = useQuasar()

const resume = ref()
const remarks = ref('')

async function apply() {
  await store.applyInternship({
    company_name: props.companyName,
    internship_title: props.internshipTitle,
    student_id: props.studentId,
    note_to_employer: remarks.value,
    resume: resume.value,
  })

  router.back()

  notify({
    type: 'positive',
    message: `Successfully applied internship "${props.internshipTitle}" in ${props.companyName}`,
    icon: 'done',
  })
}
</script>
