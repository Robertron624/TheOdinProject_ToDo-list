export function formatDate (date) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

export function generateNewItemId (items) {
  const ids = items.map(item => item.id)
  const maxId = Math.max(...ids)
  return maxId + 1
}
