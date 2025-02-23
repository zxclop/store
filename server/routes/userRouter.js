import { Router } from 'express'
import userController from '../controllers/userController.js'
import authMiddlware from '../middleware/authMiddlware.js'

const router = Router()

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.get('/auth', authMiddlware, userController.check)

export default router
