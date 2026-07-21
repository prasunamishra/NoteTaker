import { verifyToken } from '../utils/auth.js'
const authenticate = (req, res, next) => {
  const token = req.headers.authorization
  console.log(token)
  if (!token || !token.startsWith('Bearer '))
    return res.status(401).json({ error: 'Unauthorized' })
  const isValid = verifyToken(token.split(' ')[1])
  if (!isValid) return res.status(401).json({ error: 'Invalid Token' })
  next()
}

export default authenticate
