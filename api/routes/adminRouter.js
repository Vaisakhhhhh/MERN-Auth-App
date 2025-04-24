import express from 'express';
import { getAllUsers, login, logout, updateUsers } from '../controllers/adminController.js';
import { verifyAdminToken } from '../middleware/authMiddleware.js';


const router = express.Router();

router.post('/login', login);
router.post('/logout', logout);
router.get('/get-all-users', verifyAdminToken, getAllUsers);
router.put('/update-user/:id', verifyAdminToken, updateUsers);
export default router;