<template>
  <q-dialog ref="dialogRef" persistent @hide="onDialogHide">
    <q-card class="q-dialog-plugin" style="max-width: 768px; width: 768px">
      <q-card-section>
        <div class="text-h5 q-mb-md">Edit Student</div>

        <q-form class="row q-col-gutter-md" autofocus @submit="edit">
          <q-input class="col-6" name="student_id" label-slot v-model="studentId" outlined readonly>
            <template #label>
              <q-icon name="badge" left size="xs" />
              <span>Student ID</span>
            </template>
          </q-input>

          <q-input
            class="col-6"
            name="student_name"
            clearable
            label-slot
            v-model="studentName"
            outlined
            :rules="[value => !isTextEmpty(value) || 'Student name is required']"
          >
            <template #label>
              <q-icon name="person" left size="xs" />
              <span>Student name</span>
              <span class="text-negative"> *</span>
            </template>
          </q-input>

          <q-select
            class="col-6"
            name="faculty"
            behavior="menu"
            label="Faculty"
            v-model="faculty"
            :options="faculties"
            outlined
          />

          <q-input
            class="col-6"
            name="supervisor_name"
            clearable
            label-slot
            v-model="supervisorName"
            outlined
            :rules="[value => !isTextEmpty(value) || 'Supervisor name is required']"
          >
            <template #label>
              <q-icon name="person" left size="xs" />
              <span>Supervisor name</span>
              <span class="text-negative"> *</span>
            </template>
          </q-input>

          <q-input class="col-6" name="company" label-slot v-model="companyName" outlined readonly>
            <template #label>
              <q-icon name="apartment" left size="xs" />
              <span>Company name</span>
            </template>
          </q-input>

          <q-input class="col-6" name="location" label-slot v-model="location" outlined readonly>
            <template #label>
              <q-icon name="location_on" left size="xs" />
              <span>Location</span>
            </template>
          </q-input>

          <q-input class="col-6" name="itp_start_at" label-slot outlined v-model="itpStartAt" readonly>
            <template #label>
              <q-icon name="calendar_month" left size="xs" />
              <span>Internship start date</span>
            </template>

            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                  <q-date v-model="itpStartAt" mask="D/M/YYYY">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>

          <q-input class="col-6" name="itp_end_at" label-slot outlined v-model="itpEndAt" readonly>
            <template #label>
              <q-icon name="calendar_month" left size="xs" />
              <span>Internship end date</span>
            </template>

            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                  <q-date v-model="itpEndAt" mask="D/M/YYYY">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </q-form>
      </q-card-section>

      <!-- buttons example -->
      <q-card-actions align="right">
        <q-btn color="primary" label="Cancel" icon="close" flat @click="onDialogCancel" />
        <q-btn color="primary" label="Edit" icon="edit" @click="onDialogCancel" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, onBeforeMount } from 'vue'
import { useDialogPluginComponent } from 'quasar'
import type Student from 'src/models/itp-prog/student'
import { isTextEmpty, formatTime } from 'src/common'
import { faculties } from 'src/consts/itp-prog'

const props = defineProps<{ value: Student }>()

defineEmits([
  // REQUIRED; need to specify some events that your
  // component will emit through useDialogPluginComponent()
  ...useDialogPluginComponent.emits,
])

const { dialogRef, onDialogHide, /*onDialogOK,*/ onDialogCancel } = useDialogPluginComponent()
// dialogRef      - Vue ref to be applied to QDialog
// onDialogHide   - Function to be used as handler for @hide on QDialog
// onDialogOK     - Function to call to settle dialog with "ok" outcome
//                    example: onDialogOK() - no payload
//                    example: onDialogOK({ /*...*/ }) - with payload
// onDialogCancel - Function to call to settle dialog with "cancel" outcome

// this is part of our example (so not required)
// function onOKClick() {
// on OK, it is REQUIRED to
// call onDialogOK (with optional payload)
// onDialogOK()
// or with payload: onDialogOK({ ... })
// ...and it will also hide the dialog automatically
// }
const studentId = ref('')
const studentName = ref('')
const faculty = ref('')
const location = ref('')
const companyName = ref('')
const supervisorName = ref('')
const itpStartAt = ref('')
const itpEndAt = ref('')

onBeforeMount(() => {
  studentId.value = props.value.student_id
  studentName.value = props.value.student_name
  faculty.value = props.value.faculty
  location.value = props.value.location
  companyName.value = props.value.company_name
  supervisorName.value = props.value.supervisor_name
  itpStartAt.value = formatTime(props.value.itp_start_at, 'D/M/YYYY')
  itpEndAt.value = formatTime(props.value.itp_end_at, 'D/M/YYYY')
})

function edit() {
  console.log('Editing student...')
}
</script>
