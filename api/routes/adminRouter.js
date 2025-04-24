import express from 'express';
import { getAllUsers, login, logout } from '../controllers/adminController.js';
import { verifyAdminToken } from '../middleware/authMiddleware.js';


const router = express.Router();

router.post('/login', login);
router.post('/logout', logout);
router.get('/get-all-users', verifyAdminToken, getAllUsers);
export default router;