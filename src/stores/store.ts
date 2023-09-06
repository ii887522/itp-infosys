import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useStore = defineStore('index', () => {
  const seed = ref(Date.now())

  return { seed }
})
