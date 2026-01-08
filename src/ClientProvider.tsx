'use client'
import { SessionProvider } from 'next-auth/react'
import React from 'react'

// when we will wrap the component in this  we will get the children 
const ClientProvider = ({children}:{children:React.ReactNode}) => {
  return (
    <div>
        <SessionProvider>
        {children}
        </SessionProvider>
    </div>
  )
}

export default ClientProvider   

//we are making this seession comp so we can wrap the layout in session bec layout cnat be wraop directly in session 