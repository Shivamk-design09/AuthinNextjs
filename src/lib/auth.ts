/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
import { connect } from "http2"
import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import connectDb from "./db"
import User from "@/model/User"
import bcrypt from "bcryptjs"

const authoptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials:{
                email:{label:'Email',type:'text'},
                password:{label:'Password',type:'text'}
            },
            //sign karne pe kya karna h
            // 1)email check, 2) password match,3)return an user
           async authorize(credentials,req){
                let email = credentials?.email
                let password = credentials?.password

                if(!email || !password){
                    throw new Error("Email and password not found")
                }

                await connectDb()

                let user = await User.findOne({email})
                if(!user){
                    throw new Error("User not found")
                }


                let isMatch = await bcrypt.compare(password,user.password)
                if(!isMatch){
                    throw new Error("incorrect Password")
                }

                return {
                    id:user._id,
                    name:user.name,
                    email:user.email,
                    image:user.image
                }
            }
        })
    ],
    callbacks: {  // their are two callbacks jwt and sessions
        //whatever we return in authorize it is store in user paramter of jwt
        // what we return will go in token 
        async jwt({token,user}) {
            if(user){
                token.id = user.id
                token.name = user.name
                token.email = user.email
                token.image = user.image
            }
            return token
        },
         //pust user details in session
    session({session,token}){
        if(session.user){
            // id is not in sesstion we will declare a interface for session to declare id in session.user
            //session is Session type in next-auth we are delaring a type in next-auth.d.ts
            session.user.id = token.id as string
            session.user.name = token.name
            session.user.email = token.email
            session.user.image = token.image as string
        }
        return session
    }
    },
    session: { 
        // how we are chossing the session like jwt or database
        strategy:'jwt',
        maxAge:30*24*60*60*1000,  //3o days

    },
    pages: {
        signIn:'/login',
        error:'/login'
    },
    secret:process.env.NEXT_AUTH_SECRET
}

export default authoptions  


//sign in authorize function
//token generated using User.id and all in callbacks
//token will be in cookies so we will set token in session to access
// access user details from frontend
//