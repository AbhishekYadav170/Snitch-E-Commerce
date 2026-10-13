// import cartModel from "../models/cart.model.js";
// import orderModel from "../models/order.model.js";

// export const placeOrder = async (req, res) => {
//   try {
//     const { shippingAddress, selectedItems } = req.body;

//     const cart = await cartModel.findOne({ user: req.user._id }).populate("items.product");

//     if (!cart || cart.items.length === 0) {
//         return res.status(400).json({
//             message: "Your cart is empty",
//             success: false
//         });
//     }

//     // Only order the items the customer ticked in the cart.
//     // (If `selectedItems` isn't sent, fall back to the whole cart.)
//     const keyOf = (productId, variantId) => `${productId}-${variantId}`;
//     let itemsToOrder = cart.items;

//     if (Array.isArray(selectedItems)) {
//         const wanted = new Set(selectedItems.map(s => keyOf(s.productId, s.variantId)));
//         itemsToOrder = cart.items.filter(item => wanted.has(keyOf(item.product?._id, item.variant)));

//         if (itemsToOrder.length === 0) {
//             return res.status(400).json({
//                 message: "Please select at least one item from your cart to order",
//                 success: false
//             });
//         }
//     }

//     // 1. Validate stock and build order item snapshots
//     const orderItems = [];

//     for (const item of itemsToOrder) {
//         const product = item.product;

//         if (!product) {
//             return res.status(404).json({
//                 message: "One of the items in your cart is no longer available",
//                 success: false
//             });
//         }

//         const variant = item.variant ? product.variants.id(item.variant) : null;

//         if (variant && item.quantity > variant.stock) {
//             return res.status(400).json({
//                 message: `Only ${variant.stock} unit(s) of "${product.title}" left in stock`,
//                 success: false
//             });
//         }

//         orderItems.push({
//             product: product._id,
//             seller: product.seller,
//             variant: item.variant,
//             title: product.title,
//             image: variant?.images?.[ 0 ]?.url || product.images?.[ 0 ]?.url,
//             attributes: variant?.attributes || {},
//             quantity: item.quantity,
//             price: item.price
//         });
//     }

//     // 2. Decrement stock for each item.
//     // (We mutate the already-populated variant subdocument directly and
//     // save the parent product — this sidesteps MongoDB's positional-operator
//     // `$` update, which can throw "Cannot create field '_id'" errors when
//     // the array filter doesn't resolve exactly as expected.)
//     for (const item of itemsToOrder) {
//         if (item.variant) {
//             const product = item.product;
//             const variant = product.variants.id(item.variant);
//             if (variant) {
//                 variant.stock = Math.max(0, variant.stock - item.quantity);
//                 await product.save();
//             }
//         }
//     }

//     // 3. Compute total
//     const totalAmount = {
//         amount: orderItems.reduce((sum, i) => sum + i.price.amount * i.quantity, 0),
//         currency: orderItems[ 0 ]?.price?.currency || "INR"
//     };

//     // 4. Create the order
//     const order = await orderModel.create({
//         buyer: req.user._id,
//         items: orderItems,
//         shippingAddress,
//         totalAmount,
//         paymentMethod: "cod",
//         paymentStatus: "pending",
//         status: "placed"
//     });

//     // 5. The cart is intentionally left untouched after ordering — items only
//     //    leave the cart when the customer removes them manually.

//     return res.status(201).json({
//         message: "Order placed successfully",
//         success: true,
//         order
//     });
//   } catch (error) {
//     console.error("placeOrder failed:", error);
//     return res.status(500).json({
//         message: "Something went wrong while placing your order. Please try again.",
//         success: false
//     });
//   }
// };

// export const getMyOrders = async (req, res) => {
//   try {
//     const orders = await orderModel.find({ buyer: req.user._id }).sort({ createdAt: -1 });

//     return res.status(200).json({
//         message: "Orders fetched successfully",
//         success: true,
//         orders
//     });
//   } catch (error) {
//     console.error("getMyOrders failed:", error);
//     return res.status(500).json({ message: "Could not fetch your orders.", success: false });
//   }
// };

// export const getSellerOrders = async (req, res) => {
//   try {
//     const orders = await orderModel.find({ "items.seller": req.user._id }).sort({ createdAt: -1 });

//     return res.status(200).json({
//         message: "Orders fetched successfully",
//         success: true,
//         orders
//     });
//   } catch (error) {
//     console.error("getSellerOrders failed:", error);
//     return res.status(500).json({ message: "Could not fetch orders.", success: false });
//   }
// };

