class Project {
  constructor (title, description, todos = []) {
    this.title = title
    this.description = description
    this.todos = todos
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
