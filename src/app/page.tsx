/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import Image from 'next/image'
import { signOut, useSession } from 'next-auth/react'
import { useState } from 'react'


export default function Home() {
  const { data } = useSession()
  const [loading, setloading] = useState(false)
  
  const handleSignOut = async()=>{
    setloading(true)
    try{
      await signOut()
      setloading(false)
    }catch(error){
setloading(false)
    }
  }
  
  
  console.log(data)
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-4">
      {data && (
        <div className="w-full max-w-md  border-2  border-white rounded-2xl p-8 shadow-lg text-center relative flex flex-col items-center ">
          {data.user.image &&
            <div className='relative w-[150px] h-[150px] rounded-full border-2 border-white overflow-hidden'>
              <Image src={data.user.image} fill alt='userImage' />
            </div>}
          <h2 className='text-white font-semibold text-2xl my-4'>Welcome {data.user.name}</h2>

          <h3 className='w-full py-2 px-4 bg-white text-black font-semibold rounded-lg hover:bg-red-400  transition-colors'  onClick={handleSignOut}>Sign Out</h3>
        </div>
      )}
      {!data && <div className="text-white  text-2xl ">Loading...</div>}
    </div>
  )
}
