import { Router } from 'express'
import heroController from '../controllers/heroController.js'
import checkRole from '../middleware/checkRoleMiddleware.js'

const router = Router()

router.post('/', checkRole('ADMIN'), heroController.create)
router.get('/', heroController.getAll)

export default router
