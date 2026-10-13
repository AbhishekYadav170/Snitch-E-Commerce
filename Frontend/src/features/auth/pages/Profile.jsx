import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router';
import { useAuth } from '../hook/useAuth';
import { useTokens } from '../../../app/ThemeContext';

const EMPTY_ADDRESS = { fullName: '', phone: '', addressLine1: '', addressLine2: '', city: '', state: '', pincode: '' };

// Defined outside Profile so inputs keep focus while typing
const Field = ({ tokens, label, name, value, onChange, required, type = 'text', maxLength, placeholder }) => (
    <div className="flex flex-col gap-2">
        <label className="text-[10px] uppercase tracking-[0.15em]" style={{ color: tokens.secondary }}>{label}</label>
        <input
            type={type} name={name} value={value} onChange={onChange} required={required} maxLength={maxLength} placeholder={placeholder}
            className="w-full px-4 py-3 text-sm outline-none border"
            style={{ backgroundColor: tokens.surfaceLow, borderColor: tokens.outlineVariant, color: tokens.onSurface }}
        />
    </div>
);

const Profile = () => {
    const user = useSelector(state => state.auth.user);
    const { handleUpdateProfile } = useAuth();
    const tokens = useTokens();

    const [ fullname, setFullname ] = useState(user?.fullname || '');
    const [ contact, setContact ] = useState(user?.contact || '');
    const [ address, setAddress ] = useState({ ...EMPTY_ADDRESS, ...(user?.address || {}) });
    const [ saving, setSaving ] = useState(false);
    const [ message, setMessage ] = useState(null); // { type, text }

    const onAddressChange = (e) => {
        const { name, value } = e.target;
        setAddress(prev => ({ ...prev, [ name ]: value }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setMessage(null);
        setSaving(true);
        try {
            await handleUpdateProfile({ fullname, contact, address });
            setMessage({ type: 'success', text: 'Profile saved. Your address will be pre-filled at checkout.' });
        } catch (err) {
            setMessage({
                type: 'error',
                text: err?.response?.data?.message || err?.response?.data?.errors?.[ 0 ]?.msg || 'Could not save your profile.',
            });
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="min-h-screen" style={{ backgroundColor: tokens.surface, fontFamily: "'Inter', sans-serif" }}>
            <div className="max-w-2xl mx-auto px-6 md:px-12 py-16">
                <h1 className="text-4xl font-light mb-2" style={{ fontFamily: "'Cormorant Garamond', serif", color: tokens.onSurface }}>
                    My Profile
                </h1>
                <p className="text-[11px] uppercase tracking-[0.2em] mb-10" style={{ color: tokens.muted }}>{user?.email}</p>

                <form onSubmit={onSubmit} className="flex flex-col gap-10">
                    <section className="flex flex-col gap-5">
                        <h2 className="text-[10px] uppercase tracking-[0.3em]" style={{ color: tokens.primary }}>Account</h2>
                        <Field tokens={tokens} label="Full name" name="fullname" value={fullname} onChange={(e) => setFullname(e.target.value)} required />
                        <Field tokens={tokens} label="Contact number" name="contact" value={contact} onChange={(e) => setContact(e.target.value.replace(/\D/g, '').slice(0, 10))} maxLength={10} placeholder="10-digit mobile number" />
                    </section>

                    <section className="flex flex-col gap-5">
                        <h2 className="text-[10px] uppercase tracking-[0.3em]" style={{ color: tokens.primary }}>Saved delivery address</h2>
                        <Field tokens={tokens} label="Full name" name="fullName" value={address.fullName} onChange={onAddressChange} />
                        <Field tokens={tokens} label="Phone number" name="phone" value={address.phone} onChange={onAddressChange} />
                        <Field tokens={tokens} label="Address line 1" name="addressLine1" value={address.addressLine1} onChange={onAddressChange} />
                        <Field tokens={tokens} label="Address line 2 (optional)" name="addressLine2" value={address.addressLine2} onChange={onAddressChange} />
                        <div className="grid grid-cols-2 gap-5">
                            <Field tokens={tokens} label="City" name="city" value={address.city} onChange={onAddressChange} />
                            <Field tokens={tokens} label="State" name="state" value={address.state} onChange={onAddressChange} />
                        </div>
                        <Field tokens={tokens} label="Pincode" name="pincode" value={address.pincode} onChange={(e) => setAddress(prev => ({ ...prev, pincode: e.target.value.replace(/\D/g, '').slice(0, 6) }))} maxLength={6} />
                    </section>

                    {message && (
                        <div
                            className="text-[12px] px-4 py-3"
                            style={message.type === 'success'
                                ? { backgroundColor: '#16241a', color: '#9fd9a0' }
                                : { backgroundColor: '#2e1616', color: '#ff9a94' }}
                        >
                            {message.text}
                        </div>
                    )}

                    <div className="flex items-center gap-6">
                        <button
                            type="submit"
                            disabled={saving}
                            className="px-10 py-4 text-[11px] uppercase tracking-[0.25em] font-medium disabled:opacity-50 cursor-pointer"
                            style={{ backgroundColor: tokens.onSurface, color: tokens.surface }}
                        >
                            {saving ? 'Saving...' : 'Save profile'}
                        </button>
                        <Link to="/my-orders" className="text-[11px] uppercase tracking-[0.2em] underline" style={{ color: tokens.secondary }}>My orders</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Profile;
