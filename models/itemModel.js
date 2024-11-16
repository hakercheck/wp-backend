import mongoose from "mongoose";

const itemSchema = mongoose.Schema(
    {
        category: {
            type: String,
            required: true,
            //enum:['catering','photography','attire','venue']
        },
        name: {
            type: String,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        imageURL: {
            type: String,
            required: true,
        },
        clientID: {
            type: mongoose.Schema.Types.ObjectId,
            required: false,
            ref: 'User',
            default: null
        },
        vendorID: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
    },
    {
        timestamps: true,
    }
);

const Item = mongoose.model("Item", itemSchema);

export default Item;