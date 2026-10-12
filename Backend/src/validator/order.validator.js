// import { body, param, validationResult } from "express-validator";

// const validateRequest = (req, res, next) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//     }
//     next();
// };

// export const validatePlaceOrder = [
//     body("shippingAddress.fullName").trim().notEmpty().withMessage("Full name is required"),
//     body("shippingAddress.phone").trim().notEmpty().withMessage("Phone number is required"),
//     body("shippingAddress.addressLine1").trim().notEmpty().withMessage("Address is required"),
//     body("shippingAddress.city").trim().notEmpty().withMessage("City is required"),
//     body("shippingAddress.state").trim().notEmpty().withMessage("State is required"),
//     body("shippingAddress.pincode").trim().notEmpty().withMessage("Pincode is required"),
//     validateRequest
// ];

// export const validateUpdateOrderStatus = [
//     param("orderId").isMongoId().withMessage("Invalid order ID"),
//     body("status").isIn([ "placed", "processing", "shipped", "delivered", "cancelled" ]).withMessage("Invalid status"),
//     validateRequest
// ];



// import { body, param, validationResult } from "express-validator";

// const validateRequest = (req, res, next) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() });
//   }
//   next();
// };

// export const validatePlaceOrder = [
//   body("shippingAddress.fullName")
//     .trim()
//     .notEmpty()
//     .withMessage("Full name is required"),
//   body("shippingAddress.phone")
//     .trim()
//     .notEmpty()
//     .withMessage("Phone number is required"),
//   body("shippingAddress.addressLine1")
//     .trim()
//     .notEmpty()
//     .withMessage("Address is required"),
//   body("shippingAddress.city")
//     .trim()
//     .notEmpty()
//     .withMessage("City is required"),
//   body("shippingAddress.state")
//     .trim()
//     .notEmpty()
//     .withMessage("State is required"),
//   body("shippingAddress.pincode")
//     .trim()
//     .notEmpty()
//     .withMessage("Pincode is required"),
//   body("selectedItems")
//     .optional()
//     .isArray({ min: 1 })
//     .withMessage("Select at least one item to order"),
//   body("selectedItems.*.productId")
//     .isMongoId()
//     .withMessage("Invalid product in selection"),
//   body("selectedItems.*.variantId")
//     .optional()
//     .isMongoId()
//     .withMessage("Invalid variant in selection"),
//   validateRequest,
// ];

// export const validateUpdateOrderStatus = [
//   param("orderId").isMongoId().withMessage("Invalid order ID"),
//   body("status")
//     .isIn(["placed", "processing", "shipped", "delivered", "cancelled"])
//     .withMessage("Invalid status"),
//   validateRequest,
// ];





import { body, param, validationResult } from "express-validator";

const validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

export const validatePlaceOrder = [
    body("shippingAddress.fullName").trim().notEmpty().withMessage("Full name is required"),
    body("shippingAddress.phone").trim().notEmpty().withMessage("Phone number is required"),
    body("shippingAddress.addressLine1").trim().notEmpty().withMessage("Address is required"),
    body("shippingAddress.city").trim().notEmpty().withMessage("City is required"),
    body("shippingAddress.state").trim().notEmpty().withMessage("State is required"),
    body("shippingAddress.pincode").trim().notEmpty().withMessage("Pincode is required"),
    body("selectedItems").optional().isArray({ min: 1 }).withMessage("Select at least one item to order"),
    body("selectedItems.*.productId").isMongoId().withMessage("Invalid product in selection"),
    body("selectedItems.*.variantId").optional().isMongoId().withMessage("Invalid variant in selection"),
    validateRequest
];

export const validateCancelOrder = [
    param("orderId").isMongoId().withMessage("Invalid order ID"),
    validateRequest
];

export const validateUpdateOrderStatus = [
    param("orderId").isMongoId().withMessage("Invalid order ID"),
    body("status").isIn([ "placed", "processing", "shipped", "delivered", "cancelled" ]).withMessage("Invalid status"),
    validateRequest
];
