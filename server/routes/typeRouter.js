import { Router } from 'express'
import typeController from '../controllers/typeController.js'

const router = Router()

router.post('/', typeController.create)
router.get('/', typeController.getAll)
router.get('/:id')

export default router
