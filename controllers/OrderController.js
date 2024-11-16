import asyncHandler from "express-async-handler";
import Order from "../models/OrderModel.js";
import Item from "../models/itemModel.js";

// @desc    Display Items
// @route   GET /api/order/item-selection
// @access  Public
const getAllItems = asyncHandler(async (req, res) => {
  const items = await Item.find({vendorID: req.params.vendorID});
  res.json(items);
});

export { getAllItems };