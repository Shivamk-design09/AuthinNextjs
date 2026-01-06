/* eslint-disable @typescript-eslint/no-unused-vars */
import mongoose from 'mongoose'

interface userI {
  _id?: mongoose.Types.ObjectId
  name: string
  image: string
  email: string
  password: string
  createdAt?: string
  updatedAt?: string
}
// decalrign the type of this schema
const UserSchema = new mongoose.Schema<userI>(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

const User =mongoose.models.User || mongoose.model('User', UserSchema)
export default User


