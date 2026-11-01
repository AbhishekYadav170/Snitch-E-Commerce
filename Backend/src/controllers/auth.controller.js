// import userModel from "../models/user.model.js";
// import jwt from "jsonwebtoken"
// import { config } from "../config/config.js";
// import productModel from "../models/product.model.js";
// import crypto from "crypto";
// import { sendResetPasswordEmail } from "../utils/email.js";


// async function sendTokenResponse(user, res, message) {

//     const token = jwt.sign({
//         id: user._id,
//     }, config.JWT_SECRET, {
//         expiresIn: "7d"
//     })

//     res.cookie("token", token)

//     res.status(200).json({
//         message,
//         success: true,
//         user: {
//             id: user._id,
//             email: user.email,
//             contact: user.contact,
//             fullname: user.fullname,
//             role: user.role
//         }
//     })

// }


// export const register = async (req, res) => {
//     const { email, contact, password, fullname, isSeller } = req.body;

//     try {
//         const existingUser = await userModel.findOne({
//             $or: [
//                 { email },
//                 { contact }
//             ]
//         })

//         if (existingUser) {
//             return res.status(400).json({ message: "User with this email or contact already exists" });
//         }

//         const user = await userModel.create({
//             email,
//             contact,
//             password,
//             fullname,
//             role: isSeller ? "seller" : "buyer"
//         })

//         await sendTokenResponse(user, res, "User registered successfully")

//     } catch (error) {
//         console.log(error)
//         return res.status(500).json({ message: "Server error" });
//     }
// }

// export const login = async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         const user = await userModel.findOne({ email });

//         if (!user) {
//             return res.status(400).json({ message: "Invalid email or password" });
//         }

//         const isMatch = await user.comparePassword(password);

//         if (!isMatch) {
//             return res.status(400).json({ message: "Invalid email or password" });
//         }

//         await sendTokenResponse(user, res, "User logged in successfully")
//     } catch (error) {
//         console.log(error)
//         return res.status(500).json({ message: "Server error" });
//     }
// }

// export const logout = async (req, res) => {
//     res.clearCookie("token")

//     res.status(200).json({
//         message: "Logged out successfully",
//         success: true
//     })
// }

// export const googleCallback = async (req, res) => {
//     const { id, displayName, emails, photos } = req.user
//     const email = emails[ 0 ].value;
//     const profilePic = photos[ 0 ].value;


//     let user = await userModel.findOne({
//         email
//     })

//     if (!user) {
//         user = await userModel.create({
//             email,
//             googleId: id,
//             fullname: displayName,
//         })
//     }


//     const token = jwt.sign({
//         id: user._id,
//     }, config.JWT_SECRET, {
//         expiresIn: "7d"
//     })

//     res.cookie("token", token)

//     res.redirect("http://localhost:5173/")
// }

// export const getMe = async (req,res) => {
//     const user = req.user;

//     res.status(200).json({
//         message: "User fetched successfully",
//         success: true,
//         user: {
//             id: user._id,
//             email: user.email,
//             contact: user.contact,
//             fullname: user.fullname,
//             role: user.role
//         }
//     })
// }

// export async function getAllProduct(req, res) {
//     const product = await productModel.find()

//     return res.status(200).json({
//         message: "Product fetched successfully",
//         success: true,
//         product
//     })
// }

// export const forgotPassword = async (req, res) => {
//     const genericResponse = {
//         message: "If an account exists for this email, a reset link has been sent.",
//         success: true
//     }

//     try {
//         const { email } = req.body
//         const user = await userModel.findOne({ email })

//         if (user) {
//             const rawToken = crypto.randomBytes(32).toString("hex")
//             user.resetPasswordToken = crypto.createHash("sha256").update(rawToken).digest("hex")
//             user.resetPasswordExpires = new Date(Date.now() + 30 * 60 * 1000)
//             await user.save()

//             const resetUrl = `${config.FRONTEND_URL}/reset-password/${rawToken}`
//             try {
//                 await sendResetPasswordEmail(user.email, resetUrl)
//             } catch (mailError) {
//                 console.error("Could not send reset email:", mailError)
//             }
//         }

//         // Same response whether or not the email exists (prevents account enumeration)
//         return res.status(200).json(genericResponse)
//     } catch (error) {
//         console.error("forgotPassword failed:", error)
//         return res.status(500).json({ message: "Server error", success: false })
//     }
// }

// export const resetPassword = async (req, res) => {
//     try {
//         const { token } = req.params
//         const { password } = req.body

//         const hashed = crypto.createHash("sha256").update(token).digest("hex")

//         const user = await userModel.findOne({
//             resetPasswordToken: hashed,
//             resetPasswordExpires: { $gt: new Date() }
//         })

