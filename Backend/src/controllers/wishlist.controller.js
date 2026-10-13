import mongoose from "mongoose";
import wishlistModel from "../models/wishlist.model.js";
import productModel from "../models/product.model.js";

export const getWishlist = async (req, res) => {
    try {
        const wishlist = await wishlistModel.findOne({ user: req.user._id }).populate("products");
        const products = (wishlist?.products || []).filter(Boolean);

        return res.status(200).json({
            message: "Wishlist fetched successfully",
            success: true,
            products
        });
    } catch (error) {
        console.error("getWishlist failed:", error);
        return res.status(500).json({ message: "Could not fetch your wishlist.", success: false });
    }
};

export const toggleWishlist = async (req, res) => {
    try {
        const { productId } = req.params;

        if (!mongoose.isValidObjectId(productId)) {
            return res.status(400).json({ message: "Invalid product", success: false });
        }

        const exists = await productModel.exists({ _id: productId });
        if (!exists) {
            return res.status(404).json({ message: "Product not found", success: false });
        }

        const wishlist = (await wishlistModel.findOne({ user: req.user._id })) ||
            (await wishlistModel.create({ user: req.user._id, products: [] }));

        const index = wishlist.products.findIndex(id => id.toString() === productId);
        let wishlisted;

        if (index >= 0) {
            wishlist.products.splice(index, 1);
            wishlisted = false;
        } else {
            wishlist.products.push(productId);
            wishlisted = true;
        }

        await wishlist.save();

        return res.status(200).json({
            message: wishlisted ? "Added to wishlist" : "Removed from wishlist",
            success: true,
            wishlisted,
            productIds: wishlist.products.map(id => id.toString())
        });
    } catch (error) {
        console.error("toggleWishlist failed:", error);
        return res.status(500).json({ message: "Could not update your wishlist.", success: false });
    }
};
