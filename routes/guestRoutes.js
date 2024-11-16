import express from 'express'
import { addGuest, getGuests, getGuestByID, updateGuest, deleteGuest } from '../controllers/guestController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/add-guests').post(protect, addGuest);
router.route('/get-guests').get(protect, getGuests);
router.route('/:id').get(protect, getGuestByID);
router.route('/update-guest/:id').put(protect, updateGuest);
router.route('/:id').delete(protect, deleteGuest);

export default router;