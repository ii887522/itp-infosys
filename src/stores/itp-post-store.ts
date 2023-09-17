import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'
import Internship, { makeInternship } from 'src/models/internship'
import type OutgoingApplication from 'src/models/outgoing-application'
import type IncomingApplication from 'src/models/incoming-application'
import { minAllowance, maxAllowance } from 'src/consts/itp-post'
import { type Router } from 'vue-router'
import { api } from 'boot/axios'
import { sortedIndexBy } from 'lodash'
import { type Status } from 'src/consts'

export const useInternshipSearchStore = defineStore('itp-post/internship-search', () => {
  const category = ref('')
  const minAllowance = ref(0)
  const location = ref('')
  const q = ref('')

  function reset() {
    category.value = ''
    minAllowance.value = 0
    location.value = ''
    q.value = ''
  }

  return { category, minAllowance, location, q, reset }
})

export const useInternshipDetailsStudStore = defineStore('itp-post/internship-details-stud', () => {
  const value = ref<Internship>(makeInternship())

  return { value }
})

export const useInternshipDetailsEmpStore = defineStore('itp-post/internship-details-emp', () => {
  const value = ref<Internship>(makeInternship())

  return { value }
})

export const useInternshipEditStore = defineStore('itp-post/internship-edit', () => {
  const oldTitle = ref('')
  const newTitle = ref('')
  const categories = ref<string[]>([])
  const allowanceRange = ref({ min: minAllowance, max: maxAllowance })
  const location = ref('')
  const vacancyCount = ref('')
  const learningOutcomes = ref<string[]>([])
  const description = ref('')

  async function navigate(router: Router, internship: Internship) {
    oldTitle.value = internship.title
    newTitle.value = internship.title
    categories.value = [...internship.categories]

    allowanceRange.value = {
      min: internship.min_allowance ?? minAllowance,
      max: internship.max_allowance ?? maxAllowance,
    }

    location.value = internship.location
    vacancyCount.value = String(internship.vacancy_count)
    learningOutcomes.value = [...internship.learning_outcomes, '']
    description.value = internship.description
    await router.push('/emp/itp-post/internships/edit')
  }

  return {
    oldTitle,
    newTitle,
    categories,
    allowanceRange,
    location,
    vacancyCount,
    learningOutcomes,
    description,
    navigate,
  }
})

export const useInternshipAppQueueStudStore = defineStore('itp-post/internship-app-queue-stud', () => {
  const status = ref('All')
  const q = ref('')

  return { status, q }
})

export const useInternshipAppQueueEmpStore = defineStore('itp-post/internship-app-queue-emp', () => {
  const status = ref('All')
  const q = ref('')

  return { status, q }
})

