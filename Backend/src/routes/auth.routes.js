// import { Router } from "express";
// import { validateRegisterUser } from "../validator/auth.validator.js";
// import { register } from "../controllers/auth.controller.js"


// const router = Router();


// router.post('/register', validateRegisterUser,register)



// export default router;










import { Router } from "express";
import { validateRegisterUser, validateLoginUser } from "../validator/auth.validator.js";
import { getAllProduct, getMe, googleCallback, login, register } from "../controllers/auth.controller.js";
import passport from "passport";
import { config } from "../config/config.js";
import { authenticateUser } from "../middlewares/auth.middleware.js";

const router = Router();



router.post('/register', validateRegisterUser, register)

router.post("/login", validateLoginUser, login)


// /api/auth/google
router.get("/google",
    passport.authenticate("google", { scope: [ "profile", "email" ] }))

router.get("/google/callback",
    passport.authenticate("google", {
        session: false,
        failureRedirect: config.NODE_ENV == "development" ? "http://localhost:5173/login" : "/login"
    }),
    googleCallback,
)


/**
 * @route Get /api/auth/me
 * @description Get the authenticated user's [rofile
 * @acess Private
 */
router.get('/me', authenticateUser, getMe)


/**
 * @route GET /api/product
 * @description Get all product
 * @access Public
 */
router.get("/", getAllProduct)



export default router;