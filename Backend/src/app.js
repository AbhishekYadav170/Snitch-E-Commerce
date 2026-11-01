// import express from "express";
// import cookieParser from "cookie-parser";
// import morgan from "morgan";
// import authRouter from "./routes/auth.routes.js";
// import productRouter from "./routes/product.routes.js";
// import cartRouter from "./routes/cart.routes.js"
// import orderRouter from "./routes/order.routes.js"
// import cors from "cors";
// import passport from "passport";
// import { Strategy as GoogleStrategy } from "passport-google-oauth20"
// import { config } from "./config/config.js";

// const app = express();

// app.use(morgan("dev"));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());
// app.use(cors({
//     origin: "http://localhost:5173",
//     methods: [ "GET", "POST", "PUT", "PATCH", "DELETE" ],
//     credentials: true
// }))


// app.use(passport.initialize());

// passport.use(new GoogleStrategy({
//     clientID: config.GOOGLE_CLIENT_ID,
//     clientSecret: config.GOOGLE_CLIENT_SECRET,
//     callbackURL: "/api/auth/google/callback"
// }, (accessToken, refreshToken, profile, done) => {
//     return done(null, profile);
// }))

// app.get("/", (_req, res) => {
//     res.status(200).json({ message: "Server is running" });
// });

// app.use("/api/auth", authRouter);
// app.use("/api/products", productRouter);
// app.use("/api/cart", cartRouter);
// app.use("/api/orders", orderRouter);

// export default app;








// import express from "express";
// import cookieParser from "cookie-parser";
// import morgan from "morgan";
// import authRouter from "./routes/auth.routes.js";
// import productRouter from "./routes/product.routes.js";
// import cartRouter from "./routes/cart.routes.js"
// import orderRouter from "./routes/order.routes.js"
// import wishlistRouter from "./routes/wishlist.routes.js"
// import reviewRouter from "./routes/review.routes.js"
// import cors from "cors";
// import passport from "passport";
// import { Strategy as GoogleStrategy } from "passport-google-oauth20"
// import { config } from "./config/config.js";

// const app = express();

// app.use(morgan("dev"));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());
// // app.use(cors({
// //     origin: "http://localhost:5173",
// //     methods: [ "GET", "POST", "PUT", "PATCH", "DELETE" ],
// //     credentials: true
// // }))

// app.use(cors({
//     origin: [
//         "http://localhost:5173",
//         config.FRONTEND_URL
//     ].filter(Boolean),
//     methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
//     credentials: true
// }));


// app.use(passport.initialize());

// passport.use(new GoogleStrategy({
//     clientID: config.GOOGLE_CLIENT_ID,
//     clientSecret: config.GOOGLE_CLIENT_SECRET,
//     // callbackURL: "/api/auth/google/callback"
//      callbackURL: "https://snitch-e-commerce-11f1.onrender.com/api/auth/google/callback"
// }, (accessToken, refreshToken, profile, done) => {
//     return done(null, profile);
// }))

// app.get("/", (_req, res) => {
//     res.status(200).json({ message: "Server is running" });
// });

// app.use("/api/auth", authRouter);
// app.use("/api/products", productRouter);
// app.use("/api/cart", cartRouter);
// app.use("/api/orders", orderRouter);
// app.use("/api/wishlist", wishlistRouter);
// app.use("/api/reviews", reviewRouter);

// export default app;




import express from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import cors from "cors";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

import authRouter from "./routes/auth.routes.js";
import productRouter from "./routes/product.routes.js";
import cartRouter from "./routes/cart.routes.js";
import orderRouter from "./routes/order.routes.js";
import wishlistRouter from "./routes/wishlist.routes.js";
import reviewRouter from "./routes/review.routes.js";

import { config } from "./config/config.js";

const app = express();

// --------------------------------------------------
// Basic Middleware
// --------------------------------------------------

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// --------------------------------------------------
// CORS Configuration
// --------------------------------------------------

const allowedOrigins = [
    "http://localhost:5173",
    config.FRONTEND_URL
].filter(Boolean);

app.use(
    cors({
        origin: allowedOrigins,
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
        credentials: true
    })
);

// --------------------------------------------------
// Google OAuth Configuration
// --------------------------------------------------

app.use(passport.initialize());

passport.use(
    new GoogleStrategy(
        {
            clientID: config.GOOGLE_CLIENT_ID,
            clientSecret: config.GOOGLE_CLIENT_SECRET,
            callbackURL:
                "https://snitch-e-commerce-11f1.onrender.com/api/auth/google/callback"
        },
        (accessToken, refreshToken, profile, done) => {
            return done(null, profile);
        }
    )
);

// --------------------------------------------------
// Health Check
// --------------------------------------------------

app.get("/", (_req, res) => {
    return res.status(200).json({
        success: true,
        message: "Server is running"
    });
});

// --------------------------------------------------
// API Routes
// --------------------------------------------------

app.use("/api/auth", authRouter);
app.use("/api/products", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/orders", orderRouter);
app.use("/api/wishlist", wishlistRouter);
app.use("/api/reviews", reviewRouter);

// --------------------------------------------------
// 404 Handler
// --------------------------------------------------

app.use((req, res) => {
    return res.status(404).json({
        success: false,
        message: `Route not found: ${req.method} ${req.originalUrl}`
    });
});

// --------------------------------------------------
// Global Error Handler
// --------------------------------------------------

app.use((error, req, res, next) => {
    console.error("Server error:", error);

    if (res.headersSent) {
        return next(error);
    }

    return res.status(500).json({
        success: false,
        message: "Internal server error"
    });
});

export default app;