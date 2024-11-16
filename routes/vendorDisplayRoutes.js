import express from 'express';
import { addDisplayItem, getDisplayItems, getDisplayItemByID, updateDisplayItem, deleteDisplayItem } from '../controllers/vendorDisplayController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/add-display-items').post(protect, addDisplayItem);
router.route('/get-display-items').get(protect, getDisplayItems);
router.route('/display/:id').get(protect, getDisplayItemByID);
router.route('/update-display-item/:id').put(protect, updateDisplayItem);
router.route('/display/:id').delete(protect, deleteDisplayItem);

export default router;