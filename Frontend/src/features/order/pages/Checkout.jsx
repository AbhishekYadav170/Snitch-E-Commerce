import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router';
import { useOrder } from '../hooks/useOrder';
import { useTokens } from '../../../app/ThemeContext';

const Checkout = () => {
    const cartItems = useSelector(state => state.cart.items);
    const { handlePlaceOrder } = useOrder();
    const navigate = useNavigate();
    const tokens = useTokens();

    const [ form, setForm ] = useState({
        fullName: '',
        phone: '',
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        pincode: ''
    });
    const [ isPlacing, setIsPlacing ] = useState(false);
    const [ error, setError ] = useState(null);

    const subtotal = cartItems?.reduce((sum, item) => {
        return sum + (item.price?.amount ?? 0) * (item.quantity ?? 1);
    }, 0) ?? 0;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [ name ]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setIsPlacing(true);
        try {
            const order = await handlePlaceOrder(form);
            navigate(`/order-confirmation/${order._id}`);
        } catch (err) {
            setError(err?.response?.data?.message || err?.response?.data?.errors?.[ 0 ]?.msg || 'Could not place your order. Please try again.');
        } finally {
            setIsPlacing(false);
        }
    };

    if (!cartItems || cartItems.length === 0) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-6" style={{ backgroundColor: tokens.surface, fontFamily: "'Inter', sans-serif" }}>
                <p className="text-lg" style={{ fontFamily: "'Cormorant Garamond', serif", color: tokens.onSurface }}>
                    Your cart is empty.
                </p>
                <Link
                    to="/"
                    className="px-8 py-3 text-[11px] uppercase tracking-[0.2em] font-medium"
                    style={{ backgroundColor: tokens.onSurface, color: tokens.surface }}
                >
                    Continue Shopping
                </Link>
            </div>
        );
    }

    const inputClass = "w-full bg-transparent border-b py-3 text-sm focus:outline-none transition-colors";

    return (
        <div className="min-h-screen selection:bg-[#C9A96E]/30" style={{ backgroundColor: tokens.surface, fontFamily: "'Inter', sans-serif" }}>
            <div className="max-w-6xl mx-auto px-6 md:px-12 py-16">
                <h1 className="text-4xl font-light mb-2" style={{ fontFamily: "'Cormorant Garamond', serif", color: tokens.onSurface }}>
                    Checkout
                </h1>
                <p className="text-[11px] uppercase tracking-[0.2em] mb-12" style={{ color: tokens.muted }}>
                    Shipping Details
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Shipping form */}
                    <form onSubmit={handleSubmit} className="lg:col-span-2 flex flex-col gap-6">
                        {error && (
                            <div
                                className="text-[11px] uppercase tracking-[0.15em] font-medium px-5 py-4 border"
                                style={{ backgroundColor: '#2e1616', borderColor: '#5c2b2b', color: '#ff9a94' }}
                            >
                                {error}
                            </div>
                        )}

                        <div>
                            <label className="text-[10px] uppercase tracking-[0.15em]" style={{ color: tokens.secondary }}>Full Name</label>
                            <input
                                name="fullName" required value={form.fullName} onChange={handleChange}
                                className={inputClass}
                                style={{ borderColor: tokens.outlineVariant, color: tokens.onSurface }}
                            />
                        </div>

                        <div>
                            <label className="text-[10px] uppercase tracking-[0.15em]" style={{ color: tokens.secondary }}>Phone Number</label>
                            <input
                                name="phone" required value={form.phone} onChange={handleChange}
                                className={inputClass}
                                style={{ borderColor: tokens.outlineVariant, color: tokens.onSurface }}
                            />
                        </div>

                        <div>
                            <label className="text-[10px] uppercase tracking-[0.15em]" style={{ color: tokens.secondary }}>Address Line 1</label>
                            <input
                                name="addressLine1" required value={form.addressLine1} onChange={handleChange}
                                className={inputClass}
                                style={{ borderColor: tokens.outlineVariant, color: tokens.onSurface }}
                            />
                        </div>

                        <div>
                            <label className="text-[10px] uppercase tracking-[0.15em]" style={{ color: tokens.secondary }}>Address Line 2 (optional)</label>
                            <input
                                name="addressLine2" value={form.addressLine2} onChange={handleChange}
                                className={inputClass}
                                style={{ borderColor: tokens.outlineVariant, color: tokens.onSurface }}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="text-[10px] uppercase tracking-[0.15em]" style={{ color: tokens.secondary }}>City</label>
                                <input
                                    name="city" required value={form.city} onChange={handleChange}
                                    className={inputClass}
                                    style={{ borderColor: tokens.outlineVariant, color: tokens.onSurface }}
                                />
                            </div>
                            <div>
                                <label className="text-[10px] uppercase tracking-[0.15em]" style={{ color: tokens.secondary }}>State</label>
                                <input
                                    name="state" required value={form.state} onChange={handleChange}
                                    className={inputClass}
                                    style={{ borderColor: tokens.outlineVariant, color: tokens.onSurface }}
                                />
                            </div>
                        </div>

                        <div className="w-1/2">
                            <label className="text-[10px] uppercase tracking-[0.15em]" style={{ color: tokens.secondary }}>Pincode</label>
                            <input
                                name="pincode" required value={form.pincode} onChange={handleChange}
                                className={inputClass}
                                style={{ borderColor: tokens.outlineVariant, color: tokens.onSurface }}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isPlacing}
                            className="mt-6 w-full py-4 text-[11px] uppercase tracking-[0.25em] font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                            style={{ backgroundColor: tokens.onSurface, color: tokens.surface }}
                        >
                            {isPlacing ? 'Placing Order...' : 'Place Order · Cash on Delivery'}
                        </button>
                        <p className="text-[11px] text-center" style={{ color: tokens.muted }}>
                            Pay in cash when your order is delivered.
                        </p>
                    </form>

                    {/* Order summary */}
                    <div className="border p-8 h-fit" style={{ borderColor: tokens.outlineVariant, backgroundColor: tokens.surfaceLow }}>
                        <h2 className="text-xl font-light mb-6" style={{ fontFamily: "'Cormorant Garamond', serif", color: tokens.onSurface }}>
                            Order Summary
                        </h2>
                        <div className="flex flex-col gap-4 mb-6">
                            {cartItems.map((item, idx) => (
                                <div key={idx} className="flex justify-between text-[12px]" style={{ color: tokens.secondary }}>
                                    <span>{item.product?.title} × {item.quantity}</span>
                                    <span style={{ color: tokens.onSurface }}>
                                        {item.price?.currency} {((item.price?.amount ?? 0) * (item.quantity ?? 1)).toLocaleString()}
                                    </span>
                                </div>
                            ))}
                        </div>
                        <div className="h-px w-full mb-6" style={{ backgroundColor: tokens.outlineVariant }} />
                        <div className="flex justify-between text-sm font-medium" style={{ color: tokens.onSurface }}>
                            <span>Total</span>
                            <span>{cartItems[ 0 ]?.price?.currency || 'INR'} {subtotal.toLocaleString()}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
