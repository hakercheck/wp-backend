import express from 'express';
import { getAllUsers, getUserById, updateUserByAdmin, deleteUser } from '../controllers/adminController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/get-users').get(protect, getAllUsers);
router.route('/get-user/:id').get(protect, getUserById);
router.route('/update-user/:id').put(protect, updateUserByAdmin);
router.route('/:id').delete(protect, deleteUser);

export default router;