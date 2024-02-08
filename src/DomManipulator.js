import { formatDate } from './utils'

class DomManipulator {
  sideBar = document.querySelector('#sidebar')
  projectList = document.querySelector('.project-list')
  content = document.querySelector('#content')
  todoList = document.querySelector('#todo-list')
  confirmDeleteModal = document.querySelector('.confirm-delete-modal')

  constructor () {
    this.currentProject = null
  }

  getCurrentProject () {
    return this.currentProject
  }

  getTodoList () {
    return this.todoList
  }

  setCurrentProject (project) {
    this.currentProject = project
    const projectId = this.currentProject.id

    // find all project items and remove the active class
    const projectItems = document.querySelectorAll('.project-item')
    projectItems.forEach(item => {
      item.classList.remove('active')
    })

    // add active class to the current project
    const currentProjectItem = document.getElementById(`project-${projectId}`)
    currentProjectItem.classList.add('active')

    this.clearTodoList()
    this.renderCurrentProjectTodos()
  }

  renderCurrentProjectTodos () {
    const projectTodos = this.currentProject.getTodos()

    if (projectTodos.length === 0) {
      this.renderEmptyTodosMessage()
      return
    }

    this.clearTodoList()
    projectTodos.forEach(todo => {
      this.addTodoToDom(todo)
    })
  }

  createTodoList () {
    this.content.appendChild(this.todoList)
  }

  addTodoToDom (todo) {
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
    todoDueDate.textContent = `Due date: ${formatDate(dueDate)}`

    const todoPriority = document.createElement('p')
    todoPriority.classList.add('todo-priority')
    todoPriority.classList.add(priorityColorClasses[priority])
    todoPriority.innerHTML = `Priority: <span>${priority}</span>`

    const todoCreatedAt = document.createElement('p')
    todoCreatedAt.classList.add('todo-created-at')
    todoCreatedAt.textContent = createdAt

    const todoCompleted = document.createElement('div')
    todoCompleted.className = 'todo-completed flex align-center'
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

    const todoDeleteButton = document.createElement('button')
    todoDeleteButton.className = 'todo-delete-button'
    todoDeleteButton.textContent = 'Delete'
    todoDeleteButton.addEventListener('click', () => {
      this.handleConfirmDeleteModal(id)
    })

    todoItem.appendChild(todoTitle)
    todoItem.appendChild(todoDescription)
    todoItem.appendChild(todoDueDate)
    todoItem.appendChild(todoPriority)
    todoItem.appendChild(todoCreatedAt)
    todoItem.appendChild(todoCompleted)
    todoItem.appendChild(todoDeleteButton)

    return todoItem
  }

  deleteTodo (id) {
    const todo = document.getElementById(`todo-${id}`)
    this.todoList.removeChild(todo)
    this.currentProject.removeTodo(id)
  }

  addProjectToSidebar (project) {
    const { id, title } = project

    const projectItem = document.createElement('div')
    projectItem.className = 'project-item'
    projectItem.id = `project-${id}`
    const projectITemTitle = document.createElement('h3')
    projectITemTitle.className = 'project-item-title word-break'
    projectITemTitle.textContent = title
    projectItem.appendChild(projectITemTitle)

    projectItem.addEventListener('click', () => {
      this.setCurrentProject(project)
    })

    this.projectList.appendChild(projectItem)
  }

  clearTodoList () {
    this.todoList.innerHTML = ''
  }

  loadProjectsToSidebar (projects) {
    this.projectList.innerHTML = ''
    projects.forEach(project => {
      this.addProjectToSidebar(project)
    })
  }

  clearNewItemForm (form) {
    form.reset()
  }

  renderEmptyTodosMessage () {
    const emptyTodosMessage = document.createElement('p')
    emptyTodosMessage.className = 'empty-todos-message full-width text-center'
    emptyTodosMessage.innerHTML = 'There are no todos in this project. </br> Add a new todo to get started.'
    this.todoList.appendChild(emptyTodosMessage)
  }

  handleConfirmDeleteModal (todoId) {
    this.confirmDeleteModal.showModal()
    const confirmDeleteButton = document.querySelector('.confirm-delete-modal .confirm-delete')
    const cancelDeleteButton = document.querySelector('.confirm-delete-modal .cancel-delete')
    confirmDeleteButton.addEventListener('click', () => {
      this.deleteTodo(todoId)
      this.confirmDeleteModal.close()
    })

    cancelDeleteButton.addEventListener('click', () => {
      this.confirmDeleteModal.close()
    })
  }
}

export default DomManipulator
