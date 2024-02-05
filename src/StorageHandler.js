class StorageHandler {
  constructor () {
    this.storage = window.localStorage
  }

  getTodoList () {
    return JSON.parse(this.storage.getItem('todoList')) || []
  }

  saveTodoList (todoList) {
    this.storage.setItem('todoList', JSON.stringify(todoList))
  }
}

export default StorageHandler
