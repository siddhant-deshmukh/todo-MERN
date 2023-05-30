import axios from 'axios'
import React, { useRef, useState } from 'react'

const LoginForm = ({ authToggle, setAuthToggle }: {
  authToggle: boolean,
  setAuthToggle: React.Dispatch<React.SetStateAction<boolean>>
}) => {

  const [errMsg, setErrMsg] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [formType, setFormType] = useState<'login' | 'register'>('register')

  const nameRef = useRef<HTMLInputElement | null>(null)
  const emailRef = useRef<HTMLInputElement | null>(null)
  const passwordRef = useRef<HTMLInputElement | null>(null)

  const Authenticate = () => {
    setLoading(true)
    let name = nameRef.current?.value
    let email = emailRef.current?.value
    let password = passwordRef.current?.value

    if (!email || !password) {
      setErrMsg('Please enter email and password')
      return
    }
    if (!name && formType === 'register') {
      setErrMsg('Name require for registeration')
      return
    }
    if (password.length < 5) {
      setErrMsg('Password must be longer than 5 characters')
      return
    }
    var re = /\S+@\S+\.\S+/;
    if (!re.test(email)) {
      setErrMsg('Enter valid email')
      return
    }

    axios.post(
      `${import.meta.env.VITE_API_URL}/u/${formType === 'login' ? 'login-password' : 'register'}`,
      { name, email, password },
      { withCredentials: true }
    ).then((data) => {
      console.log(data)
    }).catch((err)=>{
      if(err.message){
        setErrMsg(err.message)
      }
      console.error("Error while authenticate",err)
    }).finally(() => {
      setLoading(false)
    })
  }

  return (
    <div className={`${authToggle ? '' : 'hidden'} fixed top-0 left-0 w-screen z-10 flex items-center h-screen bg-black bg-opacity-30`}>

      <button
        className='absolute right-5 top-5 z-20 bg-white rounded-full p-2'
        onClick={() => {
          console.log("Clicking!")
          setAuthToggle(() => false)
        }}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>


      <form className='w-[448px] max-w-full mx-auto border p-5 rounded-2xl shadow-lg  flex flex-col items-center space-y-5 bg-white'>

        <h1 className='text-3xl'>
          TodoApp
        </h1>
        {
          errMsg && errMsg.length > 0 && <div
            className="w-full rounded-lg flex items-center justify-between bg-red-100 pl-5 pr-3 py-1 text-base text-red-700"
            role="alert">
            <span>{errMsg}</span>
            <button
              onClick={(event) => { event.preventDefault(); setErrMsg('') }}
              className="px-2.5 py-1.5 rounded-full hover:bg-red-200">X</button>
          </div>
        }
        {
          formType === 'register' &&
          <div className="flex flex-col w-full">
            <label htmlFor="name" className="font-semibold pl-2 text-gray-700">Name :</label>
            <input id="name" ref={nameRef} type='text' placeholder="Enter your Name" className="p-3 rounded-full border-2 outline-none" />
          </div>
        }
        <div className="flex flex-col w-full">
          <label htmlFor="email" className="font-semibold pl-2 text-gray-700">Email :</label>
          <input id="email" ref={emailRef} type='email' placeholder="Enter your Email" className="p-3 rounded-full border-2 outline-none" />
        </div>
        <div className="flex flex-col w-full">
          <label htmlFor="password" className="font-semibold pl-2 text-gray-700">Password :</label>
          <input id="password" ref={passwordRef} type='password' placeholder="Enter your Password" className="p-3 rounded-full border-2 outline-none" />
        </div>


        <button
          type="submit"
          onClick={(event) => {
            event.preventDefault();
            Authenticate()
          }}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
          {formType === 'login' ? 'Login' : 'Register'}
        </button>
        {
          formType === 'register' &&
          <div className="text-center">
            Already Registered? <br />
            <button className="text-blue-700 font-semibold hover:underline" onClick={() => { setFormType('login') }}>Login</button>
          </div>
        }
        {
          formType === 'login' &&
          <div className="text-center">
            Not Registered? <br />
            <button className="text-blue-700 font-semibold hover:underline" onClick={() => { setFormType('register') }}>Register</button>
          </div>
        }
      </form>

    </div>
  )
}

export default LoginForm