export const useStore = defineStore('itp-post', () => {
  const internships = ref([])
  const companyPhotoUrl = reactive<{ [companyName: string]: string[] }>({})
  const loadingInternships = ref(false)
  const applyingInternship = ref(false)
  const applications = ref<OutgoingApplication[]>([])
  const loadingApplications = ref(false)
  const cancelingApplication = ref(false)
  const postedInternships = ref<Internship[]>([])
  const loadingPostedInternships = ref(false)
  const postingInternship = ref(false)
  const updatingInternship = ref(false)
  const removingInternship = ref(false)
  const incomingApplications = ref<IncomingApplication[]>([])
  const loadingIncomingApplications = ref(false)
  const updatingApplication = ref(false)

  async function listInternships() {
    if (internships.value.length !== 0) return
    loadingInternships.value = true
    const resp = await api.get('/itp-post/internships')
    internships.value = resp.data
    loadingInternships.value = false
  }

  async function listCompanyPhotos(companyName: string) {
    if (companyPhotoUrl[companyName]) return
    const resp = await api.get(`/itp-post/companies/${companyName}/photos`)
    companyPhotoUrl[companyName] = resp.data
  }

  async function applyInternship({
    company_name,
    internship_title,
    student_id,
    note_to_employer = '',
    resume,
  }: {
    company_name: string
    internship_title: string
    student_id: string
    note_to_employer: string
    resume: File
  }) {
    applyingInternship.value = true

    // Notify the server we want to apply for an internship and receive an S3 presigned post URL from it
    const resp = await api.post(
      `/itp-post/companies/${company_name}/internships/${internship_title}/applications/${student_id}`,
      { note_to_employer }
    )

    // Prepare S3 file upload request
    const payload = new FormData()
    Object.entries(resp.data.resume_upload_url.fields).forEach(([key, value]) => {
      payload.append(key, value as string | Blob)
    })
    payload.append('file', resume)

    // Upload the resume to S3 bucket
    await api.post(resp.data.resume_upload_url.url, payload)

    // Update the list of applications so that the student does not need to refresh the page
    // Can directly append to the end of the list of applications because applications act as a queue means the new
    // application is always at the end
    applications.value.push(resp.data.payload)

    applyingInternship.value = false
  }

  async function listApplications(studentId: string) {
    if (applications.value.length !== 0) return
    loadingApplications.value = true
    const resp = await api.get(`/itp-post/students/${studentId}/applications`)
    applications.value = resp.data
    loadingApplications.value = false
  }

  async function cancelApplication(company_name: string, internship_title: string, student_id: string) {
    cancelingApplication.value = true

    const resp = await api.delete(
      `/itp-post/companies/${company_name}/internships/${internship_title}/applications/${student_id}`
    )

    // Update the list of applications so that the student does not need to refresh the page
    applications.value.splice(
      applications.value.findIndex(
        value => value.title === resp.data.title && value.company_name === resp.data.company_name
      ),
      1
    )

    cancelingApplication.value = false
  }

  async function listPostedInternships(company_name: string) {
    if (postedInternships.value.length !== 0) return
    loadingPostedInternships.value = true
    const resp = await api.get(`/itp-post/companies/${company_name}/internships`)
    postedInternships.value = resp.data
    loadingPostedInternships.value = false
  }

  async function postInternship(value: Internship) {
    postingInternship.value = true

    // Notify the server we want to apply for an internship and receive an S3 presigned post URL from it
    const resp = await api.post('/itp-post/internships', value)

    // Update the list of internships so that the employee does not need to refresh the page
    postedInternships.value.splice(sortedIndexBy(postedInternships.value, resp.data, 'title'), 0, resp.data)

    postingInternship.value = false
  }

  async function editInternship(oldTitle: string, value: Internship) {
    updatingInternship.value = true
    const resp = await api.put(`/itp-post/internships/${oldTitle}`, value)

    // Replace the existing internship so that the employee does not need to refresh the page
    postedInternships.value.splice(
      sortedIndexBy(postedInternships.value, { ...resp.data, title: oldTitle }, 'title'),
      1
    )
    postedInternships.value.splice(sortedIndexBy(postedInternships.value, resp.data, 'title'), 0, resp.data)

    updatingInternship.value = false
  }

  async function removeInternship(company_name: string, internship_title: string) {
    removingInternship.value = false
    const resp = await api.delete(`/itp-post/companies/${company_name}/internships/${internship_title}`)

    // Update the list of internships so that the employee does not need to refresh the page
    postedInternships.value.splice(sortedIndexBy(postedInternships.value, resp.data, 'title'), 1)

    removingInternship.value = true
  }

  async function listIncomingApplications(company_name: string) {
    if (incomingApplications.value.length !== 0) return
    loadingIncomingApplications.value = true
    const resp = await api.get(`/itp-post/companies/${company_name}/applications`)
    incomingApplications.value = resp.data
    loadingIncomingApplications.value = false
  }

  async function updateApplication({
    internshipTitle,
    companyName,
    studentId,
    status,
  }: {
    internshipTitle: string
    companyName: string
    studentId: string
    status: Status
  }) {
    updatingApplication.value = true

    const resp = await api.put(
      `/itp-post/companies/${companyName}/internships/${internshipTitle}/applications/${studentId}`,
      { status }
    )

    // Update the list of internship applications so that the employee does not need to refresh the page
    incomingApplications.value[
      incomingApplications.value.findIndex(
        value => value.title === resp.data.title && value.student_id === resp.data.student_id
      )
    ].status = resp.data.status

    updatingApplication.value = false
  }

  return {
    internships,
    companyPhotoUrl,
    loadingInternships,
    applyingInternship,
    applications,
    loadingApplications,
    cancelingApplication,
    postedInternships,
    loadingPostedInternships,
    postingInternship,
    updatingInternship,
    removingInternship,
    incomingApplications,
    loadingIncomingApplications,
    updatingApplication,
    listInternships,
    listCompanyPhotos,
    applyInternship,
    listApplications,
    cancelApplication,
    listPostedInternships,
    postInternship,
    editInternship,
    removeInternship,
    listIncomingApplications,
    updateApplication,
  }
})
