import { Connection } from "mongoose";


declare global{
    var mongoose:{
        conn:Connection | null,
        promise:Promise<Connection> |null
    }
}

// we have to things
// first weather we are connect to mongoodb 
// second or it is in promise



// we are exporting it as module to so we can access it anywhere
export {}