import { Router } from 'express'
import heroRouter from './heroRouter.js'
import rarityRouter from './rarityRouter.js'
import skinRouter from './skinRouter.js'
import typeRouter from './typeRouter.js'
import userRouter from './userRouter.js'

const router = Router()

router.use('/user', userRouter)
router.use('/type', typeRouter)
router.use('/hero', heroRouter)
router.use('/rarity', rarityRouter)
router.use('/skin', skinRouter)

export default router
