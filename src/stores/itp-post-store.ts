import { defineStore } from 'pinia'
import { ref } from 'vue'
import { type Internship, makeInternship } from 'src/models/itp-post'
import { minAllowance, maxAllowance } from 'src/consts/itp-post'
import { type Router } from 'vue-router'

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

export const useInternshipDetailsStore = defineStore('itp-post/internship-details', () => {
  const value = ref<Internship>(makeInternship())

  return { value }
})

export const useInternshipEditStore = defineStore('itp-post/internship-edit', () => {
  const title = ref('')
  const categories = ref<string[]>([])
  const allowanceRange = ref({ min: minAllowance, max: maxAllowance })
  const location = ref('')
  const vacancyCount = ref('')
  const learningOutcomes = ref<string[]>([])
  const description = ref('')

  async function navigate(router: Router, internship: Internship) {
    title.value = internship.title
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

  return { title, categories, allowanceRange, location, vacancyCount, learningOutcomes, description, navigate }
})
