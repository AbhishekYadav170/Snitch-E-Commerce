// import jwt from "jsonwebtoken";
// import { config } from "../config/config.js";
// import userModel from "../models/user.model.js";



// export const authenticateUser = async (req, res, next) => {
//     const token = req.cookies.token

//     if(!token) {
//         return res.status(401).json({ message: "Unauthorized" })
//     }

//     try{
//         const decoded = jwt.verify(token, config.JWT_SECRET)

//         const user = await userModel.findById(decoded.id)

//         if(!user){
//             return res.status(401).json({ message: "Unauthorized" })
//         }

//         req.user = user
//         next()
//     } catch(err) {
//         console.log(err)
//         return res.status(401).json({ message: "Unauthorized"})
//     }
// }

// export const authenticateSeller = async (req, res, next) => {
//     const token = req.cookies.token

//     if (!token) {
//         return res.status(401).json({ message: "Unauthorized" })
//     }

//     try {

//         const decoded = jwt.verify(token, config.JWT_SECRET)

//         const user = await userModel.findById(decoded.id)

//         if (!user) {
//             return res.status(401).json({ message: "Unauthorized" })
//         }

//         if (user.role !== "seller") {
//             return res.status(403).json({ message: "Forbidden" })
//         }

//         req.user = user
//         next()

//     } catch (err) {
//         console.log(err)
//         return res.status(401).json({ message: "Unauthorized" })
//     }
// }





import jwt from "jsonwebtoken";
import { config } from "../config/config.js";
import userModel from "../models/user.model.js";

// --------------------------------------------------
// Verify User Authentication
// --------------------------------------------------

export const authenticateUser = async (req, res, next) => {
    try {
        const token = req.cookies?.token;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized. Please login first."
            });
        }

        const decoded = jwt.verify(token, config.JWT_SECRET);

        const user = await userModel.findById(decoded.id);

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found. Please login again."
            });
        }

        req.user = user;

        return next();

    } catch (error) {
        console.error("Authentication error:", error.message);

        return res.status(401).json({
            success: false,
            message: "Invalid or expired authentication token. Please login again."
        });
    }
};

// --------------------------------------------------
// Verify Seller Authentication
// --------------------------------------------------

export const authenticateSeller = async (req, res, next) => {
    try {
        const token = req.cookies?.token;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized. Please login first."
            });
        }

        const decoded = jwt.verify(token, config.JWT_SECRET);

        const user = await userModel.findById(decoded.id);

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found. Please login again."
            });
        }

        if (user.role !== "seller") {
            return res.status(403).json({
                success: false,
                message: "Access denied. Seller account required."
            });
        }

        req.user = user;

        return next();

    } catch (error) {
        console.error("Seller authentication error:", error.message);

        return res.status(401).json({
            success: false,
            message: "Invalid or expired authentication token. Please login again."
        });
    }
};