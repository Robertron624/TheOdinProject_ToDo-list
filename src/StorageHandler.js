import Todo from './models/Todo'
import Project from './models/Project'

class StorageHandler {
  constructor () {
    this.storage = window.localStorage
  }

  getProjects () {
    const projectsFromLocalStorage = this.storage.getItem('projects')
    const projects = []

    if (projectsFromLocalStorage) {
      const parsedProjects = JSON.parse(projectsFromLocalStorage)
      parsedProjects.forEach((project) => {
        const { _id, _title, _description, todos } = project
        const tempProject = new Project(_id, _title, _description)

        todos.forEach((todo) => {
          const {
            _id,
            _title,
            _completed,
            _dueDate,
            _priority,
            _description
          } = todo

          const tempTodo = new Todo(
            _id,
            _title,
            _completed,
            new Date(_dueDate),
            _priority,
            _description
          )

          tempProject.addTodo(tempTodo)
        })

        projects.push(tempProject)
      })
    }

    return projects
  }

  saveProjects (projects) {
    this.storage.setItem('projects', JSON.stringify(projects))
  }
}

export default StorageHandler
