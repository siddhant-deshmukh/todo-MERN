import { useContext, useEffect } from 'react'
import TodoItem from './TodoItem'
import axios from 'axios'
import AppContext from '../AppContext'

const TodoList = () => {

  const { todoList, setTodoList, user } = useContext(AppContext)

  useEffect(() => {
    if (user) {
      axios.get(`${import.meta.env.VITE_API_URL}/todos`)
        .then((data) => {
          console.log(data.data)
          setTodoList(data.data)
        })
        .catch(() => {

        })
    }else{
      setTodoList([{title:'A Thing todo', _id:'001', author:'self', desc:'',status:false,time: Date()}])
    }
  }, [user])

  return (
    <div className='w-full flex flex-col border-2 border-gray-300  rounded-xl p-7  space-y-5'>
      <h1 className='text-3xl'>
        The Todos
      </h1>
      {
        todoList.map((todoItem, index) => {
          return <div key={todoItem._id}>
            <TodoItem todoItem={todoItem} index={index} />
          </div>
        })
      }
    </div>
  )
}

export default TodoList