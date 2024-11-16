import asyncHandler from 'express-async-handler'
import Guest from '../models/guestModel.js'

// @desc    Add a new guest
// @route   POST /api/guests/add-guests
// @access  Private
const addGuest = asyncHandler(async (req, res) => {
    const { name, contact, address } = req.body;
    const clientID = req.user._id; // get the client's _id from the request

    const guest = new Guest({
        name,
        contact,
        address,
        clientID
    });

    const createdGuest = await guest.save();
    res.status(201).json(createdGuest);
});

// @desc    Get all guests
// @route   GET /api/guests/get-guests
// @access  Private
const getGuests = asyncHandler(async (req, res) => {
    const guests = await Guest.find({ clientID: req.user._id });
    res.json(guests);
});

// @desc    Get a guest by ID
// @route   GET /api/guests/:id
// @access  Private
const getGuestByID = asyncHandler(async (req, res) => {
    const guest = await Guest.findById(req.params.id);

    if (guest) {
        res.json(guest);
    } else {
        res.status(404);
        throw new Error('Guest not found');
    }
});

// @desc    Update a guest
// @route   PUT /api/guests/update-guest/:id
// @access  Private
const updateGuest = asyncHandler(async (req, res) => {
    const guest = await Guest.findById(req.params.id);

    if (guest && String(guest.clientID) === String(req.user._id)) {
        guest.name = req.body.name || guest.name;
        guest.contact = req.body.contact || guest.contact;
        guest.address = req.body.address || guest.address;

        const updatedGuest = await guest.save();
        res.json(updatedGuest);
    } else {
        res.status(404);
        throw new Error('Guest not found');
    }
});

// @desc    Delete a guest
// @route   DELETE /api/guests/:id
// @access  Private
const deleteGuest = asyncHandler(async (req, res) => {
    const guest = await Guest.findById(req.params.id);

    if (guest && String(guest.clientID) === String(req.user._id)) {
        await Guest.deleteOne({ _id: req.params.id });
        res.json({ message: 'Guest removed' });
    } else {
        res.status(404);
        throw new Error('Guest not found');
    }
});

export { addGuest, getGuests, getGuestByID, updateGuest, deleteGuest };