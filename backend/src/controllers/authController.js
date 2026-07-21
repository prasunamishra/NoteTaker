import * as authModel from '../models/authModel.js';
import { generateToken } from '../utils/auth.js';

export async function registerUser(req, res) {
  const user = await authModel.register(req.body)
  if (user) {
    const token = generateToken(user)
    return res.status(201).json({
      message: 'User registered successfully',
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        token,
      },
    })
  }
  return res
    .status(400)
    .json({ error: 'Please provide user details correctly' })
}

export async function loginUser(req, res) {
  const user = await authModel.login(req.body)
  if (user) {
    const token = generateToken(user)
    return res.status(201).json({
      message: 'User logged in successfully',
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        token,
      },
    })
  }
  return res
    .status(400)
    .json({ error: 'Please provide user details correctly' })
}