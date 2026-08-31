import express from 'express'
import {
  signup,
  signin,
  signout,
  getUser,
  applyForRole,
  getVerificationRequests,
  approveRequest,
  rejectRequest,
  updateUser,
} from '../controllers/authController.js'
import { authenticateToken } from '../middlewares/authenticateToken.js'

const router = express.Router()

router.post('/signup', signup)
router.post('/signin', signin)
router.post('/signout', signout)
router.get('/me', authenticateToken, getUser)
router.patch('/me', authenticateToken, updateUser)
router.get('/verification-requests', authenticateToken, getVerificationRequests)
router.post('/apply', authenticateToken, applyForRole)
router.post('/approve-request', authenticateToken, approveRequest)
router.post('/reject-request', authenticateToken, rejectRequest)

export default router
