import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useOrder } from '../hooks/useOrder';

const STATUS_OPTIONS = [ 'placed', 'processing', 'shipped', 'delivered', 'cancelled' ];

const STATUS_COLORS = {
    placed: { bg: '#2a2818', text: '#e9c98f' },
    processing: { bg: '#1c2438', text: '#8fb8e9' },
    shipped: { bg: '#1c2438', text: '#8fb8e9' },
    delivered: { bg: '#16241a', text: '#9fd9a0' },
    cancelled: { bg: '#2e1616', text: '#ff9a94' },
};

const SellerOrders = () => {
    const sellerOrders = useSelector(state => state.order.sellerOrders);
    const sellerId = useSelector(state => state.auth.user?._id);
    const { handleGetSellerOrders, handleUpdateOrderStatus } = useOrder();
    const [ updatingId, setUpdatingId ] = useState(null);
    const [ error, setError ] = useState(null);

    useEffect(() => {
        handleGetSellerOrders();
    }, []);

    const onStatusChange = async (orderId, status) => {
        setError(null);
        setUpdatingId(orderId);
        try {
            await handleUpdateOrderStatus(orderId, status);
        } catch (err) {
            setError(err?.response?.data?.message || 'Could not update order status.');
        } finally {
            setUpdatingId(null);
        }
    };

    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500&family=Inter:wght@300;400;500;600&display=swap"
                rel="stylesheet"
            />
            <div className="min-h-screen selection:bg-[#FFD700]/30" style={{ backgroundColor: '#131313', fontFamily: "'Inter', sans-serif" }}>
                <div className="max-w-5xl mx-auto px-8 lg:px-16 py-16">
                    <h1 className="text-4xl font-light mb-2" style={{ fontFamily: "'Cormorant Garamond', serif", color: '#e5e2e1' }}>
                        Incoming Orders
                    </h1>
                    <div className="mt-4 mb-10 w-14 h-px" style={{ backgroundColor: '#FFD700' }} />

                    {error && (
                        <div className="mb-8 text-[11px] uppercase tracking-[0.15em] font-medium px-5 py-4 border" style={{ backgroundColor: '#2e1616', borderColor: '#5c2b2b', color: '#ff9a94' }}>
                            {error}
                        </div>
                    )}

                    {!sellerOrders || sellerOrders.length === 0 ? (
                        <div className="py-20 text-center">
                            <p style={{ fontFamily: "'Cormorant Garamond', serif", color: '#999077' }}>
                                No orders yet.
                            </p>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-6">
                            {sellerOrders.map(order => {
                                const myItems = order.items.filter(item => item.seller === sellerId || item.seller?._id === sellerId);
                                const itemsToShow = myItems.length > 0 ? myItems : order.items;
                                const statusStyle = STATUS_COLORS[ order.status ] || STATUS_COLORS.placed;

                                return (
                                    <div key={order._id} className="border p-6" style={{ borderColor: '#33302a', backgroundColor: '#1c1b1b' }}>
                                        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                                            <div>
                                                <p className="text-[10px] uppercase tracking-[0.15em]" style={{ color: '#999077' }}>
                                                    Order #{order._id.slice(-8)}
                                                </p>
                                                <p className="text-[11px]" style={{ color: '#999077' }}>
                                                    {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                                                </p>
                                            </div>

                                            <div className="flex items-center gap-3">
                                                <span
                                                    className="text-[10px] uppercase tracking-[0.15em] font-semibold px-3 py-1.5"
                                                    style={{ backgroundColor: statusStyle.bg, color: statusStyle.text }}
                                                >
                                                    {order.status}
                                                </span>
                                                <select
                                                    value={order.status}
                                                    disabled={updatingId === order._id}
                                                    onChange={(e) => onStatusChange(order._id, e.target.value)}
                                                    className="text-[11px] uppercase tracking-[0.1em] px-3 py-2 border disabled:opacity-50"
                                                    style={{ backgroundColor: '#131313', borderColor: '#4d4732', color: '#e5e2e1' }}
                                                >
                                                    {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                                                </select>
                                            </div>
                                        </div>

                                        <div className="flex flex-col gap-2 mb-4">
                                            {itemsToShow.map((item, idx) => (
                                                <div key={idx} className="flex justify-between text-[12px]" style={{ color: '#999077' }}>
                                                    <span>{item.title} × {item.quantity}</span>
                                                    <span style={{ color: '#e5e2e1' }}>
                                                        {item.price?.currency} {(item.price?.amount * item.quantity).toLocaleString()}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="h-px w-full mb-4" style={{ backgroundColor: '#33302a' }} />

                                        <p className="text-[11px] leading-relaxed" style={{ color: '#8a8071' }}>
                                            Ship to: {order.shippingAddress?.fullName}, {order.shippingAddress?.addressLine1}, {order.shippingAddress?.city}, {order.shippingAddress?.state} - {order.shippingAddress?.pincode} · {order.shippingAddress?.phone}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default SellerOrders;
