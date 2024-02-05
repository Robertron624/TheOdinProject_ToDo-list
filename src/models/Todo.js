class Todo {
  constructor (id, title, completed, dueDate, priority, description) {
    this.id = id
    this.title = title
    this.completed = completed
    this.dueDate = dueDate
    this.priority = priority
    this.description = description
    this.cretedAt = new Date()
  }

  // getters

  get id () {
    return this._id
  }

  get title () {
    return this._title
  }

  get completed () {
    return this._completed
  }

  get dueDate () {
    return this._dueDate
  }

  get priority () {
    return this._priority
  }

  get description () {
    return this._description
  }

  get createdAt () {
    return this._createdAt
  }

  // setters

  set id (id) {
    this._id = id
  }

  set title (title) {
    this._title = title
  }

  set completed (completed) {
    this._completed = completed
  }

  set dueDate (dueDate) {
    this._dueDate = dueDate
  }

  set priority (priority) {
    this._priority = priority
  }

  set description (description) {
    this._description = description
  }

  // methods

  toggleCompleted () {
    this.completed = !this.completed
  }
}

export default Todo
