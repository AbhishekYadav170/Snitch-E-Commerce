import cartModel from "../models/cart.model.js";
import orderModel from "../models/order.model.js";

export const placeOrder = async (req, res) => {
  try {
    const { shippingAddress } = req.body;

    const cart = await cartModel.findOne({ user: req.user._id }).populate("items.product");

    if (!cart || cart.items.length === 0) {
        return res.status(400).json({
            message: "Your cart is empty",
            success: false
        });
    }

    // 1. Validate stock and build order item snapshots
    const orderItems = [];

    for (const item of cart.items) {
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
    for (const item of cart.items) {
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

    // 5. Clear the cart
    cart.items = [];
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
