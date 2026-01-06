/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
//express method to connect to db
// step-1 import mongooe form 'mongoose'
// step-2 mongoose.connect("mongodb url")

import { connect } from 'mongoose'

let mongodbUrl = process.env.MONGODB_URI
// check if mongodb is connected or not
if (!mongodbUrl) {
  throw new Error('Mongodb url is not found')
}

// get connection from global
// now we can get conn and promise from cached
let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

const connectDb = async () => {
  //1)if mongodb is already connected then return from here
  if (cached.conn) {
    return cached.conn
  }

  // if it is not in promise and already connectd then run (mongdb connect)
  // we are not getting it in await because we want to solve it 
  if (!cached.promise) {
    cached.promise = connect(mongodbUrl).then((c) => c.connection)
  }

  //2) if it is in promise await it and get it in cached.conn
  try {
    cached.conn = await cached.promise
  } catch (error) {
    throw error
  }
  return cached.conn
}

export default connectDb