//         if (!user) {
//             return res.status(400).json({
//                 message: "This reset link is invalid or has expired.",
//                 success: false
//             })
//         }

//         user.password = password // hashed by the pre-save hook
//         user.resetPasswordToken = undefined
//         user.resetPasswordExpires = undefined
//         await user.save()

//         return res.status(200).json({
//             message: "Password updated successfully. You can log in now.",
//             success: true
//         })
//     } catch (error) {
//         console.error("resetPassword failed:", error)
//         return res.status(500).json({ message: "Server error", success: false })
//     }
// }





// import userModel from "../models/user.model.js";
// import jwt from "jsonwebtoken"
// import { config } from "../config/config.js";
// import productModel from "../models/product.model.js";
// import crypto from "crypto";
// import { sendResetPasswordEmail } from "../utils/email.js";


// function publicUser(user) {
//     return {
//         id: user._id,
//         email: user.email,
//         contact: user.contact,
//         fullname: user.fullname,
//         role: user.role,
//         address: user.address || {}
//     }
// }

// async function sendTokenResponse(user, res, message) {

//     const token = jwt.sign({
//         id: user._id,
//     }, config.JWT_SECRET, {
//         expiresIn: "7d"
//     })

//     res.cookie("token", token)

//     res.status(200).json({
//         message,
//         success: true,
//         user: publicUser(user)
//     })

// }


// export const register = async (req, res) => {
//     const { email, contact, password, fullname, isSeller } = req.body;

//     try {
//         const existingUser = await userModel.findOne({
//             $or: [
//                 { email },
//                 { contact }
//             ]
//         })

//         if (existingUser) {
//             return res.status(400).json({ message: "User with this email or contact already exists" });
//         }

//         const user = await userModel.create({
//             email,
//             contact,
//             password,
//             fullname,
//             role: isSeller ? "seller" : "buyer"
//         })

//         await sendTokenResponse(user, res, "User registered successfully")

//     } catch (error) {
//         console.log(error)
//         return res.status(500).json({ message: "Server error" });
//     }
// }

// export const login = async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         const user = await userModel.findOne({ email });

//         if (!user) {
//             return res.status(400).json({ message: "Invalid email or password" });
//         }

//         const isMatch = await user.comparePassword(password);

//         if (!isMatch) {
//             return res.status(400).json({ message: "Invalid email or password" });
//         }

//         await sendTokenResponse(user, res, "User logged in successfully")
//     } catch (error) {
//         console.log(error)
//         return res.status(500).json({ message: "Server error" });
//     }
// }

// export const logout = async (req, res) => {
//     res.clearCookie("token")

//     res.status(200).json({
//         message: "Logged out successfully",
//         success: true
//     })
// }

// export const googleCallback = async (req, res) => {
//     const { id, displayName, emails, photos } = req.user
//     const email = emails[ 0 ].value;
//     const profilePic = photos[ 0 ].value;


//     let user = await userModel.findOne({
//         email
//     })

//     if (!user) {
//         user = await userModel.create({
//             email,
//             googleId: id,
//             fullname: displayName,
//         })
//     }


//     const token = jwt.sign({
//         id: user._id,
//     }, config.JWT_SECRET, {
//         expiresIn: "7d"
//     })

//     res.cookie("token", token)

//     res.redirect("http://localhost:5173/")
// }

// export const getMe = async (req,res) => {
//     const user = req.user;

//     res.status(200).json({
//         message: "User fetched successfully",
//         success: true,
//         user: publicUser(user)
//     })
// }

// export async function getAllProduct(req, res) {
//     const product = await productModel.find()

//     return res.status(200).json({
//         message: "Product fetched successfully",
//         success: true,
//         product
//     })
// }

// export const forgotPassword = async (req, res) => {
//     const genericResponse = {
//         message: "If an account exists for this email, a reset link has been sent.",
//         success: true
//     }

//     try {
//         const { email } = req.body
//         const user = await userModel.findOne({ email })

//         if (user) {
//             const rawToken = crypto.randomBytes(32).toString("hex")
//             user.resetPasswordToken = crypto.createHash("sha256").update(rawToken).digest("hex")
//             user.resetPasswordExpires = new Date(Date.now() + 30 * 60 * 1000)
//             await user.save()

//             const resetUrl = `${config.FRONTEND_URL}/reset-password/${rawToken}`
//             try {
//                 await sendResetPasswordEmail(user.email, resetUrl)
//             } catch (mailError) {
//                 console.error("Could not send reset email:", mailError)
//             }
//         }

//         // Same response whether or not the email exists (prevents account enumeration)
//         return res.status(200).json(genericResponse)
//     } catch (error) {
//         console.error("forgotPassword failed:", error)
//         return res.status(500).json({ message: "Server error", success: false })
//     }
// }

// export const resetPassword = async (req, res) => {
//     try {
//         const { token } = req.params
//         const { password } = req.body

