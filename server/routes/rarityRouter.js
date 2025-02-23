import { Router } from 'express'
import rarityController from '../controllers/rarityController.js'
import checkRole from '../middleware/checkRoleMiddleware.js'

const router = Router()

router.post('/', checkRole('ADMIN'), rarityController.create)
router.get('/', rarityController.getAll)

export default router
