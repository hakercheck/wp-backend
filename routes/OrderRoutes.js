import express from 'express';
import { getAllItems } from '../controllers/OrderController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/item-selection/:vendorID').get(protect, getAllItems);

export default router;