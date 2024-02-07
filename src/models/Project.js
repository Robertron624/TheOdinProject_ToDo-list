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
    console.info('Todo added to project, todos now: ', this.todos)
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
