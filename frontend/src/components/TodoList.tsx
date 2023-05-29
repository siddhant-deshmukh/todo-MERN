import React from 'react'
import { ITodoItem } from '../App'
import TodoItem from './TodoItem'

const TodoList = ({todoList, EditTodos, setTodoList}:{
  todoList: ITodoItem[]
  EditTodos: (index: number, newTodo: ITodoItem) => void,
  setTodoList: React.Dispatch<React.SetStateAction<ITodoItem[]>>
}) => {
  return (
    <div className='w-full flex flex-col border-2 border-gray-300  rounded-xl p-7  space-y-5'>
      <h1 className='text-3xl'>
        The Todos
      </h1>
      {
        todoList.map((todoItem,index)=>{
          return <div key={index}>
            <TodoItem todoItem={todoItem} EditTodos={EditTodos} index={index} setTodoList={setTodoList}/>
          </div>
        })
      }
    </div>
  )
}

export default TodoList