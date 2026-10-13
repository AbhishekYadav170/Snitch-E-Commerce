
// import { body, validationResult } from "express-validator";


// function validateRequest(req, res, next) {

//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//     }

//     next();

// }



// export const validateRegisterUser = [
//     body("email")
//         .isEmail().withMessage("Invalid email format"),
//     body("contact")
//         .notEmpty().withMessage("Contact is required")
//         .matches(/^\d{10}$/).withMessage("Contact must be a 10-digit number"),
//     body("password")
//         .isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
//     body("fullname")
//         .notEmpty().withMessage("Full name is required")
//         .isLength({ min: 3 }).withMessage("Full name must be at least 3 characters long"),
//     body("isSeller")
//         .custom((value) => typeof value === "boolean" || value === "true" || value === "false")
//         .withMessage("isSeller must be a boolean value")
//         .customSanitizer((value) => value === true || value === "true"),
//     validateRequest
// ]

// export const validateLoginUser = [
//     body("email")
//         .isEmail().withMessage("Invalid email format"),
//     body("password")
//         .notEmpty().withMessage("Password is required"),
//     validateRequest
// ]





// import { body, validationResult } from "express-validator";


// function validateRequest(req, res, next) {

//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//     }

//     next();

// }



// export const validateRegisterUser = [
//     body("email")
//         .isEmail().withMessage("Invalid email format"),
//     body("contact")
//         .notEmpty().withMessage("Contact is required")
//         .matches(/^\d{10}$/).withMessage("Contact must be a 10-digit number"),
//     body("password")
//         .isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
//     body("fullname")
//         .notEmpty().withMessage("Full name is required")
//         .isLength({ min: 3 }).withMessage("Full name must be at least 3 characters long"),
//     body("isSeller")
//         .custom((value) => typeof value === "boolean" || value === "true" || value === "false")
//         .withMessage("isSeller must be a boolean value")
//         .customSanitizer((value) => value === true || value === "true"),
//     validateRequest
// ]

// export const validateForgotPassword = [
//     body("email").isEmail().withMessage("Invalid email format"),
//     validateRequest
// ]

// export const validateResetPassword = [
//     body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
//     validateRequest
// ]

// export const validateLoginUser = [
//     body("email")
//         .isEmail().withMessage("Invalid email format"),
//     body("password")
//         .notEmpty().withMessage("Password is required"),
//     validateRequest
// ]






import { body, validationResult } from "express-validator";


function validateRequest(req, res, next) {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    next();

}



export const validateRegisterUser = [
    body("email")
        .isEmail().withMessage("Invalid email format"),
    body("contact")
        .notEmpty().withMessage("Contact is required")
        .matches(/^\d{10}$/).withMessage("Contact must be a 10-digit number"),
    body("password")
        .isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
    body("fullname")
        .notEmpty().withMessage("Full name is required")
        .isLength({ min: 3 }).withMessage("Full name must be at least 3 characters long"),
    body("isSeller")
        .custom((value) => typeof value === "boolean" || value === "true" || value === "false")
        .withMessage("isSeller must be a boolean value")
        .customSanitizer((value) => value === true || value === "true"),
    validateRequest
]

export const validateForgotPassword = [
    body("email").isEmail().withMessage("Invalid email format"),
    validateRequest
]

export const validateResetPassword = [
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
    validateRequest
]

export const validateUpdateProfile = [
    body("fullname").optional().trim().isLength({ min: 3 }).withMessage("Full name must be at least 3 characters long"),
    body("contact").optional().matches(/^\d{10}$/).withMessage("Contact must be a 10-digit number"),
    body("address").optional().isObject().withMessage("Invalid address"),
    body("address.pincode").optional({ values: "falsy" }).matches(/^\d{6}$/).withMessage("Pincode must be 6 digits"),
    validateRequest
]

export const validateLoginUser = [
    body("email")
        .isEmail().withMessage("Invalid email format"),
    body("password")
        .notEmpty().withMessage("Password is required"),
    validateRequest
]