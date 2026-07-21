import * as authModel from '../models/authModel.js';
import { generateToken } from '../utils/auth.js';

export async function registerUser(req, res) {
  try {
    const { name, email, password } = req.body || {};
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Please provide name, email, and password' });
    }

    const user = await authModel.register(req.body);
    if (user) {
      const token = generateToken(user);
      return res.status(201).json({
        message: 'User registered successfully',
        data: {
          _id: user._id,
          name: user.name,
          email: user.email,
          token,
        },
      });
    }
    return res
      .status(400)
      .json({ error: 'Please provide user details correctly' });
  } catch (error) {
    return res.status(400).json({ error: error.message || 'Registration failed' });
  }
}

export async function loginUser(req, res) {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({ error: 'Please provide email and password' });
    }

    const user = await authModel.login(req.body);
    if (user) {
      const token = generateToken(user);
      return res.status(200).json({
        message: 'User logged in successfully',
        data: {
          _id: user._id,
          name: user.name,
          email: user.email,
          token,
        },
      });
    }
    return res
      .status(401)
      .json({ error: 'Invalid email or password' });
  } catch (error) {
    return res.status(400).json({ error: error.message || 'Login failed' });
  }
}