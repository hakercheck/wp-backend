import asyncHandler from "express-async-handler";
import Item from "../models/itemModel.js";

// @desc    Add a new item
// @route   POST /api/vendor/add-items
// @access  Private
const addItem = asyncHandler(async (req, res) => {
  const {category, name, quantity, price, imageURL, clientID } = req.body;
  const vendorID = req.user._id; // get the vendor's _id from the request

  const item = new Item({
    category,
    name,
    quantity,
    price,
    imageURL,
    clientID,
    vendorID,
  });

  const createdItem = await item.save();
  res.status(201).json(createdItem);
});

// @desc    Get all items
// @route   GET /api/vendor/get-items
// @access  Private
const getItems = asyncHandler(async (req, res) => {
  const items = await Item.find({ vendorID: req.user._id });
  res.json(items);
});

// @desc    Get an item by ID
// @route   GET /api/vendor/:id
// @access  Private
const getItemByID = asyncHandler(async (req, res) => {
  const item = await Item.findById(req.params.id);

  if (item) {
    res.json(item);
  } else {
    res.status(404);
    throw new Error("Item not found");
  }
});

// @desc    Update an item
// @route   PUT /api/vendor/update-item/:id
// @access  Private
const updateItem = asyncHandler(async (req, res) => {
  const item = await Item.findById(req.params.id);

  if (item && String(item.vendorID) === String(req.user._id)) {
    item.category = req.body.category || item.category;
    item.name = req.body.name || item.name;
    item.quantity = req.body.quantity || item.quantity;
    item.price = req.body.price || item.price;
    item.imageURL = req.body.imageURL || item.imageURL;

    const updatedItem = await item.save();
    res.json(updatedItem);
  } else {
    res.status(404);
    throw new Error("Item not found");
  }
});

// @desc    Delete an item
// @route   DELETE /api/vendor/:id
// @access  Private
const deleteItem = asyncHandler(async (req, res) => {
  const item = await Item.findById(req.params.id);

  if (item && String(item.vendorID) === String(req.user._id)) {
    await Item.deleteOne({ _id: req.params.id });
    res.json({ message: "Item removed" });
  } else {
    res.status(404);
    throw new Error("Item not found");
  }
});

export { addItem, getItems, getItemByID, updateItem, deleteItem };
