import mongoose from "mongoose";

const vendorDisplaySchema = mongoose.Schema(
  {
    imageURL: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    vendorID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    isSelect: {
      type: Boolean,
      required: true,
      default: false,
    }
  },
  {
    timestamps: true,
  }
);

const VenDisModel = mongoose.model("VendorDisplay", vendorDisplaySchema);

export default VenDisModel;
