import { defineStore } from 'pinia'
import { ref } from 'vue'
import { type Internship, makeInternship } from 'src/models/itp-post'

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
