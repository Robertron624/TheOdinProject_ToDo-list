class DomManipulator {
  content = document.querySelector('#content')

  constructor () {
    this.todoList = this.#generateTodoList()
  }

  #generateTodoList () {
    const todoList = document.createElement('ul')
    todoList.id = 'todo-list'
    todoList.className = 'todo-list'
    return todoList
  }

  createTodoList () {
    this.content.appendChild(this.todoList)
  }

  addTodo (todo) {
    this.todoList.appendChild(this.generateTodoItem(todo))
  }

  generateTodoItem (todo) {
    const { id, title, completed, dueDate, priority, description, createdAt } = todo

    const priorityColorClasses = {
      high: 'todo-priority-high',
      medium: 'todo-priority-medium',
      low: 'todo-priority-low'
    }

    const todoItem = document.createElement('li')
    todoItem.id = `todo-${id}`
    todoItem.className = 'todo-item'

    const todoTitle = document.createElement('h3')
    todoTitle.className = 'todo-title'
    todoTitle.textContent = title

    const todoDescription = document.createElement('p')
    todoDescription.className = 'todo-description'
    todoDescription.textContent = description

    const todoDueDate = document.createElement('p')
    todoDueDate.classList.add('todo-due-date')
    todoDueDate.textContent = dueDate

    const todoPriority = document.createElement('p')
    todoPriority.classList.add('todo-priority')
    todoPriority.classList.add(priorityColorClasses[priority])
    todoPriority.innerHTML = `Priority: <span>${priority}</span>`

    const todoCreatedAt = document.createElement('p')
    todoCreatedAt.classList.add('todo-created-at')
    todoCreatedAt.textContent = createdAt

    const todoCompleted = document.createElement('div')
    todoCompleted.classList.add('todo-completed')
    const todoCompletedLabel = document.createElement('label')
    todoCompletedLabel.textContent = 'Completed?'
    const todoCompletedCheckbox = document.createElement('input')
    todoCompletedCheckbox.type = 'checkbox'
    todoCompletedCheckbox.checked = completed
    todoCompletedCheckbox.addEventListener('change', () => {
      todo.completed = todoCompletedCheckbox.checked
    })
    todoCompleted.appendChild(todoCompletedLabel)
    todoCompleted.appendChild(todoCompletedCheckbox)

    todoItem.appendChild(todoTitle)
    todoItem.appendChild(todoDescription)
    todoItem.appendChild(todoDueDate)
    todoItem.appendChild(todoPriority)
    todoItem.appendChild(todoCreatedAt)
    todoItem.appendChild(todoCompleted)

    return todoItem
  }

  deleteTodo (id) {
    const todo = document.getElementById(`todo-${id}`)
    this.todoList.removeChild(todo)
  }

  getTodoList () {
    return this.todoList
  }
}

export default DomManipulator
