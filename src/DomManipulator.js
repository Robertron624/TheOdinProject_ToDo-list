import { formatDate } from './utils'

class DomManipulator {
  sideBar = document.querySelector('#sidebar')
  projectList = document.querySelector('.project-list')
  content = document.querySelector('#content')

  constructor () {
    this.currentProject = null
    this.todoList = this.#generateTodoList()
  }

  setCurrentProject (project) {
    this.currentProject = project
    const projectTodos = project.getTodos()
    const projectId = project.getId()

    // find all project items and remove the active class
    const projectItems = document.querySelectorAll('.project-item')
    projectItems.forEach(item => {
      item.classList.remove('active')
    })

    // add active class to the current project
    const currentProjectItem = document.getElementById(`project-${projectId}`)
    currentProjectItem.classList.add('active')

    this.clearTodoList()
    projectTodos.forEach(todo => {
      this.addTodo(todo)
    })
  }

  getCurrentProject () {
    return this.currentProject
  }

  renderCurrentProjectTodos () {
    const projectTodos = this.currentProject.getTodos()
    this.clearTodoList()
    projectTodos.forEach(todo => {
      this.addTodo(todo)
    })
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
    todoDueDate.textContent = `Due date: ${formatDate(dueDate)}`

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

    const todoDeleteButton = document.createElement('button')
    todoDeleteButton.className = 'todo-delete-button'
    todoDeleteButton.textContent = 'Delete'
    todoDeleteButton.addEventListener('click', () => {
      this.deleteTodo(id)
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
  }

  getTodoList () {
    return this.todoList
  }

  addProjectToSidebar (project) {
    const { id, title } = project

    const projectItem = document.createElement('div')
    projectItem.className = 'project-item'
    projectItem.id = `project-${id}`
    const projectITemTitle = document.createElement('h3')
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
    projects.forEach(project => {
      this.addProjectToSidebar(project)
    })
  }
}

export default DomManipulator
