import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
  {
    vendorID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    clientID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    items: [
      {
        itemID: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Item",
        },
        quantity: {
          type: Number,
          required: true,
        },
        totalCost: {
          type: Number,
          required: true,
        },
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Completed", "Cancelled"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
