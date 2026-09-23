
import express from 'express';
import { authenticateSeller } from '../middlewares/auth.middleware.js';
import { createProduct, getSellerProducts, getAllProducts, getProductDetails, addProductVariant, deleteProduct, deleteProductVariant  } from '../controllers/product.controller.js';
import multer from "multer";
import { createProductValidator } from '../validator/product.validator.js';


const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024 // 5 MB
    }
})

const router = express.Router();

/**
 * @route POST /api/products
 * @description Create a new product
 * @access Private (Seller only)
 */
router.post("/", authenticateSeller, upload.array('images', 7), createProductValidator, createProduct)


/**
 * @route GET /api/products/seller
 * @description Get all products of the authenticated seller
 * @access Private (Seller only)
 */
router.get("/seller", authenticateSeller, getSellerProducts)

/**
 * @route GET /api/products
 * @description Get a products
 * @access Public
 */
router.get("/", getAllProducts)


/**
 * @route GET /api/products/detail/:id
 * @description Get a products details by ID
 * @access Public
 */
router.get("/detail/:id", getProductDetails)


/**
 * @route post /api/products/:productId/variants
 * @description Add a new variant to a product
 * @acess Private (Seller only)
 */
router.post("/:productId/variants", authenticateSeller, upload.array('images', 7), addProductVariant)

/**
 * @route DELETE /api/products/:productId
 * @description Delete a product entirely (seller only, must own the product)
 * @access Private (Seller only)
 */
router.delete("/:productId", authenticateSeller, deleteProduct)

/**
 * @route DELETE /api/products/:productId/variants/:variantId
 * @description Delete a single variant from a product
 * @access Private (Seller only)
 */
router.delete("/:productId/variants/:variantId", authenticateSeller, deleteProductVariant)

export default router;