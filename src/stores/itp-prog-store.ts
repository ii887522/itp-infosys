import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { type DateRange } from 'src/consts'
import { api } from 'boot/axios'
import { sortedIndexBy } from 'lodash'
import type Student from 'src/models/itp-prog/student'
import { Evaluation } from 'src/models/evaluation'
import { Evaluation2 } from 'src/models/evaluation'

export const useStudListStore = defineStore('itp-prog/stud-list', () => {
  const faculty = ref('ALL')
  const internshipDateRange = ref<DateRange | null>(null)
  const q = ref('')

  const internshipDateRangeText = computed(() => {
    if (internshipDateRange.value == null) return 'ALL'
    else if (typeof internshipDateRange.value === 'string') return internshipDateRange.value
    else return `${internshipDateRange.value.from} - ${internshipDateRange.value.to}`
  })

  return { faculty, internshipDateRange, internshipDateRangeText, q }
})

export const useStore = defineStore('itp-prog', () => {
  const students = ref<Student[]>([])
  const loadingStudents = ref(false)
  const updatingStudent = ref(false)
  const removingStudent = ref(false)
  const evaluationFormStudent = ref(false)
  const reportStudent = ref(false)
  const name = ref('')
  const email = ref('')
  const faculty = ref('')
  const supervisor = ref('')
  const companyName = ref('')
  const satisfaction = ref('')
  const satisfaction2 = ref('')
  const satisfaction3 = ref('')
  const satisfaction4 = ref('')
  const satisfaction5 = ref('')
  const satisfaction6 = ref('')
  const satisfaction7 = ref('')
  const satisfaction8 = ref('')
  const satisfaction9 = ref('')
  const satisfaction10 = ref('')
  const satisfaction11 = ref('')
  const satisfaction12 = ref('')
  const satisfaction13 = ref('')
  const satisfaction14 = ref('')
  const comments = ref('')
  const fileUploaded = ref(false)
  const uploadedFileName = ref(false)
  const uploadedFileSize = ref(false)

  async function listStudents() {
    if (students.value.length !== 0) return
    loadingStudents.value = true
    const resp = await api.get('/itp-prog/students')
    students.value = resp.data
    loadingStudents.value = false
  }

  async function updateStudent(student: Student) {
    updatingStudent.value = true
    const resp = await api.put(`/itp-prog/students/${student.student_id}`, student)

    // Update the list of students so that the admin does not need to refresh the page
    students.value[sortedIndexBy(students.value, resp.data, 'student_id')] = resp.data

    updatingStudent.value = false
  }

  async function removeStudent(studentId: string) {
    removingStudent.value = true
    const resp = await api.delete(`/itp-prog/students/${studentId}`)

    // Update the list of students so that the admin does not need to refresh the page
    students.value.splice(sortedIndexBy(students.value, resp.data, 'student_id'), 1)

    removingStudent.value = false
  }

  async function evaluationStudent(value: Evaluation) {
    evaluationFormStudent.value = true
    const resp = await api.post('/itp-prog/evaluation', value)
    evaluationFormStudent.value = false
  }

  async function evaluationStudent2(value: Evaluation2) {
    if (!value.file) return

    reportStudent.value = true
    const resp = await api.post('/itp-prog/report', value)

    // Prepare S3 file upload request
    const payload = new FormData()
    Object.entries(resp.data.uploadReport.fields).forEach(([key, value]) => {
      payload.append(key, value as string | Blob)
    })
    payload.append('file', value.file)

    // Upload the resume to S3 bucket
    await api.post(resp.data.uploadReport.url, payload)
    reportStudent.value = false
  }

  return {
    students,
    loadingStudents,
    updatingStudent,
    removingStudent,
    listStudents,
    updateStudent,
    removeStudent,
    evaluationFormStudent,
    evaluationStudent,
    evaluationStudent2,
    reportStudent,
    name,
    email,
    faculty,
    supervisor,
    companyName,
    satisfaction,
    satisfaction2,
    satisfaction3,
    satisfaction4,
    satisfaction5,
    satisfaction6,
    satisfaction7,
    satisfaction8,
    satisfaction9,
    satisfaction10,
    satisfaction11,
    satisfaction12,
    satisfaction13,
    satisfaction14,
    comments,
    fileUploaded,
    uploadedFileName,
    uploadedFileSize,
  }
})
