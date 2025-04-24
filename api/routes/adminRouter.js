import express from 'express';
import { deleteUser, getAllUsers, login, logout, updateUsers } from '../controllers/adminController.js';
import { verifyAdminToken } from '../middleware/authMiddleware.js';


const router = express.Router();

router.post('/login', login);
router.post('/logout', logout);
router.get('/get-all-users', verifyAdminToken, getAllUsers);
router.put('/update-user/:id', verifyAdminToken, updateUsers);
router.delete('/delete-user/:id', verifyAdminToken, deleteUser);
export default router;