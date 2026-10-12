import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router';
import { useAuth } from '../hook/useAuth';

const ResetPassword = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const { handleResetPassword } = useAuth();
    const [ password, setPassword ] = useState('');
    const [ confirm, setConfirm ] = useState('');
    const [ submitting, setSubmitting ] = useState(false);
    const [ done, setDone ] = useState(false);
    const [ error, setError ] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (password.length < 6) {
            setError('Password must be at least 6 characters long');
            return;
        }
        if (password !== confirm) {
            setError('Passwords do not match');
            return;
        }
        setSubmitting(true);
        try {
            await handleResetPassword({ token, password });
            setDone(true);
            setTimeout(() => navigate('/login'), 2500);
        } catch (err) {
            setError(err?.response?.data?.message || err?.response?.data?.errors?.[ 0 ]?.msg || 'Something went wrong. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0e0e0e] text-[#e5e2e1] font-sans selection:bg-[#FFD700] selection:text-[#131313] flex items-center justify-center px-6">
            <div className="w-full max-w-md bg-[#131313] border border-[#1c1b1b] p-8 md:p-10">
                <h1 className="text-3xl font-light mb-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Set a new password</h1>
                <p className="text-sm text-[#999077] mb-8">Choose a new password for your account.</p>

                {done ? (
                    <div className="px-4 py-3 text-[12px] bg-[#16241a] text-[#9fd9a0]">
                        Password updated! Redirecting you to login...
                    </div>
                ) : (
                    <>
                        {error && <div className="mb-5 px-4 py-3 text-[12px] bg-[#2e1616] text-[#ff9a94]">{error}</div>}
                        <form onSubmit={onSubmit} className="flex flex-col gap-5">
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="New password"
                                className="w-full bg-[#1c1b1b] border border-[#2a2a2a] focus:border-[#FFD700] outline-none px-4 py-3 text-sm text-[#e5e2e1] placeholder-[#6b6757] transition-colors"
                            />
                            <input
                                type="password"
                                required
                                value={confirm}
                                onChange={(e) => setConfirm(e.target.value)}
                                placeholder="Confirm new password"
                                className="w-full bg-[#1c1b1b] border border-[#2a2a2a] focus:border-[#FFD700] outline-none px-4 py-3 text-sm text-[#e5e2e1] placeholder-[#6b6757] transition-colors"
                            />
                            <button type="submit" disabled={submitting} className="w-full bg-[#FFD700] text-[#131313] py-3.5 text-[11px] uppercase tracking-[0.2em] font-semibold hover:opacity-90 transition-opacity disabled:opacity-50">
                                {submitting ? 'Updating...' : 'Update password'}
                            </button>
                        </form>
                    </>
                )}

                <p className="mt-8 text-xs text-[#999077] text-center">
                    <Link to="/login" className="hover:text-[#FFD700] transition-colors">← Back to login</Link>
                </p>
            </div>
        </div>
    );
};

export default ResetPassword;