// export const getOrderById = async (req, res) => {
//   try {
//     const { orderId } = req.params;

//     const order = await orderModel.findOne({
//         _id: orderId,
//         $or: [
//             { buyer: req.user._id },
//             { "items.seller": req.user._id }
//         ]
//     });

//     if (!order) {
//         return res.status(404).json({
//             message: "Order not found",
//             success: false
//         });
//     }

//     return res.status(200).json({
//         message: "Order fetched successfully",
//         success: true,
//         order
//     });
//   } catch (error) {
//     console.error("getOrderById failed:", error);
//     return res.status(500).json({ message: "Could not fetch this order.", success: false });
//   }
// };

// export const updateOrderStatus = async (req, res) => {
//   try {
//     const { orderId } = req.params;
//     const { status } = req.body;

//     // Note: an order can technically contain items from multiple sellers.
//     // For simplicity this updates the order's overall status, and any
//     // seller who owns at least one item in the order is allowed to do so.
//     const order = await orderModel.findOne({ _id: orderId, "items.seller": req.user._id });

//     if (!order) {
//         return res.status(404).json({
//             message: "Order not found",
//             success: false
//         });
//     }

//     order.status = status;
//     await order.save();

//     return res.status(200).json({
//         message: "Order status updated successfully",
//         success: true,
//         order
//     });
//   } catch (error) {
//     console.error("updateOrderStatus failed:", error);
//     return res.status(500).json({ message: "Could not update order status.", success: false });
//   }
// };



// import cartModel from "../models/cart.model.js";
// import orderModel from "../models/order.model.js";
// import productModel from "../models/product.model.js";

// export const placeOrder = async (req, res) => {
//   try {
//     const { shippingAddress, selectedItems } = req.body;

//     const cart = await cartModel.findOne({ user: req.user._id }).populate("items.product");

//     if (!cart || cart.items.length === 0) {
//         return res.status(400).json({
//             message: "Your cart is empty",
//             success: false
//         });
//     }

//     // Only order the items the customer ticked in the cart.
//     // (If `selectedItems` isn't sent, fall back to the whole cart.)
//     const keyOf = (productId, variantId) => `${productId}-${variantId}`;
//     let itemsToOrder = cart.items;

//     if (Array.isArray(selectedItems)) {
//         const wanted = new Set(selectedItems.map(s => keyOf(s.productId, s.variantId)));
//         itemsToOrder = cart.items.filter(item => wanted.has(keyOf(item.product?._id, item.variant)));

//         if (itemsToOrder.length === 0) {
//             return res.status(400).json({
//                 message: "Please select at least one item from your cart to order",
//                 success: false
//             });
//         }
//     }

//     // 1. Validate stock and build order item snapshots
//     const orderItems = [];

//     for (const item of itemsToOrder) {
//         const product = item.product;

//         if (!product) {
//             return res.status(404).json({
//                 message: "One of the items in your cart is no longer available",
//                 success: false
//             });
//         }

//         const variant = item.variant ? product.variants.id(item.variant) : null;

//         if (variant && item.quantity > variant.stock) {
//             return res.status(400).json({
//                 message: `Only ${variant.stock} unit(s) of "${product.title}" left in stock`,
//                 success: false
//             });
//         }

//         orderItems.push({
//             product: product._id,
//             seller: product.seller,
//             variant: item.variant,
//             title: product.title,
//             image: variant?.images?.[ 0 ]?.url || product.images?.[ 0 ]?.url,
//             attributes: variant?.attributes || {},
//             quantity: item.quantity,
//             price: item.price
//         });
//     }

//     // 2. Decrement stock for each item.
//     // (We mutate the already-populated variant subdocument directly and
//     // save the parent product — this sidesteps MongoDB's positional-operator
//     // `$` update, which can throw "Cannot create field '_id'" errors when
//     // the array filter doesn't resolve exactly as expected.)
//     for (const item of itemsToOrder) {
//         if (item.variant) {
//             const product = item.product;
//             const variant = product.variants.id(item.variant);
//             if (variant) {
//                 variant.stock = Math.max(0, variant.stock - item.quantity);
//                 await product.save();
//             }
//         }
//     }

//     // 3. Compute total
//     const totalAmount = {
//         amount: orderItems.reduce((sum, i) => sum + i.price.amount * i.quantity, 0),
//         currency: orderItems[ 0 ]?.price?.currency || "INR"
//     };

//     // 4. Create the order
//     const order = await orderModel.create({
//         buyer: req.user._id,
//         items: orderItems,
//         shippingAddress,
//         totalAmount,
//         paymentMethod: "cod",
//         paymentStatus: "pending",
//         status: "placed"
//     });

