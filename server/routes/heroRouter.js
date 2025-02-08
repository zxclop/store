import { Router } from 'express'
import heroController from '../controllers/heroController.js'

const router = Router()

router.post('/', heroController.create)
router.get('/', heroController.getAll)
router.get('/:id')

export default router
