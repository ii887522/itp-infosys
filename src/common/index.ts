export function isTextEmpty(value?: string | null): boolean {
  return value == null || value.trim() === ''
}

export function isArrayEmpty(value?: unknown[] | null): boolean {
  return value == null || value.length === 0
}
