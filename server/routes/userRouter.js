import { Router } from 'express'
import userControllers from '../controllers/userController.js'
const router = Router()
router.post('/registration', userControllers.registration)
router.post('/login', userControllers.login)
router.get('/auth', userControllers.check)

export default router
