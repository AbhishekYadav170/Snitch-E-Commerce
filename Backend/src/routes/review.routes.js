import express from "express";
import { authenticateUser } from "../middlewares/auth.middleware.js";
import { getReviews, saveReview, deleteReview } from "../controllers/review.controller.js";

const router = express.Router();

/** @route GET /api/reviews/:productId  (public) */
router.get("/:productId", getReviews);

/** @route POST /api/reviews/:productId  (logged-in customer; creates or edits own review) */
router.post("/:productId", authenticateUser, saveReview);

/** @route DELETE /api/reviews/:productId  (deletes own review) */
router.delete("/:productId", authenticateUser, deleteReview);

export default router;
