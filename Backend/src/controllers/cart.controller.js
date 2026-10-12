// import mongoose from "mongoose"
// import cartModel from "../models/cart.model.js"
// import productModel from "../models/product.model.js"
// import { stockOfVariant } from "../dao/product.dao.js"

// export const addToCart = async (req, res) => {

//     const { productId, variantId } = req.params
//     const { quantity = 1 } = req.body

//     const product = await productModel.findOne({
//         _id: productId,
//         "variants._id": variantId
//     })

//     if (!product) {
//         return res.status(404).json({
//             message: "Product or variant not found",
//             success: false
//         })
//     }

//     const stock = await stockOfVariant(productId, variantId)

//     const cart = (await cartModel.findOne({ user: req.user._id })) ||
//         (await cartModel.create({ user: req.user._id }))

//     const isProductAlreadyInCart = cart.items.some(item => item.product.toString() === productId && item.variant?.toString() === variantId)

//     if (isProductAlreadyInCart) {
//         const quantityInCart = cart.items.find(item => item.product.toString() === productId && item.variant?.toString() === variantId).quantity
//         if (quantityInCart + quantity > stock) {
//             return res.status(400).json({
//                 message: `Only ${stock} items left in stock. and you already have ${quantityInCart} items in your cart`,
//                 success: false
//             })
//         }

//         await cartModel.findOneAndUpdate(
//             { user: req.user._id, "items.product": productId, "items.variant": variantId },
//             { $inc: { "items.$.quantity": quantity } },
//             { new: true }
//         )

//         return res.status(200).json({
//             message: "Cart updated successfully",
//             success: true
//         })
//     }

//     if (quantity > stock) {
//         return res.status(400).json({
//             message: `Only ${stock} items left in stock`,
//             success: false
//         })
//     }

//     cart.items.push({
//         product: productId,
//         variant: variantId,
//         quantity,
//         price: product.price
//     })

//     await cart.save()

//     return res.status(200).json({
//         message: "Product added to cart successfully",
//         success: true
//     })
// }

// export const getCart = async (req, res) => {
//     const user = req.user

//     let cart = await cartModel.aggregate([
//     {
//       $match: {
//         user: new mongoose.Types.ObjectId(user._id)
//       }
//     },
//     { $unwind: { path: '$items' } },
//     {
//       $lookup: {
//         from: 'products',
//         localField: 'items.product',
//         foreignField: '_id',
//         as: 'items.product'
//       }
//     },
//     { $unwind: { path: '$items.product' } },
//     {
//       $unwind: { path: '$items.product.variants' }
//     },
//     {
//       $match: {
//         $expr: {
//           $eq: [
//             '$items.variant',
//             '$items.product.variants._id'
//           ]
//         }
//       }
//     },
//     {
//       $addFields: {
//         itemPrice: {
//           price: {
//             $multiply: [
//               '$items.quantity',
//               '$items.product.variants.price.amount'
//             ]
//           },
//           currency:
//             '$items.product.variants.price.currency'
//         }
//       }
//     },
//     {
//       $group: {
//         _id: '$_id',
//         totalPrice: { $sum: '$itemPrice.price' },
//         currency: {
//           $first: '$itemPrice.currency'
//         },
//         items: { $push: '$items' }
//       }
//     }
//   ],
//   { maxTimeMS: 60000, allowDiskUse: true }
// );

//     // aggregate() always returns an array (even when empty), so take the
//     // first (and only) grouped cart document, or fall back to an empty cart
//     cart = cart[ 0 ] || { items: [] }

//     return res.status(200).json({
//         message: "Cart fetched successfully",
//         success: true,
//         cart
//     })
// }

// export const incrementCartItemQuantity = async (req, res) => {

//     const { productId, variantId } = req.params

//     const product = await productModel.findOne({
//         _id: productId,
//         "variants._id": variantId
//     })

//     if (!product) {
//         return res.status(404).json({
//             message: "Product or variant not found",
//             success: false
//         })
//     }

//      const cart = await cartModel.findOne({ user: req.user._id })

//     if (!cart) {
//         return res.status(404).json({
//             message: "Cart not found",
//             success: false
//         })
//     }

//     const stock = await stockOfVariant(productId, variantId)

//     const itemQuantityInCart = cart.items.find(item => item.product.toString() === productId && item.variant?.toString() === variantId)?.quantity || 0

//     if (itemQuantityInCart + 1 > stock) {
//         return res.status(400).json({
//             message: `Only ${stock} items left in stock. and you already have ${itemQuantityInCart} items in your cart`,
//             success: false
//         })
//     }

//     await cartModel.findOneAndUpdate(
//         { user: req.user._id, "items.product": productId, "items.variant": variantId },
//         { $inc: { "items.$.quantity": 1 } },
//         { new: true }
//     )

