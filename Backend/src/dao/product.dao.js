// import productModel from "../models/product.model.js"

// export const stockOfVariant = async (productId, variantId) => {
//     const product = await productModel.findOne({
//         _id: productId,
//         "variantId._id": variantId
//     })

//     const stock = product.variants.find(variant => variant._id.toString() === variantId).stock

//     return stock
// }


import productModel from "../models/product.model.js"

export const stockOfVariant = async (productId, variantId) => {
    const product = await productModel.findOne({
        _id: productId,
        "variants._id": variantId   // ✅ FIX
    })

    if (!product) {
        return null   // safety
    }

    const variant = product.variants.find(
        v => v._id.toString() === variantId
    )

    return variant?.stock || 0
}