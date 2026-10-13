import express from "express";
import { authenticateUser } from "../middlewares/auth.middleware.js";
import { getWishlist, toggleWishlist } from "../controllers/wishlist.controller.js";

const router = express.Router();

/**
 * @route GET /api/wishlist
 * @description Get the logged-in user's wishlist (full product objects)
 * @access Private
 */
router.get("/", authenticateUser, getWishlist);

/**
 * @route POST /api/wishlist/toggle/:productId
 * @description Add the product to the wishlist, or remove it if already there
 * @access Private
 */
router.post("/toggle/:productId", authenticateUser, toggleWishlist);

export default router;
