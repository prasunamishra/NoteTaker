import { verifyToken } from '../utils/auth.js'
const authenticate = (req, res, next) => {
  const token = req.headers.authorization
  if (!token || !token.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: No token provided' })
  }

  try {
    const tokenString = token.split(' ')[1]
    const decoded = verifyToken(tokenString)
    req.user = decoded
    next()
  } catch (error) {
    return res.status(401).json({ error: 'Invalid or expired token' })
  }
}

export default authenticate
