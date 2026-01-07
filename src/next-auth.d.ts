// we are making this file session interface in auth.ts for session to declare id as session dont have id
// their are two  methods to do it 
// first manually write
// id in  second defaultsession['user]
import { DefaultSession } from "next-auth"

// //1st way
//     declare module 'next-auth'{
//         interface Session{
//             user:{
//                 id:string,
//                 name:string |null |undefined,
//                 email:string |null |undefined,
//                 image:string 
//             }
//         }
//     }


// 2nd way
declare module 'next-auth'{
    interface Session{
        user:{
            id:string
        } & DefaultSession['user']
    }
}

//module export
export { }