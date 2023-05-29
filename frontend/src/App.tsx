import { useCallback, useEffect, useState } from 'react'
import TodoForm from './components/TodoForm'
import TodoList from './components/TodoList'

export interface ITodoItem {  
  title:string,
  desc?:string,
  author?:string,
  status:boolean
  time:Date,
}
export interface IUser {  
  name: string,
}

function App() {

  const [todoList, setTodoList] = useState<ITodoItem[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [user, setUser] = useState<IUser | null>(null)

  useEffect(()=>{

  },[])
  
  const EditTodos = useCallback((index : number,newTodo : ITodoItem)=>{
    console.log(index,newTodo)
    if(index >= 0 && newTodo.title.length > 0){
      setTodoList((prev)=>{
        prev[index] = newTodo 
        return [...prev]
      })
    }
  },[todoList])

  return (
    <div className='max-w-7xl mx-auto'>
      <nav className='flex w-full justify-between text-white p-5 bg-[#3f51b5]'>
        <h1 className='text-4xl font-bold'>
          toDoApp
        </h1>
        <div>

        </div>
      </nav>
      <main className='flex flex-col max-w-2xl w-full pt-5 items-center space-y-10 mx-auto'>
        <TodoForm setTodoList={setTodoList}/>
        <TodoList todoList={todoList} EditTodos={EditTodos} setTodoList={setTodoList}/>
      </main>
    </div>
  )
}

export default App
