import { Router } from 'express'
import skinController from '../controllers/skinController.js'

const router = Router()

router.post('/', skinController.create)
router.get('/', skinController.getAll)
router.get('/:id', skinController.getOne)

export default router
