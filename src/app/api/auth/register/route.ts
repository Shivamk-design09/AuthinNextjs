/* eslint-disable @typescript-eslint/no-unused-vars */
import connectDb from "@/lib/db";
import User from "@/model/User";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";


//status code
    //200 - 300 --- success
    //create = 201

    //frontend error == 400-499

    //backend error == 500



// we want data from the user so it is post api
// name will decide the type of this api 
export async function POST(request:NextRequest){
    try{
        const {name,email,password} = await request.json()
       await connectDb()
       // 1st check if user exist or not
       const existUser = await User.findOne({email})
       if(existUser){
        return NextResponse.json(
            {message:"User already exists!"},
            {status:400}
        )
       }
       //password error for length < 6 
       if(password.length<6){
        return NextResponse.json(
            {message:"password must be greater than 6"},
            {status:400}
        )
       }
       const hasedpassword = await bcrypt.hash(password,10)
       const user = await User.create({
        name,
        email,
        password:hasedpassword,
       })
       return NextResponse.json(
        user,
        {status:201}
       )
    }catch(error){
        return NextResponse.json(
            {message:`Register Error ${error}`},
            {status:500}
        )
    }
}


//NextRquest is an object