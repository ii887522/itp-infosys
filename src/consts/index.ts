export const rowsPerPageOptions = [5, 10, 20, 50, 100]
export const defaultRowsPerPage = 10
export const itemsPerPageOptions = [4, 12, 20, 52, 100]
export const defaultItemsPerPage = 12
export type Status = 'pending' | 'accepted' | 'rejected'

export const statusIcon: { [name: string]: string } = {
  pending: 'pending',
  accepted: 'done',
  rejected: 'close',
}

export const statusColor: { [name: string]: string } = {
  pending: 'info',
  accepted: 'positive',
  rejected: 'negative',
}

export const statusOptions = ['All', 'Pending', 'Accepted', 'Rejected']
export type DateRange = { from: string; to: string } | string | null