//     // 5. Items stay in the cart, but are marked "ordered" so they can't be
//     //    booked twice by mistake.
//     for (const item of itemsToOrder) {
//         const cartItem = cart.items.id(item._id);
//         if (cartItem) cartItem.ordered = true;
//     }
//     await cart.save();

//     return res.status(201).json({
//         message: "Order placed successfully",
//         success: true,
//         order
//     });
//   } catch (error) {
//     console.error("placeOrder failed:", error);
//     return res.status(500).json({
//         message: "Something went wrong while placing your order. Please try again.",
//         success: false
//     });
//   }
// };

// export const getMyOrders = async (req, res) => {
//   try {
//     const orders = await orderModel.find({ buyer: req.user._id }).sort({ createdAt: -1 });

//     return res.status(200).json({
//         message: "Orders fetched successfully",
//         success: true,
//         orders
//     });
//   } catch (error) {
//     console.error("getMyOrders failed:", error);
//     return res.status(500).json({ message: "Could not fetch your orders.", success: false });
//   }
// };

// export const getSellerOrders = async (req, res) => {
//   try {
//     const orders = await orderModel.find({ "items.seller": req.user._id }).sort({ createdAt: -1 });

//     return res.status(200).json({
//         message: "Orders fetched successfully",
//         success: true,
//         orders
//     });
//   } catch (error) {
//     console.error("getSellerOrders failed:", error);
//     return res.status(500).json({ message: "Could not fetch orders.", success: false });
//   }
// };

// export const getOrderById = async (req, res) => {
//   try {
//     const { orderId } = req.params;

//     const order = await orderModel.findOne({
//         _id: orderId,
//         $or: [
//             { buyer: req.user._id },
//             { "items.seller": req.user._id }
//         ]
//     });

//     if (!order) {
//         return res.status(404).json({
//             message: "Order not found",
//             success: false
//         });
//     }

//     return res.status(200).json({
//         message: "Order fetched successfully",
//         success: true,
//         order
//     });
//   } catch (error) {
//     console.error("getOrderById failed:", error);
//     return res.status(500).json({ message: "Could not fetch this order.", success: false });
//   }
// };

// export const updateOrderStatus = async (req, res) => {
//   try {
//     const { orderId } = req.params;
//     const { status } = req.body;

//     // Note: an order can technically contain items from multiple sellers.
//     // For simplicity this updates the order's overall status, and any
//     // seller who owns at least one item in the order is allowed to do so.
//     const order = await orderModel.findOne({ _id: orderId, "items.seller": req.user._id });

//     if (!order) {
//         return res.status(404).json({
//             message: "Order not found",
//             success: false
//         });
//     }

//     order.status = status;
//     await order.save();

//     return res.status(200).json({
//         message: "Order status updated successfully",
//         success: true,
//         order
//     });
//   } catch (error) {
//     console.error("updateOrderStatus failed:", error);
//     return res.status(500).json({ message: "Could not update order status.", success: false });
//   }
// };

// export const cancelOrder = async (req, res) => {
//   try {
//     const { orderId } = req.params;

//     const order = await orderModel.findOne({ _id: orderId, buyer: req.user._id });

//     if (!order) {
//         return res.status(404).json({ message: "Order not found", success: false });
//     }

//     if (![ "placed", "processing" ].includes(order.status)) {
//         return res.status(400).json({
//             message: `This order is already ${order.status} and can't be cancelled.`,
//             success: false
//         });
//     }

//     // Put the stock back
//     for (const item of order.items) {
//         if (!item.variant) continue;
//         const product = await productModel.findById(item.product);
//         if (!product) continue;
//         const variant = product.variants.id(item.variant);
//         if (variant) {
//             variant.stock += item.quantity;
//             await product.save();
//         }
//     }

//     order.status = "cancelled";
//     await order.save();

//     // Un-mark the cart lines so the customer can order them again
//     const cart = await cartModel.findOne({ user: req.user._id });
//     if (cart) {
//         let changed = false;
//         for (const item of order.items) {
//             const line = cart.items.find(c => c.product.toString() === item.product.toString() && c.variant?.toString() === item.variant?.toString());
//             if (line && line.ordered) { line.ordered = false; changed = true; }
//         }
//         if (changed) await cart.save();
//     }

//     return res.status(200).json({
//         message: "Order cancelled successfully",
//         success: true,
//         order
//     });
//   } catch (error) {
//     console.error("cancelOrder failed:", error);
//     return res.status(500).json({ message: "Could not cancel this order.", success: false });
//   }
// };





