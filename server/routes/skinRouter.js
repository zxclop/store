import { Router } from 'express'
import skinController from '../controllers/skinController.js'
import checkRole from '../middleware/checkRoleMiddleware.js'

const router = Router()

router.post('/', checkRole('ADMIN'), skinController.create)
router.get('/', skinController.getAll)
router.get('/:id', skinController.getOne)
router.patch('/:id', checkRole('ADMIN'), skinController.update)
router.delete('/:id', checkRole('ADMIN'), skinController.delete)

export default router
