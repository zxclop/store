import { Router } from 'express'
import rarityController from '../controllers/rarityController.js'

const router = Router()

router.post('/', rarityController.create)
router.get('/', rarityController.getAll)
router.get('/:id')

export default router
