import authoptions from "@/lib/auth";
import NextAuth from "next-auth";

//1st import authoptions from auth.ts 
const handler = NextAuth(authoptions)


//handler will run on every signIn and signOut
export {handler as GET,handler as POST}