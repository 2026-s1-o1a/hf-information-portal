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
  uploadProfileImage,
  getProfileImage,
} from '../controllers/authController.js'
import { authenticateToken } from '../middlewares/authenticateToken.js'
import upload from '../middlewares/upload.js'

const router = express.Router()

router.post('/signup', signup)
router.post('/signin', signin)
router.post('/signout', signout)
router.get('/me', authenticateToken, getUser)
router.patch('/me', authenticateToken, updateUser)
router.patch(
  '/me/profile-image',
  authenticateToken,
  upload.single('profileImage'),
  uploadProfileImage,
)
router.get('/profile-image/:userId', getProfileImage)
router.get('/verification-requests', authenticateToken, getVerificationRequests)
router.post('/apply', authenticateToken, applyForRole)
router.post('/approve-request', authenticateToken, approveRequest)
router.post('/reject-request', authenticateToken, rejectRequest)

export default router