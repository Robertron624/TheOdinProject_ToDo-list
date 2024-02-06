export function formatDate (date) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

export function generateTodoId (todos) {
  const ids = todos.map(todo => todo.id)
  const maxId = Math.max(...ids)
  return maxId + 1
}
