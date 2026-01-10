/* eslint-disable @typescript-eslint/no-unused-vars */
import { read } from "fs";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";


// req ayegi
// path name next url pe milegi
// api/auth || api/register

export async function proxy(req:NextRequest){
    const {pathname} = req.nextUrl
    const publicRoutes = [
        '/login',
        '/register',
        '/api/auth',
        '/favicon.ico',
        '_next'
    ]
    // if pathname start with publicroutes we will return next()
    if(publicRoutes.some(path=>pathname.startsWith(path))){
        return NextResponse.next()
    }
  
        //if it is other than publicroutes we will protect it
        const token = await getToken({req,secret:process.env.NEXT_AUTH_SECRET})
        //if token is not present and user is trying to access the page we will return him on login and then we will send him back where he came from
       if(!token){
        // URL is buil-in js class that create a full valid url 
        // path = where you want to go=login\\  req.url (current req url)
        // create a new full login url  
        const loginUrl = new URL("/login",req.url)
        // searchParameter are built-in-way to add or read query parameters from a URL
        // callback is url and req.url is value
        loginUrl.searchParams.set('callbackUrl',req.url)
        //NextResponse.redirect expects full url not just path only

        return NextResponse.redirect(loginUrl)
        // http://localhost:3000/login?callbackUrl=http://localhost:3000/about
       }
       return  NextResponse.next()
    
}


//this tells nextjs middleware = on which routes should this middleware run
// * -> every under it
// this means run middlweare on every path

export const config = {
  matcher: [
    // Exclude API routes, static files, image optimizations, and .png files
    '/((?!api|_next/static|_next/image|node_modules|.*\\.png$).*)',
  ],
}

// ?! negetaive look head

// why are api routes are ignored 
// because middleware-based page bec auth and API auth are two different problems
//api routes are not pages = api/login , api/register , api/posts
// they return json , called by fetch api, dont show UI


