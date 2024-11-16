import express from 'express';
import { getVendorDisplays, updateVendorSelect, getAllVendorSelections, removeDuplicates } from '../controllers/vendorSelectController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/vendor-selection').get(protect, getVendorDisplays);
router.route('/update-vendor-select/:vendorID/:clientID').put(protect, updateVendorSelect);
router.route('/').get(protect, getAllVendorSelections);
router.route('/remove-duplicates').get(protect, removeDuplicates);

export default router;