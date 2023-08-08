export function isTextEmpty(value?: string | null): boolean {
  return value == null || value.trim() === ''
}
