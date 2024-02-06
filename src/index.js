import './global.scss'

import DomManipulator from './DomManipulator'
import Todo from './models/Todo'
import StorageHandler from './StorageHandler'
import Project from './models/Project'

function main () {
  let currentProject = null
  const projects = []

  const domManipulator = new DomManipulator()
  const storageHandler = new StorageHandler()

  const todosFromStorage = storageHandler.getTodoList()

  if (todosFromStorage.length > 0) {
    todosFromStorage.forEach(todo => {
      domManipulator.addTodo(todo)
    })
  }

  const todo = new Todo(
    1,
    'Learn JavaScript',
    false,
    new Date(),
    'high',
    'I need to learn JavaScript to build web applications'
  )
  domManipulator.createTodoList()

  const defaultProject = new Project('Default', 'Default project', [todo])
  projects.push(defaultProject)
  currentProject = defaultProject
  const currentProjectTodos = currentProject.getTodos()

  domManipulator.loadProjectsToSidebar(projects)

  currentProjectTodos.forEach(todo => {
    domManipulator.addTodo(todo)
  })
}

window.onload = main
