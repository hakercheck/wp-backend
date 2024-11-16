import mongoose from "mongoose";

const vendorSelectSchema = mongoose.Schema(
  {
    vendorID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    clientIDs: [
      {
        clientID: {
          type: mongoose.Schema.Types.ObjectId,
          required: false,
          ref: "User",
          default: null,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const VenSelModel = mongoose.model("VendorSelect", vendorSelectSchema);

export default VenSelModel;
