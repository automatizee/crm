import { Router } from 'express'
import { AuthController } from '../controllers/auth.controller'
import { authenticate } from '../middlewares/auth'

const router = Router()
const authController = new AuthController()

router.post('/login', (req, res, next) => {
  authController.login(req, res).catch(next)
})

router.post('/register', (req, res, next) => {
  authController.register(req, res).catch(next)
})

router.post('/refresh', (req, res, next) => {
  authController.refreshToken(req, res).catch(next)
})

router.post('/logout', authenticate, (req, res, next) => {
  authController.logout(req, res).catch(next)
})

router.get('/me', authenticate, (req, res, next) => {
  authController.me(req, res).catch(next)
})

export default router
