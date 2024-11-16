import express from 'express';
import { addItem, getItems, getItemByID, updateItem, deleteItem } from '../controllers/itemController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/add-items').post(protect, addItem);
router.route('/get-items').get(protect, getItems);
router.route('/:id').get(protect, getItemByID);
router.route('/update-item/:id').put(protect, updateItem);
router.route('/:id').delete(protect, deleteItem);

export default router;