import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { type DateRange } from 'src/consts'
import { api } from 'boot/axios'
import { sortedIndexBy } from 'lodash'
import type Student from 'src/models/itp-prog/student'

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

  return { students, loadingStudents, updatingStudent, removingStudent, listStudents, updateStudent, removeStudent }
})
