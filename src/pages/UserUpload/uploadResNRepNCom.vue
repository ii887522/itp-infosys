<template>
  <q-card class="bg-info q-mt-lg q-ml-lg q-mr-lg" style="width: 1500px">
    <q-card-section>
      <div class="text-h5 q-mb-lg q-size-bo">Internship Application</div>

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
          accept=".pdf"
          :rules="[value => !!value || 'Resume is required']"
          :disable="isSubmitClicked1"
        >
          <template #label>
            <q-icon name="attach_file" left size="xs" />
            <span>Resume / CV</span>
            <span class="text-negative"> *</span>
          </template>
        </q-file>

        <div class="text-center">
          <q-btn type="submit" icon="touch_app" label="Save And Submit" color="positive" />
        </div>
      </q-form>
    </q-card-section>
  </q-card>

  <br /><br />

  <q-card class="bg-info q-ml-lg q-mr-lg" style="width: 1500px">
    <q-card-section>
      <div class="text-h5 q-mb-lg">Company Details</div>

      <q-form @submit="CompanyApply">
        <q-input
          class="q-mb-lg"
          name="ComName"
          clearable
          label-slot
          autogrow
          v-model="comName"
          outlined
          bg-color="white"
          :rules="[value => !!value || 'Company Name is required']"
          :disable="isSubmitClicked2"
        >
          <template #label>
            <span>Company Name</span>
            <span class="text-negative"> *</span>
          </template>
        </q-input>

        <q-input
          class="q-mb-lg"
          name="ComAdd"
          clearable
          label-slot
          autogrow
          v-model="comAdd"
          outlined
          bg-color="white"
          :rules="[value => !!value || 'Company Address is required']"
          :disable="isSubmitClicked2"
        >
          <template #label>
            <span>Company Address</span>
            <span class="text-negative"> *</span>
          </template>
        </q-input>

        <q-input
          class="q-mb-lg"
          name="MonAllowance"
          clearable
          label-slot
          autogrow
          v-model="MonAllowance"
          outlined
          bg-color="white"
          :rules="[
            value => !!value || 'Monthly Allowance is required',
            value => /^[0-9]+(\.[0-9]+)?$/.test(value) || 'Please enter a valid number',
          ]"
          :disable="isSubmitClicked2"
        >
          <template #label>
            <span>Monthly Allowance</span>
            <span class="text-negative"> *</span>
          </template>
        </q-input>

        <q-input
          class="q-mb-lg"
          name="ComSuperName"
          clearable
          label-slot
          autogrow
          v-model="ComSuperName"
          outlined
          bg-color="white"
          :rules="[value => !!value || 'Company Supervisor Name is required']"
          :disable="isSubmitClicked2"
        >
          <template #label>
            <span>Company Supervisor Name</span>
            <span class="text-negative"> *</span>
          </template>
        </q-input>

        <q-input
          class="q-mb-lg"
          name="ComSuperEmail"
          clearable
          label-slot
          autogrow
          v-model="ComSuperEmail"
          outlined
          bg-color="white"
          :rules="[
            value => !!value || 'Company Supervisor Email is required',
            value =>
              /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value) || 'Please enter a valid email address',
          ]"
          :disable="isSubmitClicked2"
        >
          <template #label>
            <span>Company Supervisor Email</span>
            <span class="text-negative"> *</span>
          </template>
        </q-input>

        <!-- Upload Company File -->
        <q-file
          class="q-mb-lg"
          name="ComAccept_url"
          max-files="1"
          clearable
          label-slot
          v-model="ComAccept"
          outlined
          counter
          lazy-rules="ondemand"
          bg-color="white"
          accept=".pdf"
          :rules="[value => !!value || 'Com. Acceptance Form is required']"
          :disable="isSubmitClicked2"
        >
          <template #label>
            <q-icon name="attach_file" left size="xs" />
            <span>Com. Acceptance Form</span>
            <span class="text-negative"> *</span>
          </template>
        </q-file>

        <q-file
          class="q-mb-lg"
          name="ParentAckForm_url"
          max-files="1"
          clearable
          label-slot
          v-model="ParentAckForm"
          outlined
          counter
          lazy-rules="ondemand"
          bg-color="white"
          accept=".pdf"
          :rules="[value => !!value || 'Resume is required']"
          :disable="isSubmitClicked2"
        >
          <template #label>
            <q-icon name="attach_file" left size="xs" />
            <span>Parent Ack. Form</span>
            <span class="text-negative"> *</span>
          </template>
        </q-file>

        <q-file
          class="q-mb-lg"
          name="LetterOfIdem_url"
          max-files="1"
          clearable
          label-slot
          v-model="LetterOfIdem"
          outlined
          counter
          lazy-rules="ondemand"
          bg-color="white"
          accept=".pdf"
          :rules="[value => !!value || 'Resume is required']"
          :disable="isSubmitClicked2"
        >
          <template #label>
            <q-icon name="attach_file" left size="xs" />
            <span>Letter of Indemnity</span>
            <span class="text-negative"> *</span>
          </template>
        </q-file>

        <div class="text-center">
          <q-btn type="submit" icon="touch_app" label="Save and Submit" color="positive" />
        </div>
      </q-form>
    </q-card-section>
  </q-card>

  <br /><br />

  <!--Submission of Monthly Report-->
  <q-card class="bg-info q-ml-lg q-mr-lg" style="width: 1500px">
    <q-card-section>
      <div class="text-h5 q-mb-lg">Submission Of Monthly Report</div>

      <br /><br />

      <q-form @submit="MonthlyReportUpload">
        <q-input
          v-model="ReportSubmissionDate"
          bg-color="white"
          label="Submission Date"
          outlined
          :rules="[(val: string) => !!val || 'Please choose a date']"
        >
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy transition-show="scale" transition-hide="scale">
                <q-date
                  class="q-mb-lg"
                  name="ReportDate"
                  clearable
                  label-slot
                  autogrow
                  v-model="ReportSubmissionDate"
                  outlined
                  bg-color="white"
                  label="Submission Date"
                  mask="YYYY-MM-DD"
                  :disable="isSubmitClicked3"
                >
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>

        <br /><br /><br />

        <q-file
          class="q-mb-lg"
          name="monthlyReportPDF_url"
          max-files="1"
          clearable
          label-slot
          v-model="monthlyReportPDF"
          outlined
          counter
          lazy-rules="ondemand"
          bg-color="white"
          accept=".pdf"
          :rules="[value => !!value || 'Monthly Report is required']"
          :disable="isSubmitClicked3"
        >
          <template #label>
            <q-icon name="attach_file" left size="xs" />
            <span>Monthly Report (PDF)</span>
            <span class="text-negative"> *</span>
          </template>
        </q-file>

        <div class="text-center">
          <q-btn type="submit" icon="touch_app" label="Save And Submit" color="positive" />
        </div>
      </q-form>
    </q-card-section>
  </q-card>

  <br /><br /><br />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useStore as useUploadStore } from 'src/stores/upload'
