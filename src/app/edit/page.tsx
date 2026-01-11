/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import { useSession } from "next-auth/react";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { CgProfile } from "react-icons/cg";
import { useState } from "react";
import { url } from "inspector";
const Page = () => {
    const {data} = useSession()
    const [name, setname] = useState(" ")
    const [frontendImage, setFrontendImage] = useState('')
    const [backendimage, setBackendImage] = useState<File>()
    const imageInput = useRef<HTMLInputElement>(null)
    

    // we will get e.target.file and on 0 index we will get the complete file
   const handleImage =(e:React.ChangeEvent<HTMLInputElement>)=>{
    const files = e.target.files
    if(!files || files.length == 0) return
    const file = files[0]
    setBackendImage(file)
    setFrontendImage(URL.createObjectURL(file))
    console.log(URL.createObjectURL(file))
   }
   //createbrowser url cretetemp url for local like image and more so browser can preview them without uploading 

     
    useEffect(()=>{
        if(data){
            setname(data?.user.name as string)
            setFrontendImage(data?.user.image as string)
        }
    },[data])
    

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white px-4">
      <div className="w-full max-w-md border-2 border-white rounded-2xl p-8 shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-4">Edit Profile</h2>

        <form className="space-y-4 flex flex-col items-center w-full">
          <div className="overflow-hidden w-[100px] h-[100px] rounded-full border-2 relative border-white flex items-center justify-center" onClick={()=>imageInput.current?.click()}>
            <input type="file" accept="image/*"  hidden ref={imageInput}  onChange={handleImage}/>
         {frontendImage? 
         <Image  src={frontendImage} alt="UserImage" fill />: <CgProfile/>
         }
          </div>
          <div>
            <label className="block mb-1 font-medium">Name</label>
            <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e)=>setname(e.target.value)}
            className="w-full border-b border-white py-2 px-1 bg-gray-400 text-white outline-none placeholder-blue-600"
          />
          </div>
          
          <button type="submit" className="w-full mt-2 bg-white text-black py-2 rounded-lg font-semibold">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default Page;
