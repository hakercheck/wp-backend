import asyncHandler from "express-async-handler";
import VenDisModel from "../models/vendorDisplayModel.js";
import VenSelModel from "../models/vendorSelectModel.js";

// @desc    Add a new display item
// @route   POST /api/vendorDisplay/add-display-items
// @access  Private
const addDisplayItem = asyncHandler(async (req, res) => {
  const { imageURL, name, description } = req.body;
  const vendorID = req.user._id; // get the vendor's _id from the request

  // Check if there are any existing display items for the vendor
  const existingItems = await VenDisModel.find({ vendorID });
  const isSelect = existingItems.length === 0;

  const item = new VenDisModel({
    imageURL,
    name,
    description,
    vendorID,
    isSelect,
  });

  const createdItem = await item.save();
  res.status(201).json(createdItem);

  //add vendorID to VenSelMod
  const existingSelects = await VenSelModel.find({ vendorID });
  if (existingSelects.length === 0) {
    const select = new VenSelModel({
      vendorID,
      clientIDs: [],
    });
    const createdSelect = await select.save();
    res.status(201).json(createdSelect);
  }
});

// @desc    Get all display items
// @route   GET /api/vendorDisplay/get-display-items
// @access  Private
const getDisplayItems = asyncHandler(async (req, res) => {
  const items = await VenDisModel.find({ vendorID: req.user._id });
  res.json(items);
});

// @desc    Get a display item by ID
// @route   GET /api/vendorDisplay/display/:id
// @access  Private
const getDisplayItemByID = asyncHandler(async (req, res) => {
  const item = await VenDisModel.findById(req.params.id);

  if (item) {
    res.json(item);
  } else {
    res.status(404);
    throw new Error("Item not found");
  }
});

// @desc    Update a display item
// @route   PUT /api/vendorDisplay/update-display-item/:id
// @access  Private
const updateDisplayItem = asyncHandler(async (req, res) => {
  const item = await VenDisModel.findById(req.params.id);

  if (item && String(item.vendorID) === String(req.user._id)) {
    item.imageURL = req.body.imageURL || item.imageURL;
    item.name = req.body.name || item.name;
    item.description = req.body.description || item.description;
    item.isSelect = req.body.isSelect !== undefined ? req.body.isSelect : item.isSelect;

    const updatedItem = await item.save();
    res.json(updatedItem);
  } else {
    res.status(404);
    throw new Error("Item not found");
  }
});

// @desc    Delete a display item
// @route   DELETE /api/vendorDisplay/display/:id
// @access  Private
const deleteDisplayItem = asyncHandler(async (req, res) => {
  const item = await VenDisModel.findById(req.params.id);

  if (item && String(item.vendorID) === String(req.user._id)) {
    await item.deleteOne({_id: req.params.id});
    res.json({ message: "Item removed" });
  } else {
    res.status(404);
    throw new Error("Item not found");
  }
});

export { addDisplayItem, getDisplayItems, getDisplayItemByID, updateDisplayItem, deleteDisplayItem };