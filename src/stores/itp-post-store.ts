import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useInternshipSearchStore = defineStore('itp-post/internship-search', () => {
  const category = ref('')
  const minAllowance = ref(0)
  const location = ref('')
  const q = ref('')

  return { category, minAllowance, location, q }
})