//     return res.status(200).json({
//         message: "Cart item quantity incremented successfully",
//         success: true
//     })
// }

// export const decrementCartItemQuantity = async (req, res) => {

//     const { productId, variantId } = req.params

//     const cart = await cartModel.findOne({ user: req.user._id })

//     if (!cart) {
//         return res.status(404).json({
//             message: "Cart not found",
//             success: false
//         })
//     }

//     const item = cart.items.find(item => item.product.toString() === productId && item.variant?.toString() === variantId)

//     if (!item) {
//         return res.status(404).json({
//             message: "Item not found in cart",
//             success: false
//         })
//     }

//     if (item.quantity <= 1) {
//         // Quantity floor is 1 — decrementing further does nothing.
//         // The item is only ever removed when the user explicitly clicks "Remove".
//         return res.status(200).json({
//             message: "Quantity is already at the minimum (1)",
//             success: true,
//             removed: false
//         })
//     }

//     await cartModel.findOneAndUpdate(
//         { user: req.user._id, "items.product": productId, "items.variant": variantId },
//         { $inc: { "items.$.quantity": -1 } },
//         { new: true }
//     )

//     return res.status(200).json({
//         message: "Cart item quantity decremented successfully",
//         success: true,
//         removed: false
//     })
// }

// export const removeCartItem = async (req, res) => {

//     const { productId, variantId } = req.params

//     const cart = await cartModel.findOneAndUpdate(
//         { user: req.user._id },
//         { $pull: { items: { product: productId, variant: variantId } } },
//         { new: true }
//     )

//     if (!cart) {
//         return res.status(404).json({
//             message: "Cart not found",
//             success: false
//         })
//     }

//     return res.status(200).json({
//         message: "Item removed from cart successfully",
//         success: true
//     })
// }





import mongoose from "mongoose"
import cartModel from "../models/cart.model.js"
import productModel from "../models/product.model.js"
import { stockOfVariant } from "../dao/product.dao.js"



export const addToCart = async (req, res) => {

    const { productId, variantId } = req.params
    const { quantity = 1 } = req.body

    const product = await productModel.findOne({
        _id: productId,
        "variants._id": variantId
    })

    if (!product) {
        return res.status(404).json({
            message: "Product or variant not found",
            success: false
        })
    }

    const stock = await stockOfVariant(productId, variantId)

    const cart = (await cartModel.findOne({ user: req.user._id })) ||
        (await cartModel.create({ user: req.user._id }))

    const isProductAlreadyInCart = cart.items.some(item => item.product.toString() === productId && item.variant?.toString() === variantId)

    if (isProductAlreadyInCart) {
        const existingItem = cart.items.find(item => item.product.toString() === productId && item.variant?.toString() === variantId)

        // Already booked earlier: treat this as a fresh add (start a new order line)
        if (existingItem.ordered) {
            if (quantity > stock) {
                return res.status(400).json({
                    message: `Only ${stock} items left in stock`,
                    success: false
                })
            }
            existingItem.ordered = false
            existingItem.quantity = quantity
            await cart.save()
            return res.status(200).json({
                message: "Cart updated successfully",
                success: true
            })
        }

        const quantityInCart = existingItem.quantity
        if (quantityInCart + quantity > stock) {
            return res.status(400).json({
                message: `Only ${stock} items left in stock. and you already have ${quantityInCart} items in your cart`,
                success: false
            })
        }

        await cartModel.findOneAndUpdate(
            { user: req.user._id, "items.product": productId, "items.variant": variantId },
            { $inc: { "items.$.quantity": quantity } },
            { new: true }
        )

        return res.status(200).json({
            message: "Cart updated successfully",
            success: true
        })
    }

    if (quantity > stock) {
        return res.status(400).json({
            message: `Only ${stock} items left in stock`,
            success: false
        })
    }

    cart.items.push({
        product: productId,
        variant: variantId,
        quantity,
        price: product.price
    })

    await cart.save()

    return res.status(200).json({
        message: "Product added to cart successfully",
        success: true
    })
}

