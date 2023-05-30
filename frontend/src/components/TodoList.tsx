import React, { useCallback, useEffect } from 'react'
import { ITodoItem } from '../App'
import TodoItem from './TodoItem'
import axios from 'axios'

const TodoList = ({todoList,  setTodoList}:{
  todoList: ITodoItem[]
  setTodoList: React.Dispatch<React.SetStateAction<ITodoItem[]>>
}) => {

  useEffect(()=>{
    axios.get(`${import.meta.env.VITE_API_URL}/todos`)
      .then((data)=>{
        console.log(data.data)
        setTodoList(data.data)
      })
      .catch(()=>{

      })
  },[])
  
  return (
    <div className='w-full flex flex-col border-2 border-gray-300  rounded-xl p-7  space-y-5'>
      <h1 className='text-3xl'>
        The Todos
      </h1>
      {
        todoList.map((todoItem,index)=>{
          return <div key={index}>
            <TodoItem todoItem={todoItem} index={index} setTodoList={setTodoList}/>
          </div>
        })
      }
    </div>
  )
}

export default TodoList