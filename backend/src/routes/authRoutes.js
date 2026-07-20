import * as authController from '../controllers/authController.js'
import router, { Router } from 'express'

const router = Router()

router.post('/register', authController.registerUser)
router.post('/login', authController.loginUser)

export default router