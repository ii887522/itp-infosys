import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { type DateRange } from 'src/consts'

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
