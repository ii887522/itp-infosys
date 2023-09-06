import { sortedIndexBy, type NotVoid, type PropertyName } from 'lodash'
import { date } from 'quasar'

export function isTextEmpty(value?: string | null): boolean {
  return value == null || value.trim() === ''
}

export function isArrayEmpty(value?: unknown[] | null): boolean {
  return value == null || value.length === 0
}

export function sortedFindBy<T extends { [key: PropertyName]: unknown }>(
  array: T[],
  value: T,
  iteratee: ((value: T) => NotVoid) | PropertyName
): number {
  if (array.length === 0) return -1

  const index = sortedIndexBy(array, value, iteratee)
  if (index === array.length) return -1

  if (typeof iteratee === 'function') {
    return iteratee(array[index]) === iteratee(value) ? index : -1
  } else {
    return array[index][iteratee] === value[iteratee] ? index : -1
  }
}

export function formatTime(timestamp: number, format = 'YYYY-MM-DD HH:mm:ss'): string {
  return date.formatDate(timestamp * 1000, format)
}
