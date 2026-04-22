import express from 'express';
import { signup, signin, signout, getUser } from '../controllers/authController.js'
import { authenticateToken } from '../middlewares/authenticateToken.js';

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/signout", signout);
router.get("/me", authenticateToken, getUser);


export default router;