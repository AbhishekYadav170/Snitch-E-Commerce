import mongoose from "mongoose";
import reviewModel from "../models/review.model.js";
import productModel from "../models/product.model.js";
import orderModel from "../models/order.model.js";

async function summaryFor(productId) {
    const result = await reviewModel.aggregate([
        { $match: { product: new mongoose.Types.ObjectId(productId) } },
        { $group: { _id: "$product", avg: { $avg: "$rating" }, count: { $sum: 1 } } }
    ]);
    const row = result[ 0 ];
    return { avg: row ? Math.round(row.avg * 10) / 10 : 0, count: row ? row.count : 0 };
}

export const getReviews = async (req, res) => {
    try {
        const { productId } = req.params;

        if (!mongoose.isValidObjectId(productId)) {
            return res.status(400).json({ message: "Invalid product", success: false });
        }

        const reviews = await reviewModel.find({ product: productId }).sort({ createdAt: -1 });
        const summary = await summaryFor(productId);

        return res.status(200).json({
            message: "Reviews fetched successfully",
            success: true,
            reviews,
            summary
        });
    } catch (error) {
        console.error("getReviews failed:", error);
        return res.status(500).json({ message: "Could not fetch reviews.", success: false });
    }
};

export const saveReview = async (req, res) => {
    try {
        const { productId } = req.params;
        const rating = Number(req.body.rating);
        const comment = (req.body.comment || "").toString().trim();

        if (!mongoose.isValidObjectId(productId)) {
            return res.status(400).json({ message: "Invalid product", success: false });
        }

        if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
            return res.status(400).json({ message: "Rating must be between 1 and 5", success: false });
        }

        if (req.user.role === "seller") {
            return res.status(403).json({ message: "Sellers can't review products", success: false });
        }

        const product = await productModel.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found", success: false });
        }

        // "Verified buyer" badge if the customer has a non-cancelled order with this product
        const purchased = await orderModel.exists({
            buyer: req.user._id,
            status: { $ne: "cancelled" },
            "items.product": productId
        });

        const review = await reviewModel.findOneAndUpdate(
            { product: productId, user: req.user._id },
            {
                $set: {
                    rating,
                    comment,
                    userName: req.user.fullname,
                    verifiedBuyer: !!purchased
                }
            },
            { new: true, upsert: true, setDefaultsOnInsert: true }
        );

        const summary = await summaryFor(productId);

        return res.status(200).json({
            message: "Review saved",
            success: true,
            review,
            summary
        });
    } catch (error) {
        console.error("saveReview failed:", error);
        return res.status(500).json({ message: "Could not save your review.", success: false });
    }
};

export const deleteReview = async (req, res) => {
    try {
        const { productId } = req.params;

        if (!mongoose.isValidObjectId(productId)) {
            return res.status(400).json({ message: "Invalid product", success: false });
        }

        await reviewModel.deleteOne({ product: productId, user: req.user._id });
        const summary = await summaryFor(productId);

        return res.status(200).json({ message: "Review deleted", success: true, summary });
    } catch (error) {
        console.error("deleteReview failed:", error);
        return res.status(500).json({ message: "Could not delete your review.", success: false });
    }
};
