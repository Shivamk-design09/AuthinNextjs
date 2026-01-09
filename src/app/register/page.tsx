 /* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import axios from 'axios'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { FcGoogle } from 'react-icons/fc'

const Register = () => {
  const [name, setname] = useState('')
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const router = useRouter()
  const handlerRegister = async(e:React.FormEvent)=>{
    e.preventDefault()
    try{
      const result = await axios.post('/api/auth/register',{
        name,email,password
      })
      router.push('/login')
    }catch(error){
      console.log(error)
    }  
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white px-4">
      <div className="w-full max-w-md border-2 border-white rounded-2xl p-8 shadow-lg bg-gray-900">
        <h1 className="text-2xl font-semibold text-center mb-6">Register</h1>
        <form className="space-y-6" onSubmit={handlerRegister}>
          <div>
            <label className="block mb-1 font-medium ">Name</label>
            <input
              type="text"
              placeholder="Enter name"
              className="w-full border-b border-white py-2 px-1 bg-gray-900 text-white outline-none placeholder-gray-400"
              value={name}
              onChange={(e) => setname(e.target.value)}
            />
          </div>
          <div>
            <label className="block mb-1 font-medium ">Email</label>
            <input
              type="text"
              placeholder="Enter email"
              className="w-full border-b border-white py-2 px-1 bg-gray-900 text-white outline-none placeholder-gray-400"
              value={email}
              onChange={(e) => setemail(e.target.value)}
            />
          </div>{' '}
          <div>
            <label className="block mb-1 font-medium ">Password</label>
            <input
              type="text"
              placeholder="Enter password"
              className="w-full border-b border-white py-2 px-1 bg-gray-900 text-white outline-none placeholder-gray-400"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
            />
          </div>
          <p className="text-sm text-center mt-1 ">
            Already have an account ?
            <span onClick={()=>router.push('/login')} className="text-blue-400 hover:underline">login</span>
          </p>
          <button type='submit' className="w-full py-2 bg-white text-black font font-semibold rounded-lg hover:bg-green-300 transition-colors">
            Register
          </button>
        </form>

        <div className="flex items-center gap-5 justify-center mb-5">
          <hr className="flex-grow border-gray-500 " />
          <span>OR</span>
          <hr className="flex-grow border-gray-500  " />
        </div>

        <button className="flex w-full items-center  justify-center gap-2 py-2 px-4 border border-gray-500 rounded-lg bg-white text-black hover:bg-green-300 transition-colors"
         onClick={async ()=>{
           await signIn('google',{
            callbackUrl:"/"
           })
           }}>
          <span>sign Up with Google</span> <FcGoogle />
        </button>
      </div>
    </div>
  )
}

export default Register
