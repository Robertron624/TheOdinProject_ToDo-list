import './global.scss'

import DomManipulator from './DomManipulator'
import Todo from './models/Todo'
import Project from './models/Project'

import { generateTodoId } from './utils'

function main () {
  const projects = []

  const newTodoButton = document.querySelector('.modal-trigger')
  const modal = document.querySelector('.new-todo-modal')
  const closeModalButton = document.querySelector('.modal-close')

  const domManipulator = new DomManipulator()
  domManipulator.createTodoList()

  const todoExample = new Todo(
    1,
    'Learn JavaScript',
    false,
    new Date(),
    'high',
    'I need to learn JavaScript to build web applications'
  )

  const todoExample2 = new Todo(
    2,
    'Learn React',
    true,
    new Date(),
    'medium',
    'I need to learn React to build scalable web applications'
  )

  const defaultProject = new Project('10', 'Default', 'Default project', [todoExample])
  const exampleProject = new Project('20', 'Example', 'Example project', [todoExample2])

  projects.push(defaultProject)
  projects.push(exampleProject)
  domManipulator.loadProjectsToSidebar(projects)
  domManipulator.setCurrentProject(defaultProject)

  newTodoButton.addEventListener('click', () => {
    modal.showModal()
  })

  closeModalButton.addEventListener('click', () => {
    modal.close()
  })

  // when click outside the modal, close it
  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.close()
    }
  })

  const newTodoForm = document.querySelector('.new-todo-form')

  newTodoForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const newTodoTitle = document.querySelector('#new-todo-title').value
    const newTodoDescription = document.querySelector('#new-todo-description').value
    const newTodoPriority = document.querySelector('#new-todo-priority').value
    const newTodoDueDate = document.querySelector('#new-todo-due-date').value
    const newTodoCompleted = document.querySelector('#new-todo-completed').checked

    const currentProject = domManipulator.getCurrentProject()
    const newTodoId = generateTodoId(currentProject.getTodos())

    const newTodo = new Todo(
      newTodoId,
      newTodoTitle,
      newTodoCompleted,
      new Date(newTodoDueDate),
      newTodoPriority,
      newTodoDescription
    )

    currentProject.addTodo(newTodo)
    domManipulator.renderCurrentProjectTodos()
    domManipulator.clearNewTodoForm(newTodoForm)
    modal.close()
  })
}

window.onload = main
