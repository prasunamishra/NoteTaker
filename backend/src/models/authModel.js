import bcrypt from 'bcrypt'
import User from '../../data/user.js'


export async function register(userDetails) {
  return await User.create(userDetails)
}

export async function login({ email, password }) {
  const user = await User.findOne({ email })
  if (!user) {
    return null
  }
  const isValid = await bcrypt.compare(password, user.password)
  return isValid ? user : null
}