import cartModel from "../models/cart.model.js";
import orderModel from "../models/order.model.js";
import productModel from "../models/product.model.js";

export const placeOrder = async (req, res) => {
  try {
    const { shippingAddress, selectedItems } = req.body;

    const cart = await cartModel.findOne({ user: req.user._id }).populate("items.product");

    if (!cart || cart.items.length === 0) {
        return res.status(400).json({
            message: "Your cart is empty",
            success: false
        });
    }

    // Only order the items the customer ticked in the cart.
    // (If `selectedItems` isn't sent, fall back to the whole cart.)
    const keyOf = (productId, variantId) => `${productId}-${variantId}`;
    let itemsToOrder = cart.items;

    if (Array.isArray(selectedItems)) {
        const wanted = new Set(selectedItems.map(s => keyOf(s.productId, s.variantId)));
        itemsToOrder = cart.items.filter(item => wanted.has(keyOf(item.product?._id, item.variant)));

        if (itemsToOrder.length === 0) {
            return res.status(400).json({
                message: "Please select at least one item from your cart to order",
                success: false
            });
        }
    }

    // 1. Validate stock and build order item snapshots
    const orderItems = [];

    for (const item of itemsToOrder) {
        const product = item.product;

        if (!product) {
            return res.status(404).json({
                message: "One of the items in your cart is no longer available",
                success: false
            });
        }

        const variant = item.variant ? product.variants.id(item.variant) : null;

        if (variant && item.quantity > variant.stock) {
            return res.status(400).json({
                message: `Only ${variant.stock} unit(s) of "${product.title}" left in stock`,
                success: false
            });
        }

        orderItems.push({
            product: product._id,
            seller: product.seller,
            variant: item.variant,
            title: product.title,
            image: variant?.images?.[ 0 ]?.url || product.images?.[ 0 ]?.url,
            attributes: variant?.attributes || {},
            quantity: item.quantity,
            price: item.price
        });
    }

    // 2. Decrement stock for each item.
    // (We mutate the already-populated variant subdocument directly and
    // save the parent product — this sidesteps MongoDB's positional-operator
    // `$` update, which can throw "Cannot create field '_id'" errors when
    // the array filter doesn't resolve exactly as expected.)
    for (const item of itemsToOrder) {
        if (item.variant) {
            const product = item.product;
            const variant = product.variants.id(item.variant);
            if (variant) {
                variant.stock = Math.max(0, variant.stock - item.quantity);
                await product.save();
            }
        }
    }

    // 3. Compute total
    const totalAmount = {
        amount: orderItems.reduce((sum, i) => sum + i.price.amount * i.quantity, 0),
        currency: orderItems[ 0 ]?.price?.currency || "INR"
    };

    // 4. Create the order
    const order = await orderModel.create({
        buyer: req.user._id,
        items: orderItems,
        shippingAddress,
        totalAmount,
        paymentMethod: "cod",
        paymentStatus: "pending",
        status: "placed"
    });

    // 5. Items stay in the cart, but are marked "ordered" so they can't be
    //    booked twice by mistake.
    for (const item of itemsToOrder) {
        const cartItem = cart.items.id(item._id);
        if (cartItem) cartItem.ordered = true;
    }
    await cart.save();

    return res.status(201).json({
        message: "Order placed successfully",
        success: true,
        order
    });
  } catch (error) {
    console.error("placeOrder failed:", error);
    return res.status(500).json({
        message: "Something went wrong while placing your order. Please try again.",
        success: false
    });
  }
};

export const getMyOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ buyer: req.user._id }).sort({ createdAt: -1 });

    return res.status(200).json({
        message: "Orders fetched successfully",
        success: true,
        orders
    });
  } catch (error) {
    console.error("getMyOrders failed:", error);
    return res.status(500).json({ message: "Could not fetch your orders.", success: false });
  }
};

export const getSellerOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ "items.seller": req.user._id }).sort({ createdAt: -1 });

    return res.status(200).json({
        message: "Orders fetched successfully",
        success: true,
        orders
    });
  } catch (error) {
    console.error("getSellerOrders failed:", error);
    return res.status(500).json({ message: "Could not fetch orders.", success: false });
  }
};

