import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
        required: true,
        index: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    comment: {
        type: String,
        trim: true,
        maxlength: 1000,
        default: ""
    },
    verifiedBuyer: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

// One review per customer per product (re-submitting edits it)
reviewSchema.index({ product: 1, user: 1 }, { unique: true })

const reviewModel = mongoose.model("review", reviewSchema);

export default reviewModel;