//         const hashed = crypto.createHash("sha256").update(token).digest("hex")

//         const user = await userModel.findOne({
//             resetPasswordToken: hashed,
//             resetPasswordExpires: { $gt: new Date() }
//         })

//         if (!user) {
//             return res.status(400).json({
//                 message: "This reset link is invalid or has expired.",
//                 success: false
//             })
//         }

//         user.password = password // hashed by the pre-save hook
//         user.resetPasswordToken = undefined
//         user.resetPasswordExpires = undefined
//         await user.save()

//         return res.status(200).json({
//             message: "Password updated successfully. You can log in now.",
//             success: true
//         })
//     } catch (error) {
//         console.error("resetPassword failed:", error)
//         return res.status(500).json({ message: "Server error", success: false })
//     }
// }


// export const updateProfile = async (req, res) => {
//     try {
//         const { fullname, contact, address } = req.body

//         const user = await userModel.findById(req.user._id)

//         if (!user) {
//             return res.status(404).json({ message: "User not found", success: false })
//         }

//         if (fullname !== undefined) user.fullname = fullname.trim()

//         if (contact !== undefined && contact !== user.contact) {
//             const taken = await userModel.findOne({ contact, _id: { $ne: user._id } })
//             if (taken) {
//                 return res.status(400).json({ message: "This contact number is already used by another account", success: false })
//             }
//             user.contact = contact
//         }

//         if (address && typeof address === "object") {
//             const fields = [ "fullName", "phone", "addressLine1", "addressLine2", "city", "state", "pincode" ]
//             const next = {}
//             for (const f of fields) {
//                 next[ f ] = typeof address[ f ] === "string" ? address[ f ].trim() : (user.address?.[ f ] || "")
//             }
//             user.address = next
//         }

//         await user.save()

//         return res.status(200).json({
//             message: "Profile updated successfully",
//             success: true,
//             user: publicUser(user)
//         })
//     } catch (error) {
//         console.error("updateProfile failed:", error)
//         return res.status(500).json({ message: "Server error", success: false })
//     }
// }





import userModel from "../models/user.model.js";
import productModel from "../models/product.model.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";

import { config } from "../config/config.js";
import { sendResetPasswordEmail } from "../utils/email.js";

// --------------------------------------------------
// Common Helpers
// --------------------------------------------------

function publicUser(user) {
    return {
        id: user._id,
        email: user.email,
        contact: user.contact,
        fullname: user.fullname,
        role: user.role,
        address: user.address || {}
    };
}

function getCookieOptions() {
    const isProduction = config.NODE_ENV === "production";

    return {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "none" : "lax",
        path: "/",
        maxAge: 7 * 24 * 60 * 60 * 1000
    };
}

function sendAuthCookie(res, token) {
    res.cookie("token", token, getCookieOptions());
}

function generateToken(userId) {
    return jwt.sign(
        { id: userId },
        config.JWT_SECRET,
        { expiresIn: "7d" }
    );
}

async function sendTokenResponse(user, res, message) {
    const token = generateToken(user._id);

    sendAuthCookie(res, token);

    return res.status(200).json({
        message,
        success: true,
        user: publicUser(user)
    });
}

// --------------------------------------------------
// Register
// --------------------------------------------------

export const register = async (req, res) => {
    try {
        const { email, contact, password, fullname, isSeller } = req.body;

        const existingUser = await userModel.findOne({
            $or: [
                { email },
                { contact }
            ]
        });

        if (existingUser) {
            return res.status(400).json({
                message: "User with this email or contact already exists",
                success: false
            });
        }

        const user = await userModel.create({
            email,
            contact,
            password,
            fullname,
            role: isSeller ? "seller" : "buyer"
        });

        return await sendTokenResponse(
            user,
            res,
            "User registered successfully"
        );

    } catch (error) {
        console.error("Register error:", error);

        return res.status(500).json({
            message: "Server error",
            success: false
        });
    }
};

// --------------------------------------------------
// Login
// --------------------------------------------------

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "Invalid email or password",
                success: false
            });
        }

        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid email or password",
                success: false
            });
        }

        return await sendTokenResponse(
            user,
            res,
            "User logged in successfully"
        );

    } catch (error) {
        console.error("Login error:", error);

        return res.status(500).json({
            message: "Server error",
            success: false
        });
    }
};

// --------------------------------------------------
// Logout
// --------------------------------------------------

export const logout = async (req, res) => {
    res.clearCookie("token", {
        ...getCookieOptions(),
        maxAge: undefined
    });

    return res.status(200).json({
        message: "Logged out successfully",
        success: true
    });
};

// --------------------------------------------------
// Google OAuth Callback
// --------------------------------------------------

