import mongoose from "mongoose";

const guestSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    contact: {
      type: String,
      required: true,
      unique: true,
    },
    address: {
      type: String,
      required: true,
    },
    clientID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

const Guest = mongoose.model("Guest", guestSchema);

export default Guest;