import './global.scss'

import DomManipulator from './DomManipulator'
import Todo from './models/Todo'
import Project from './models/Project'

function main () {
  const projects = []

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
}

window.onload = main