import { useLocalStorageStore } from 'src/stores/localstorage-store'
const uploadStore = useUploadStore()
const lsStore = useLocalStorageStore()

//Resume
const resume = ref()

//Company Details
const ComAccept = ref()
const ParentAckForm = ref()
const LetterOfIdem = ref()
const comName = ref('')
const comAdd = ref('')
const MonAllowance = ref(0)
const ComSuperName = ref('')
const ComSuperEmail = ref('')

const isSubmitClicked1 = ref(false)
const isSubmitClicked2 = ref(false)
const isSubmitClicked3 = ref(false)

//Report
const ReportSubmissionDate = ref('') // Initialize with today's date
const monthlyReportPDF = ref()

async function apply() {
  // Disable input fields when the submit button is clicked
  isSubmitClicked1.value = true
  console.log('apply')
  const studentId = lsStore.getUsername() as string
  await uploadStore.resumeUpload({
    student_id: studentId,
    resume_file: resume.value,
  })
}

async function CompanyApply() {
  // Disable input fields when the submit button is clicked
  isSubmitClicked2.value = true
  console.log('Upload')
  const studentId = lsStore.getUsername() as string
  await uploadStore.companyApply({
    student_id: studentId,
    company_name: comName.value,
    company_address: comAdd.value,
    monthly_allowance: MonAllowance.value,
    company_supervisor_name: ComSuperName.value,
    company_supervisor_email: ComSuperEmail.value,
    company_acc_file: ComAccept.value,
    parent_file: ParentAckForm.value,
    letter_file: LetterOfIdem.value,
  })
}

async function MonthlyReportUpload() {
  // Disable input fields when the submit button is clicked
  isSubmitClicked3.value = true
  console.log('report')
  const studentId = lsStore.getUsername() as string
  await uploadStore.reportUpload({
    student_id: studentId,
    report_file: monthlyReportPDF.value,
    submission_date: ReportSubmissionDate.value,
  })
}
</script>
