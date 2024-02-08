import './global.scss'

import DomManipulator from './DomManipulator'
import StorageHandler from './StorageHandler'
import Todo from './models/Todo'
import Project from './models/Project'

import { generateNewItemId } from './utils'

function main () {
  const projects = []

  const newTodoButton = document.querySelector('.modal-trigger')
  const newTodoModal = document.querySelector('.new-todo-modal')
  const newTodoCloseModalButton = document.querySelector('.modal-close')

  const newProjectButton = document.querySelector('.new-project button')
  const newProjectModal = document.querySelector('.new-project-modal')
  const newProjectCloseModalButton = document.querySelector('.new-project-modal .modal-close')

  const domManipulator = new DomManipulator()
  const storageHandler = new StorageHandler()

  domManipulator.createTodoList()

  const savedProjects = storageHandler.getProjects()

  let toBeDefaultProject = null

  if (savedProjects.length > 0) {
    projects.push(...savedProjects)
    toBeDefaultProject = projects[0]
    console.log('projects loaded from local storage')
  } else {
    console.log('no projects found in local storage, loading example projects')
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

    toBeDefaultProject = defaultProject
  }

  domManipulator.loadProjectsToSidebar(projects)
  domManipulator.setCurrentProject(toBeDefaultProject)

  // Handling new Todo modal

  newTodoButton.addEventListener('click', () => {
    newTodoModal.showModal()
  })

  newTodoCloseModalButton.addEventListener('click', () => {
    newTodoModal.close()
  })

  // when click outside the modal, close it
  window.addEventListener('click', (e) => {
    if (e.target === newTodoModal) {
      newTodoModal.close()
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
    const newTodoId = generateNewItemId(currentProject.getTodos())

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
    domManipulator.clearNewItemForm(newTodoForm)
    newTodoModal.close()
  })

  // Handling new Project modal

  newProjectButton.addEventListener('click', () => {
    newProjectModal.showModal()
  })

  newProjectCloseModalButton.addEventListener('click', () => {
    newProjectModal.close()
  })

  // when click outside the modal, close it
  window.addEventListener('click', (e) => {
    if (e.target === newProjectModal) {
      newProjectModal.close()
    }
  })

  const newProjectForm = document.querySelector('.new-project-form')

  newProjectForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const newProjectTitle = document.querySelector('#new-project-title').value
    const newProjectDescription = document.querySelector('#new-project-description').value

    const newProjectId = generateNewItemId(projects)

    const newProject = new Project(newProjectId, newProjectTitle, newProjectDescription)

    projects.push(newProject)
    domManipulator.loadProjectsToSidebar(projects)
    domManipulator.setCurrentProject(newProject)
    domManipulator.clearNewItemForm(newProjectForm)
    newProjectModal.close()
  })

  // save projects to local storage when page is closed

  window.addEventListener('beforeunload', () => {
    storageHandler.saveProjects(projects)
  })
}

window.onload = main