export const getSellerSummary = async (req, res) => {
  try {
    const sellerId = req.user._id.toString();
    const orders = await orderModel.find({ "items.seller": req.user._id }).sort({ createdAt: -1 });

    let revenue = 0;
    let unitsSold = 0;
    let orderCount = 0;
    const statusCounts = { placed: 0, processing: 0, shipped: 0, delivered: 0, cancelled: 0 };
    const perProduct = new Map();

    // Last 7 days (including today), oldest first
    const days = [];
    for (let i = 6; i >= 0; i--) {
        const d = new Date();
        d.setHours(0, 0, 0, 0);
        d.setDate(d.getDate() - i);
        days.push({ date: d, label: d.toLocaleDateString("en-IN", { day: "numeric", month: "short" }), revenue: 0 });
    }

    for (const order of orders) {
        const mine = order.items.filter(i => i.seller?.toString() === sellerId);
        if (mine.length === 0) continue;

        statusCounts[ order.status ] = (statusCounts[ order.status ] || 0) + 1;

        // Cancelled orders don't count as sales
        if (order.status === "cancelled") continue;

        orderCount += 1;

        for (const item of mine) {
            const amount = (item.price?.amount || 0) * item.quantity;
            revenue += amount;
            unitsSold += item.quantity;

            const key = item.product?.toString() || item.title;
            const row = perProduct.get(key) || { title: item.title, image: item.image, units: 0, revenue: 0 };
            row.units += item.quantity;
            row.revenue += amount;
            perProduct.set(key, row);

            const day = days.find(d => d.date.getTime() === new Date(order.createdAt).setHours(0, 0, 0, 0));
            if (day) day.revenue += amount;
        }
    }

    const topProducts = [ ...perProduct.values() ].sort((a, b) => b.units - a.units).slice(0, 5);

    return res.status(200).json({
        message: "Sales summary fetched successfully",
        success: true,
        summary: {
            revenue,
            unitsSold,
            orderCount,
            currency: "INR",
            statusCounts,
            topProducts,
            last7Days: days.map(d => ({ label: d.label, revenue: d.revenue }))
        }
    });
  } catch (error) {
    console.error("getSellerSummary failed:", error);
    return res.status(500).json({ message: "Could not fetch sales summary.", success: false });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await orderModel.findOne({
        _id: orderId,
        $or: [
            { buyer: req.user._id },
            { "items.seller": req.user._id }
        ]
    });

    if (!order) {
        return res.status(404).json({
            message: "Order not found",
            success: false
        });
    }

    return res.status(200).json({
        message: "Order fetched successfully",
        success: true,
        order
    });
  } catch (error) {
    console.error("getOrderById failed:", error);
    return res.status(500).json({ message: "Could not fetch this order.", success: false });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    // Note: an order can technically contain items from multiple sellers.
    // For simplicity this updates the order's overall status, and any
    // seller who owns at least one item in the order is allowed to do so.
    const order = await orderModel.findOne({ _id: orderId, "items.seller": req.user._id });

    if (!order) {
        return res.status(404).json({
            message: "Order not found",
            success: false
        });
    }

    order.status = status;
    await order.save();

    return res.status(200).json({
        message: "Order status updated successfully",
        success: true,
        order
    });
  } catch (error) {
    console.error("updateOrderStatus failed:", error);
    return res.status(500).json({ message: "Could not update order status.", success: false });
  }
};

export const cancelOrder = async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await orderModel.findOne({ _id: orderId, buyer: req.user._id });

    if (!order) {
        return res.status(404).json({ message: "Order not found", success: false });
    }

    if (![ "placed", "processing" ].includes(order.status)) {
        return res.status(400).json({
            message: `This order is already ${order.status} and can't be cancelled.`,
            success: false
        });
    }

    // Put the stock back
    for (const item of order.items) {
        if (!item.variant) continue;
        const product = await productModel.findById(item.product);
        if (!product) continue;
        const variant = product.variants.id(item.variant);
        if (variant) {
            variant.stock += item.quantity;
            await product.save();
        }
    }

    order.status = "cancelled";
    await order.save();

    // Un-mark the cart lines so the customer can order them again
    const cart = await cartModel.findOne({ user: req.user._id });
    if (cart) {
        let changed = false;
        for (const item of order.items) {
            const line = cart.items.find(c => c.product.toString() === item.product.toString() && c.variant?.toString() === item.variant?.toString());
            if (line && line.ordered) { line.ordered = false; changed = true; }
        }
        if (changed) await cart.save();
    }

    return res.status(200).json({
        message: "Order cancelled successfully",
        success: true,
        order
    });
  } catch (error) {
    console.error("cancelOrder failed:", error);
    return res.status(500).json({ message: "Could not cancel this order.", success: false });
  }
};
