import asyncHandler from "express-async-handler";
import VenDisModel from "../models/vendorDisplayModel.js";
import VenSelModel from "../models/vendorSelectModel.js";

// @desc    Fetch vendor displays with isSelct = true
// @route   GET /api/vendorDisplay/vendor-selection
// @access  Private
const getVendorDisplays = asyncHandler(async (req, res) => {
  const vendorSelection = await VenDisModel.find({ isSelect: true });
  res.json(vendorSelection);
});

// @desc    append clientID to vendorID
// @route   POST /api/vendorDisplay/update-vendor-select/:vendorID/:clientID
// @access  Private
const updateVendorSelect = asyncHandler(async (req, res) => {
  const vendorID = req.params.vendorID;
  const clientID = req.params.clientID;

  // Find a document that contains the clientID in its clientIDs array and remove it
  await VenSelModel.updateMany(
    { "clientIDs.clientID": { $exists: true, $ne: null, $in: [clientID] } },
    { $pull: { clientIDs: { clientID: clientID } } }
  );

  // Find a document with the current vendorID and append the clientID to its clientIDs array
  const updatedVendor = await VenSelModel.findOneAndUpdate(
    { vendorID: vendorID },
    { $push: { clientIDs: { clientID: clientID } } },
    { new: true, upsert: true }
  );

  // Convert the clientIDs array to a set to remove duplicates
  const uniqueClientIDs = Array.from(new Set(updatedVendor.clientIDs.map(client => client.clientID)))
    .map(clientID => {
      return updatedVendor.clientIDs.find(client => client.clientID === clientID)
    });

  // Update the document with the unique clientIDs array
  await VenSelModel.updateOne(
    { _id: updatedVendor._id },
    { $set: { clientIDs: uniqueClientIDs } }
  );

  res.json({ message: "Vendor selection updated", updatedVendor });
});

// @desc    Fetch all vendor selections
// @route   GET /api/vendorDisplay
// @access  Private
const getAllVendorSelections = asyncHandler(async (req, res) => {
  const vendorSelections = await VenSelModel.find({});
  res.json(vendorSelections);
});

// @desc   Remove duplicate clientIDs from vendor selections
// @route   GET /api/vendorDisplay/remove-duplicates
// @access  Private
const removeDuplicates = asyncHandler(async (req, res) => {
  const vendorSelections = await VenSelModel.find({});

  vendorSelections.forEach(async vendor => {
    // Check if clientIDs is empty
    if (!vendor.clientIDs.length) {
      console.log(`No clientIDs to remove duplicates from for vendorID ${vendor.vendorID}`);
      return;
    }
    const uniqueClientIDs = Array.from(new Set(vendor.clientIDs.map(client => client.clientID)))
      .map(clientID => {
        return vendor.clientIDs.find(client => client.clientID === clientID)
      });

    await VenSelModel.updateOne(
      { _id: vendor._id },
      { $set: { clientIDs: uniqueClientIDs } }
    );
  });

  res.json({ message: "Duplicate clientIDs removed" });
});

export { getVendorDisplays, updateVendorSelect, getAllVendorSelections, removeDuplicates };
