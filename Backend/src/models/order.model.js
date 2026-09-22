import mongoose from "mongoose";
import priceSchema from "./price.schema.js";

const orderSchema = new mongoose.Schema({
    buyer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    items: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "product",
                required: true
            },
            seller: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "user",
                required: true
            },
            variant: {
                type: mongoose.Schema.Types.ObjectId
            },
            // Snapshots so the order stays accurate even if the product is
            // later edited or deleted by the seller.
            title: {
                type: String,
                required: true
            },
            image: {
                type: String
            },
            attributes: {
                type: Map,
                of: String
            },
            quantity: {
                type: Number,
                required: true,
                min: 1
            },
            price: {
                type: priceSchema,
                required: true
            }
        }
    ],
    shippingAddress: {
        fullName: { type: String, required: true },
        phone: { type: String, required: true },
        addressLine1: { type: String, required: true },
        addressLine2: { type: String },
        city: { type: String, required: true },
        state: { type: String, required: true },
        pincode: { type: String, required: true }
    },
    totalAmount: {
        type: priceSchema,
        required: true
    },
    paymentMethod: {
        type: String,
        enum: [ "cod", "razorpay" ],
        default: "cod"
    },
    paymentStatus: {
        type: String,
        enum: [ "pending", "paid", "failed" ],
        default: "pending"
    },
    status: {
        type: String,
        enum: [ "placed", "processing", "shipped", "delivered", "cancelled" ],
        default: "placed"
    }
}, { timestamps: true });

const orderModel = mongoose.model("order", orderSchema);

export default orderModel;
