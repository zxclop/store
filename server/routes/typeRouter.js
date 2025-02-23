import { Router } from 'express'
import typeController from '../controllers/typeController.js'
import checkRole from '../middleware/checkRoleMiddleware.js'

const router = Router()

router.post('/', checkRole('ADMIN'), typeController.create)
router.get('/', typeController.getAll)

export default router
