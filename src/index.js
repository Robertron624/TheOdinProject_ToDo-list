import './global.scss'

import DomManipulator from './DomManipulator'
import Todo from './models/Todo'
import StorageHandler from './StorageHandler'

function main () {
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
  domManipulator.addTodo(todo)
}

window.onload = main
