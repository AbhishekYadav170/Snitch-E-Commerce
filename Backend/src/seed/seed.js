/**
 * Sample data seeder.
 *
 * Creates one demo seller account (if it doesn't exist yet) and a handful of
 * clothing products, each with multiple color variants and sizes
 * (S, M, L, XL, XXL). Every color gets its own placeholder image so
 * selecting a color on the product page swaps the photo, exactly like a
 * real store.
 *
 * Run with:  npm run seed   (from the Backend folder)
 *
 * Safe to re-run — it removes only the products it previously created
 * (matched by the demo seller) before re-inserting them.
 */

import mongoose from "mongoose"
import connectDB from "../config/db.js"
import userModel from "../models/user.model.js"
import productModel from "../models/product.model.js"

const SIZES = [ "S", "M", "L", "XL", "XXL" ]

// A few valid CSS color names mapped to a hex pair for the placeholder images.
// (The color attribute itself is stored as the plain name, e.g. "Black",
// which the frontend also uses directly as a CSS background-color.)
const COLOR_HEX = {
    Black: [ "1b1c1a", "ffffff" ],
    White: [ "f5f3f0", "1b1c1a" ],
    Navy: [ "1b2a4a", "ffffff" ],
    Olive: [ "6b6b3a", "ffffff" ],
    Maroon: [ "5c1a1a", "ffffff" ],
    Beige: [ "cbb994", "1b1c1a" ],
    Grey: [ "808080", "ffffff" ],
    Brown: [ "5a3d2b", "ffffff" ],
    Blue: [ "2b4c7e", "ffffff" ],
    Red: [ "8a2d2d", "ffffff" ],
    Green: [ "3d5a34", "ffffff" ],
}

function placeholderImage(title, color) {
    const [ bg, fg ] = COLOR_HEX[ color ] || [ "cccccc", "1b1c1a" ]
    const text = encodeURIComponent(`${title}\n${color}`)
    return `https://placehold.co/900x1125/${bg}/${fg}?text=${text}&font=montserrat`
}

const CATALOG = [
    {
        title: "Classic Oxford Shirt",
        description: "A crisp, tailored Oxford shirt cut from breathable cotton — smart enough for the office, relaxed enough for the weekend.",
        basePrice: 2299,
        colors: [ "White", "Navy" ],
    },
    {
        title: "Essential Crew Neck Tee",
        description: "Our best-selling everyday tee, made from heavyweight combed cotton for a fit that holds its shape wash after wash.",
        basePrice: 999,
        colors: [ "Black", "White", "Grey" ],
    },
    {
        title: "Relaxed Denim Jacket",
        description: "A timeless denim jacket with a relaxed fit and just the right amount of wash, layered easily over anything.",
        basePrice: 3499,
        colors: [ "Blue", "Black" ],
    },
    {
        title: "Tailored Wool Trousers",
        description: "Precision-tailored trousers in a soft wool blend, finished with a clean crease for a polished silhouette.",
        basePrice: 2999,
        colors: [ "Grey", "Black" ],
    },
    {
        title: "Everyday Hoodie",
        description: "A brushed-fleece hoodie built for comfort — soft on the inside, structured on the outside.",
        basePrice: 1799,
        colors: [ "Black", "Beige", "Olive" ],
    },
    {
        title: "Linen Summer Shirt",
        description: "Lightweight, breathable linen cut for warm days, with a relaxed drape and mother-of-pearl buttons.",
        basePrice: 1999,
        colors: [ "White", "Beige" ],
    },
    {
        title: "Slim Fit Chinos",
        description: "Versatile slim-fit chinos in a durable cotton twill, tapered through the leg for a modern silhouette.",
        basePrice: 1899,
        colors: [ "Beige", "Olive", "Navy" ],
    },
    {
        title: "Merino Knit Sweater",
        description: "A fine-gauge merino wool sweater, naturally temperature-regulating and soft against the skin.",
        basePrice: 2799,
        colors: [ "Maroon", "Grey" ],
    },
]

async function run() {
    await connectDB()

    // 1. Prefer attaching demo products to an ALREADY EXISTING seller account
    //    (so they show up in that seller's own dashboard and can be managed/
    //    deleted from there). Falls back to creating a demo seller only if
    //    no seller account exists yet in the database.
    const sellerEmail = "seller@snitch.demo"
    let seller = await userModel.findOne({ role: "seller" }).sort({ createdAt: 1 })

    if (!seller) {
        seller = await userModel.create({
            email: sellerEmail,
            password: "Seller@123",
            fullname: "Snitch Studio",
            contact: "9999999999",
            role: "seller",
        })
        console.log(`No seller account found — created a demo one (${sellerEmail} / Seller@123)`)
    } else {
        console.log(`Attaching seeded products to existing seller: ${seller.email}`)
    }

    // 2. Clear out only products previously created BY THIS SCRIPT (matched
    //    by title) — never touches the seller's own real listings.
    const seedTitles = CATALOG.map(item => item.title)
    const deleted = await productModel.deleteMany({ seller: seller._id, title: { $in: seedTitles } })
    console.log(`Removed ${deleted.deletedCount} previously seeded demo product(s)`)

    // 3. Build and insert the catalog
    const productsToInsert = CATALOG.map(item => {
        const variants = []

        item.colors.forEach(color => {
            const images = [ { url: placeholderImage(item.title, color) } ]

            SIZES.forEach(size => {
                variants.push({
                    images,
                    stock: Math.floor(Math.random() * 16) + 5, // 5-20 in stock
                    attributes: { color, size },
                    price: { amount: item.basePrice, currency: "INR" },
                })
            })
        })

        return {
            title: item.title,
            description: item.description,
            seller: seller._id,
            price: { amount: item.basePrice, currency: "INR" },
            images: [ { url: placeholderImage(item.title, item.colors[ 0 ]) } ],
            variants,
        }
    })

    const inserted = await productModel.insertMany(productsToInsert)
    console.log(`Inserted ${inserted.length} products with color + size variants`)

    await mongoose.connection.close()
    console.log("Done. Database connection closed.")
}

run().catch(err => {
    console.error("Seeding failed:", err)
    process.exit(1)
})
