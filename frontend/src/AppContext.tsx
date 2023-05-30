import React, { useEffect, useState } from "react";
import { ITodoItem, IUser } from "./types";

export const AppContext = React.createContext<{
  user: IUser | null,
  authLoading: boolean
  todoList: ITodoItem[],
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>,
  setAuthLoading: (value: React.SetStateAction<boolean>) => void
  setTodoList: React.Dispatch<React.SetStateAction<ITodoItem[]>>,
}>({
  user: null,
  todoList: [],
  authLoading: true,
  setUser: () => { },
  setTodoList: () => { },
  setAuthLoading: () => { },
})

//@ts-ignore
export const AppContextProvider = ({ children }) => {

  const [user, setUser] = useState<IUser | null>(null)
  const [todoList, setTodoList] = useState<ITodoItem[]>([])
  const [authLoading, setAuthLoading] = useState<boolean>(true)


  useEffect(() => {
    setAuthLoading(true)
    fetch(`${import.meta.env.VITE_API_URL}/`, {
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => {
        if (data && data.user && data.user._id) {
          setUser(data.user)
        } else {
          setUser(null)
        }
      })
      .finally(() => {
        setAuthLoading(false)
      })
  }, [])

  return (
    <AppContext.Provider value={{ user, setUser, authLoading, setAuthLoading, todoList, setTodoList }}>
      {children}
    </AppContext.Provider>
  )
}

export default AppContext