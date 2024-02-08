class Project {
  constructor (id, title, description, todos = []) {
    this.id = id
    this.title = title
    this.description = description
    this.todos = todos
  }

  get id () {
    return this._id
  }

  get title () {
    return this._title
  }

  get description () {
    return this._description
  }

  set id (id) {
    this._id = id
  }

  set title (title) {
    this._title = title
  }

  set description (description) {
    this._description = description
  }

  //  Methods

  addTodo (todo) {
    this.todos.push(todo)
  }

  removeTodo (todoId) {
    this.todos = this.todos.filter(todo => todo.id !== todoId)
  }

  getTodo (id) {
    return this.todos.find(todo => todo.id === id)
  }

  getTodos () {
    return this.todos
  }
}

export default Project
