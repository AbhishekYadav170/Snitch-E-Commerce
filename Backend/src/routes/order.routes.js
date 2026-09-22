import express from "express";
import { authenticateUser, authenticateSeller } from "../middlewares/auth.middleware.js";
import { placeOrder, getMyOrders, getSellerOrders, getOrderById, updateOrderStatus } from "../controllers/order.controller.js";
import { validatePlaceOrder, validateUpdateOrderStatus } from "../validator/order.validator.js";

const router = express.Router();

/**
 * @route POST /api/orders
 * @description Place an order from the current user's cart (Cash on Delivery for now)
 * @access Private
 */
router.post("/", authenticateUser, validatePlaceOrder, placeOrder);

/**
 * @route GET /api/orders/my
 * @description Get the logged-in buyer's order history
 * @access Private
 */
router.get("/my", authenticateUser, getMyOrders);

/**
 * @route GET /api/orders/seller
 * @description Get orders that contain at least one item sold by the logged-in seller
 * @access Private (Seller only)
 */
router.get("/seller", authenticateSeller, getSellerOrders);

/**
 * @route GET /api/orders/:orderId
 * @description Get a single order (buyer or the seller of an item in it)
 * @access Private
 */
router.get("/:orderId", authenticateUser, getOrderById);

/**
 * @route PATCH /api/orders/:orderId/status
 * @description Update an order's fulfillment status
 * @access Private (Seller only)
 */
router.patch("/:orderId/status", authenticateSeller, validateUpdateOrderStatus, updateOrderStatus);

export default router;
