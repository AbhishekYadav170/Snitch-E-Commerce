import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router';
import { useSelector } from 'react-redux';
import { useOrder } from '../hooks/useOrder';
import { useTokens } from '../../../app/ThemeContext';

const OrderConfirmation = () => {
    const { orderId } = useParams();
    const lastPlacedOrder = useSelector(state => state.order.lastPlacedOrder);
    const { handleGetOrderById } = useOrder();
    const tokens = useTokens();

    const [ order, setOrder ] = useState(lastPlacedOrder?._id === orderId ? lastPlacedOrder : null);
    const [ loading, setLoading ] = useState(!order);

    useEffect(() => {
        if (order) return;
        handleGetOrderById(orderId)
            .then(setOrder)
            .finally(() => setLoading(false));
    }, [ orderId ]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: tokens.surface }}>
                <p className="text-[10px] uppercase tracking-[0.2em] animate-pulse" style={{ color: tokens.muted, fontFamily: "'Inter', sans-serif" }}>
                    Loading your order...
                </p>
            </div>
        );
    }

    if (!order) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-6" style={{ backgroundColor: tokens.surface, fontFamily: "'Inter', sans-serif" }}>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", color: tokens.onSurface }} className="text-lg">Order not found.</p>
                <Link to="/" className="px-8 py-3 text-[11px] uppercase tracking-[0.2em] font-medium" style={{ backgroundColor: tokens.onSurface, color: tokens.surface }}>
                    Back to Home
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen selection:bg-[#C9A96E]/30" style={{ backgroundColor: tokens.surface, fontFamily: "'Inter', sans-serif" }}>
            <div className="max-w-3xl mx-auto px-6 py-24 text-center flex flex-col items-center">
                <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mb-8"
                    style={{ backgroundColor: '#16241a', color: '#9fd9a0' }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                    </svg>
                </div>

                <span className="text-[10px] uppercase tracking-[0.24em] font-medium mb-4" style={{ color: tokens.primary }}>
                    Order Confirmed
                </span>
                <h1 className="text-4xl font-light mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", color: tokens.onSurface }}>
                    Thank you for your order.
                </h1>
                <p className="text-sm mb-2" style={{ color: tokens.secondary }}>
                    Order ID: <span style={{ color: tokens.onSurface }}>{order._id}</span>
                </p>
                <p className="text-sm mb-12" style={{ color: tokens.secondary }}>
                    Payment Method: Cash on Delivery
                </p>

                <div className="w-full border p-8 text-left" style={{ borderColor: tokens.outlineVariant, backgroundColor: tokens.surfaceLow }}>
                    <h2 className="text-lg font-light mb-6" style={{ fontFamily: "'Cormorant Garamond', serif", color: tokens.onSurface }}>
                        Items
                    </h2>
                    <div className="flex flex-col gap-4 mb-6">
                        {order.items.map((item, idx) => (
                            <div key={idx} className="flex justify-between text-[12px]" style={{ color: tokens.secondary }}>
                                <span>{item.title} × {item.quantity}</span>
                                <span style={{ color: tokens.onSurface }}>
                                    {item.price?.currency} {(item.price?.amount * item.quantity).toLocaleString()}
                                </span>
                            </div>
                        ))}
                    </div>
                    <div className="h-px w-full mb-6" style={{ backgroundColor: tokens.outlineVariant }} />
                    <div className="flex justify-between text-sm font-medium mb-8" style={{ color: tokens.onSurface }}>
                        <span>Total</span>
                        <span>{order.totalAmount?.currency} {order.totalAmount?.amount?.toLocaleString()}</span>
                    </div>

                    <h2 className="text-lg font-light mb-3" style={{ fontFamily: "'Cormorant Garamond', serif", color: tokens.onSurface }}>
                        Shipping To
                    </h2>
                    <p className="text-[12px] leading-relaxed" style={{ color: tokens.secondary }}>
                        {order.shippingAddress?.fullName}, {order.shippingAddress?.phone}<br />
                        {order.shippingAddress?.addressLine1}{order.shippingAddress?.addressLine2 ? `, ${order.shippingAddress.addressLine2}` : ''}<br />
                        {order.shippingAddress?.city}, {order.shippingAddress?.state} - {order.shippingAddress?.pincode}
                    </p>
                </div>

                <div className="flex gap-4 mt-10">
                    <Link to="/my-orders" className="px-8 py-3 text-[11px] uppercase tracking-[0.2em] font-medium" style={{ backgroundColor: tokens.onSurface, color: tokens.surface }}>
                        View My Orders
                    </Link>
                    <Link to="/" className="px-8 py-3 text-[11px] uppercase tracking-[0.2em] font-medium border" style={{ borderColor: tokens.outlineVariant, color: tokens.onSurface }}>
                        Continue Shopping
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default OrderConfirmation;
