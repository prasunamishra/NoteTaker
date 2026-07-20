import mongoose from "mongoose"
import bcrypt from "bcrypt"

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true  
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true

  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  timestamps: true,
})

const User = mongoose.model("User", userSchema)

User.pre('save',() => {
  if(this.isModified('password')){
    this.password = bcrypt.hashSync(this.password, 10)
  }
})

export default User