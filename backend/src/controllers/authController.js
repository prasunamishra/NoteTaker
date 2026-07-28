import * as authModel from '../models/authModel.js';
import { generateToken } from '../utils/auth.js';

const cookieOptions = {
  httpOnly: true,
  maxAge: 24 * 60 * 60 * 1000, // 1 day
  sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
  secure: process.env.NODE_ENV === 'production',
};

export async function registerUser(req, res) {
  try {
    const { name, email, password } = req.body || {};
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Please provide name, email, and password' });
    }

    const user = await authModel.register(req.body);
    if (user) {
      const token = generateToken(user);
      res.cookie('token', token, cookieOptions);

      return res.status(201).json({
        message: 'User registered successfully',
        token,
        data: {
          _id: user._id,
          name: user.name,
          email: user.email,
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
      res.cookie('token', token, cookieOptions);
      return res.status(200).json({
        message: 'User logged in successfully',
        token,
        data: {
          _id: user._id,
          name: user.name,
          email: user.email,
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

export async function logoutUser(req, res) {
  try {
    res.clearCookie('token', {
      httpOnly: true,
      sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
      secure: process.env.NODE_ENV === 'production',
    });
    return res.status(200).json({ message: 'User logged out successfully' });
  } catch (error) {
    return res.status(400).json({ error: error.message || 'Logout failed' });
  }
}