export const googleCallback = async (req, res) => {
    try {
        if (!req.user) {
            return res.redirect(
                `${config.FRONTEND_URL}/login?error=google_auth_failed`
            );
        }

        const { id, displayName, emails } = req.user;

        const email = emails?.[0]?.value;

        if (!email) {
            return res.redirect(
                `${config.FRONTEND_URL}/login?error=google_email_missing`
            );
        }

        let user = await userModel.findOne({ email });

        if (!user) {
            user = await userModel.create({
                email,
                googleId: id,
                fullname: displayName,
                role: "buyer"
            });
        }

        const token = generateToken(user._id);

        sendAuthCookie(res, token);

        return res.redirect(`${config.FRONTEND_URL}/`);

    } catch (error) {
        console.error("Google callback error:", error);

        return res.redirect(
            `${config.FRONTEND_URL}/login?error=google_auth_failed`
        );
    }
};

// --------------------------------------------------
// Get Current User
// --------------------------------------------------

export const getMe = async (req, res) => {
    try {
        const user = req.user;

        return res.status(200).json({
            message: "User fetched successfully",
            success: true,
            user: publicUser(user)
        });

    } catch (error) {
        console.error("Get user error:", error);

        return res.status(500).json({
            message: "Server error",
            success: false
        });
    }
};

// --------------------------------------------------
// Get All Products
// --------------------------------------------------

export async function getAllProduct(req, res) {
    try {
        const products = await productModel.find();

        return res.status(200).json({
            message: "Product fetched successfully",
            success: true,
            product: products
        });

    } catch (error) {
        console.error("Get products error:", error);

        return res.status(500).json({
            message: "Unable to fetch products",
            success: false
        });
    }
}

// --------------------------------------------------
// Forgot Password
// --------------------------------------------------

export const forgotPassword = async (req, res) => {
    const genericResponse = {
        message: "If an account exists for this email, a reset link has been sent.",
        success: true
    };

    try {
        const { email } = req.body;

        const user = await userModel.findOne({ email });

        if (user) {
            const rawToken = crypto.randomBytes(32).toString("hex");

            user.resetPasswordToken = crypto
                .createHash("sha256")
                .update(rawToken)
                .digest("hex");

            user.resetPasswordExpires = new Date(
                Date.now() + 30 * 60 * 1000
            );

            await user.save();

            const resetUrl =
                `${config.FRONTEND_URL}/reset-password/${rawToken}`;

            try {
                await sendResetPasswordEmail(user.email, resetUrl);
            } catch (mailError) {
                console.error("Password reset email error:", mailError);
            }
        }

        return res.status(200).json(genericResponse);

    } catch (error) {
        console.error("Forgot password error:", error);

        return res.status(500).json({
            message: "Server error",
            success: false
        });
    }
};

// --------------------------------------------------
// Reset Password
// --------------------------------------------------

export const resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { password } = req.body;

        const hashedToken = crypto
            .createHash("sha256")
            .update(token)
            .digest("hex");

        const user = await userModel.findOne({
            resetPasswordToken: hashedToken,
            resetPasswordExpires: { $gt: new Date() }
        });

        if (!user) {
            return res.status(400).json({
                message: "This reset link is invalid or has expired.",
                success: false
            });
        }

        user.password = password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        await user.save();

        return res.status(200).json({
            message: "Password updated successfully. You can log in now.",
            success: true
        });

    } catch (error) {
        console.error("Reset password error:", error);

        return res.status(500).json({
            message: "Server error",
            success: false
        });
    }
};

// --------------------------------------------------
// Update Profile
// --------------------------------------------------

export const updateProfile = async (req, res) => {
    try {
        const { fullname, contact, address } = req.body;

        const user = await userModel.findById(req.user._id);

        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }

        if (fullname !== undefined) {
            user.fullname = fullname.trim();
        }

        if (contact !== undefined && contact !== user.contact) {
            const existingContact = await userModel.findOne({
                contact,
                _id: { $ne: user._id }
            });

            if (existingContact) {
                return res.status(400).json({
                    message: "This contact number is already used by another account",
                    success: false
                });
            }

            user.contact = contact;
        }

        if (address && typeof address === "object") {
            const fields = [
                "fullName",
                "phone",
                "addressLine1",
                "addressLine2",
                "city",
                "state",
                "pincode"
            ];

            const updatedAddress = {};

            for (const field of fields) {
                updatedAddress[field] =
                    typeof address[field] === "string"
                        ? address[field].trim()
                        : (user.address?.[field] || "");
            }

            user.address = updatedAddress;
        }

        await user.save();

        return res.status(200).json({
            message: "Profile updated successfully",
            success: true,
            user: publicUser(user)
        });

    } catch (error) {
        console.error("Update profile error:", error);

        return res.status(500).json({
            message: "Server error",
            success: false
        });
    }
};

