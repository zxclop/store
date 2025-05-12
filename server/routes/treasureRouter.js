import { Router } from 'express'
import treasureController from '../controllers/treasureController.js'
import checkRole from '../middleware/checkRoleMiddleware.js'

const router = Router()

router.post('/', checkRole('ADMIN'), treasureController.create)
router.get('/', treasureController.getAll)

export default router
