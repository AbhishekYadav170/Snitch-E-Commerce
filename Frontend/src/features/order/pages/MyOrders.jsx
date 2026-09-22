import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router';
import { useOrder } from '../hooks/useOrder';
import { useTokens } from '../../../app/ThemeContext';

const STATUS_COLORS = {
    placed: { bg: '#2a2818', text: '#e9c98f' },
    processing: { bg: '#1c2438', text: '#8fb8e9' },
    shipped: { bg: '#1c2438', text: '#8fb8e9' },
    delivered: { bg: '#16241a', text: '#9fd9a0' },
    cancelled: { bg: '#2e1616', text: '#ff9a94' },
};

const MyOrders = () => {
    const myOrders = useSelector(state => state.order.myOrders);
    const { handleGetMyOrders } = useOrder();
    const tokens = useTokens();

    useEffect(() => {
        handleGetMyOrders();
    }, []);

    return (
        <div className="min-h-screen selection:bg-[#C9A96E]/30" style={{ backgroundColor: tokens.surface, fontFamily: "'Inter', sans-serif" }}>
            <div className="max-w-4xl mx-auto px-6 md:px-12 py-16">
                <h1 className="text-4xl font-light mb-2" style={{ fontFamily: "'Cormorant Garamond', serif", color: tokens.onSurface }}>
                    My Orders
                </h1>
                <p className="text-[11px] uppercase tracking-[0.2em] mb-12" style={{ color: tokens.muted }}>
                    {myOrders?.length ?? 0} order{myOrders?.length !== 1 ? 's' : ''}
                </p>

                {!myOrders || myOrders.length === 0 ? (
                    <div className="py-20 text-center">
                        <p className="mb-6" style={{ fontFamily: "'Cormorant Garamond', serif", color: tokens.onSurface }} >
                            You haven't placed any orders yet.
                        </p>
                        <Link to="/" className="px-8 py-3 text-[11px] uppercase tracking-[0.2em] font-medium" style={{ backgroundColor: tokens.onSurface, color: tokens.surface }}>
                            Start Shopping
                        </Link>
                    </div>
                ) : (
                    <div className="flex flex-col gap-6">
                        {myOrders.map(order => {
                            const statusStyle = STATUS_COLORS[ order.status ] || STATUS_COLORS.placed;
                            return (
                                <div key={order._id} className="border p-6" style={{ borderColor: tokens.outlineVariant, backgroundColor: tokens.surfaceLow }}>
                                    <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                                        <div>
                                            <p className="text-[10px] uppercase tracking-[0.15em]" style={{ color: tokens.muted }}>
                                                Order #{order._id.slice(-8)}
                                            </p>
                                            <p className="text-[11px]" style={{ color: tokens.secondary }}>
                                                {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                                            </p>
                                        </div>
                                        <span
                                            className="text-[10px] uppercase tracking-[0.15em] font-semibold px-3 py-1.5"
                                            style={{ backgroundColor: statusStyle.bg, color: statusStyle.text }}
                                        >
                                            {order.status}
                                        </span>
                                    </div>

                                    <div className="flex flex-col gap-2 mb-4">
                                        {order.items.map((item, idx) => (
                                            <div key={idx} className="flex justify-between text-[12px]" style={{ color: tokens.secondary }}>
                                                <span>{item.title} × {item.quantity}</span>
                                                <span style={{ color: tokens.onSurface }}>
                                                    {item.price?.currency} {(item.price?.amount * item.quantity).toLocaleString()}
                                                </span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="h-px w-full mb-4" style={{ backgroundColor: tokens.outlineVariant }} />
                                    <div className="flex justify-between text-sm font-medium" style={{ color: tokens.onSurface }}>
                                        <span>Total</span>
                                        <span>{order.totalAmount?.currency} {order.totalAmount?.amount?.toLocaleString()}</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyOrders;
