import React, { useState } from 'react'
import { ITodoItem } from './App'

const TodoForm = ({setTodoList}: {
  setTodoList: React.Dispatch<React.SetStateAction<ITodoItem[]>>
}) => {
  const [newTodo,setNewTodo] = useState<string>('')
  return (
    <div className='w-full flex border border-gray-300 shadow-xl rounded-xl p-7 items-center space-x-5'>
      <input 
        value={newTodo} 
        onChange={(event)=>{setNewTodo(event.target.value)}}
        className='w-full border-2 px-3 py-5 outline-none  text-xl' placeholder='Enter a todo' />
      <button 
        className='w-[60px] h-[60px] bg-[#3f51b5] p-2'
        onClick={(event)=>{
          event.preventDefault();
          if(newTodo.length > 0){
            setTodoList((prev)=>{
              let new_ : ITodoItem[] = [{title : newTodo, time: new Date(), status: false}]
              return new_.concat([...prev])
            })
            setNewTodo('')
          }
        }}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#3f51b5" className="w-full h-full">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
        </svg>
      </button>
    </div>
  )
}

export default TodoForm