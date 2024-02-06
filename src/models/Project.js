class Project {
  constructor (id, title, description, todos = []) {
    this.id = id
    this.title = title
    this.description = description
    this.todos = todos
  }

  getId () {
    return this.id
  }

  //  Methods

  addTodo (todo) {
    this.todos.push(todo)
  }

  removeTodo (todo) {
    this.todos = this.todos.filter(t => t !== todo)
  }

  getTodo (id) {
    return this.todos.find(todo => todo.id === id)
  }

  getTodos () {
    return this.todos
  }
}

export default Project