export const getCart = async (req, res) => {
    const user = req.user

    let cart = await cartModel.aggregate([
    {
      $match: {
        user: new mongoose.Types.ObjectId(user._id)
      }
    },
    { $unwind: { path: '$items' } },
    {
      $lookup: {
        from: 'products',
        localField: 'items.product',
        foreignField: '_id',
        as: 'items.product'
      }
    },
    { $unwind: { path: '$items.product' } },
    {
      $unwind: { path: '$items.product.variants' }
    },
    {
      $match: {
        $expr: {
          $eq: [
            '$items.variant',
            '$items.product.variants._id'
          ]
        }
      }
    },
    {
      $addFields: {
        itemPrice: {
          price: {
            $multiply: [
              '$items.quantity',
              '$items.product.variants.price.amount'
            ]
          },
          currency:
            '$items.product.variants.price.currency'
        }
      }
    },
    {
      $group: {
        _id: '$_id',
        totalPrice: { $sum: '$itemPrice.price' },
        currency: {
          $first: '$itemPrice.currency'
        },
        items: { $push: '$items' }
      }
    }
  ],
  { maxTimeMS: 60000, allowDiskUse: true }
);

    // aggregate() always returns an array (even when empty), so take the
    // first (and only) grouped cart document, or fall back to an empty cart
    cart = cart[ 0 ] || { items: [] }

    return res.status(200).json({
        message: "Cart fetched successfully",
        success: true,
        cart
    })
}

export const incrementCartItemQuantity = async (req, res) => {

    const { productId, variantId } = req.params

    const product = await productModel.findOne({
        _id: productId,
        "variants._id": variantId
    })

    if (!product) {
        return res.status(404).json({
            message: "Product or variant not found",
            success: false
        })
    }

     const cart = await cartModel.findOne({ user: req.user._id })

    if (!cart) {
        return res.status(404).json({
            message: "Cart not found",
            success: false
        })
    }

    const stock = await stockOfVariant(productId, variantId)

    const cartItem = cart.items.find(item => item.product.toString() === productId && item.variant?.toString() === variantId)

    if (cartItem?.ordered) {
        return res.status(400).json({
            message: "This item is already ordered. Use 'Order again' to book it once more.",
            success: false
        })
    }

    const itemQuantityInCart = cartItem?.quantity || 0

    if (itemQuantityInCart + 1 > stock) {
        return res.status(400).json({
            message: `Only ${stock} items left in stock. and you already have ${itemQuantityInCart} items in your cart`,
            success: false
        })
    }

    await cartModel.findOneAndUpdate(
        { user: req.user._id, "items.product": productId, "items.variant": variantId },
        { $inc: { "items.$.quantity": 1 } },
        { new: true }
    )

    return res.status(200).json({
        message: "Cart item quantity incremented successfully",
        success: true
    })
}

export const decrementCartItemQuantity = async (req, res) => {

    const { productId, variantId } = req.params

    const cart = await cartModel.findOne({ user: req.user._id })

    if (!cart) {
        return res.status(404).json({
            message: "Cart not found",
            success: false
        })
    }

    const item = cart.items.find(item => item.product.toString() === productId && item.variant?.toString() === variantId)

    if (!item) {
        return res.status(404).json({
            message: "Item not found in cart",
            success: false
        })
    }

    if (item.ordered) {
        return res.status(400).json({
            message: "This item is already ordered. Use 'Order again' to change it.",
            success: false
        })
    }

    if (item.quantity <= 1) {
        // Quantity floor is 1 — decrementing further does nothing.
        // The item is only ever removed when the user explicitly clicks "Remove".
        return res.status(200).json({
            message: "Quantity is already at the minimum (1)",
            success: true,
            removed: false
        })
    }

    await cartModel.findOneAndUpdate(
        { user: req.user._id, "items.product": productId, "items.variant": variantId },
        { $inc: { "items.$.quantity": -1 } },
        { new: true }
    )

    return res.status(200).json({
        message: "Cart item quantity decremented successfully",
        success: true,
        removed: false
    })
}

export const removeCartItem = async (req, res) => {

    const { productId, variantId } = req.params

    const cart = await cartModel.findOneAndUpdate(
        { user: req.user._id },
        { $pull: { items: { product: productId, variant: variantId } } },
        { new: true }
    )

    if (!cart) {
        return res.status(404).json({
            message: "Cart not found",
            success: false
        })
    }

    return res.status(200).json({
        message: "Item removed from cart successfully",
        success: true
    })
}

export const reorderCartItem = async (req, res) => {
    try {
        const { productId, variantId } = req.params

        const cart = await cartModel.findOne({ user: req.user._id })

        if (!cart) {
            return res.status(404).json({ message: "Cart not found", success: false })
        }

        const item = cart.items.find(item => item.product.toString() === productId && item.variant?.toString() === variantId)

        if (!item) {
            return res.status(404).json({ message: "Item not found in cart", success: false })
        }

        const stock = await stockOfVariant(productId, variantId)

        if (stock <= 0) {
            return res.status(400).json({ message: "This item is out of stock right now", success: false })
        }

        item.ordered = false
        item.quantity = Math.max(1, Math.min(item.quantity, stock))
        await cart.save()

        return res.status(200).json({
            message: "Item is ready to order again",
            success: true
        })
    } catch (error) {
        console.error("reorderCartItem failed:", error)
        return res.status(500).json({ message: "Could not update this item.", success: false })
    }
}
