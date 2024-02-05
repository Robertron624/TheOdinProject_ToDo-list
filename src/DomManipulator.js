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

    const todoItem = document.createElement('li')
    todoItem.id = `todo-${id}`
    todoItem.className = 'todo-item'

    const todoTitle = document.createElement('h3')
    todoTitle.textContent = title

    const todoDescription = document.createElement('p')
    todoDescription.textContent = description

    const todoDueDate = document.createElement('p')
    todoDueDate.textContent = dueDate

    const todoPriority = document.createElement('p')
    todoPriority.textContent = priority

    const todoCreatedAt = document.createElement('p')
    todoCreatedAt.textContent = createdAt

    const todoCompleted = document.createElement('div')
    const todoCompletedLabel = document.createElement('label')
    todoCompletedLabel.textContent = 'Completed'
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
