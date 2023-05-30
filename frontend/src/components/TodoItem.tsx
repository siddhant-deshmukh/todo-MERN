import React, { useCallback, useState } from 'react'
import { ITodoItem } from '../App'
import axios from 'axios'

const TodoItem = ({ index, todoItem,  setTodoList }: {
  index: number,
  todoItem: ITodoItem,
  setTodoList: React.Dispatch<React.SetStateAction<ITodoItem[]>>
}) => {

  const [editAble, setEditable] = useState<boolean>(false)
  const [editTitle, setEditTile] = useState<string>('')

  const EditTodos = (index: number, newTodo: ITodoItem) => {
    console.log(index, newTodo)
    axios.put(
      `${import.meta.env.VITE_API_URL}/todos/${newTodo._id}`,
      {...newTodo},
      {withCredentials : true}
    ).then(()=>{
      if (index >= 0 && newTodo.title.length > 0) {
        setTodoList((prev) => {
          prev[index] = newTodo
          return [...prev]
        })
      }
    })
  }

  const DeleteTodo = () => {
    axios.delete(`${import.meta.env.VITE_API_URL}/todos/${todoItem._id}`,{withCredentials : true})
      .then((data)=>{
        console.log("DeleteTodo",data)
        setTodoList((prev) => {
          return prev.slice(0, index).concat(prev.slice(index + 1))
        })
      })
  }

  return (
    <div className='w-full border-2 border-gray-200 rounded-xl p-4'>
      <h1 hidden={editAble} className={`text-2xl mb-2 ${todoItem.status?'line-through':''}`}>
        {todoItem.title}
      </h1>
      <input className='text-2xl p-2 outline-none border' hidden={!editAble} value={editTitle} onChange={(event)=>{setEditTile(event.target.value)}} />

      <div className='flex'>
        <div className='w-full text-base text-gray-500'>
          <h2>Author: Meow</h2>
          <h2>Added: {relativeTime(todoItem.time)}</h2>
        </div>

        { !editAble &&
          <div className='flex border-2 mt-auto w-fit '>
            <button
              className='px-2.5 py-1.5 group hover:bg-slate-100'
              onClick={(event) => {
                event.preventDefault();
                EditTodos(index, { ...todoItem, status: !todoItem.status })
              }}>
              <div className={`rounded-full p-1 ${todoItem.status ? 'bg-green-500' : 'bg-gray-500'} `}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="white" className="w-5 h-5 ">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </div>
            </button>
            <button
              className='border-x-2 px-2.5 py-1.5 hover:bg-slate-100'
              onClick={(event)=>{setEditable(prev=>!prev), setEditTile(todoItem.title)}}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
              </svg>
            </button>
            <button
              className='px-2.5 py-1.5 hover:bg-slate-100'
              onClick={(event) => {
                event.preventDefault();
                DeleteTodo()
              }}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="red" viewBox="0 0 24 24" strokeWidth={0.25} stroke="white" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
              </svg>
            </button>
          </div>
        }
        {
          editAble && 
          <button 
            className='flex mt-auto min-w-fit bg-green-600 p-1.5 font-bold  text-gray-100 '
            onClick={()=>{
              setEditable(false)
              EditTodos(index, {...todoItem, title : editTitle})
            }}>
            Save Changes
          </button>
        }
      </div>
    </div>
  )
}

function relativeTime(date : string) {
  // Convert both dates to milliseconds
  let dat = new Date(date)
  let curr_date = new Date()
  let time1 = dat.getTime();
  let time2 = curr_date.getTime();

  let difference = Math.abs(time1 - time2);
  let days = Math.floor(difference / (1000 * 60 * 60 * 24));
  let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  
  if (days > 0) {
    return days + " days ago";
  } else if (hours > 0) {
    return hours + " hours ago";
  } else if (minutes > 0) {
    return minutes + " minutes ago";
  } else {
    return "just now";
  }
}


export default TodoItem 