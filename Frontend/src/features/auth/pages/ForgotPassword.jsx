import React, { useState } from 'react';
import { Link } from 'react-router';
import { useAuth } from '../hook/useAuth';

const ForgotPassword = () => {
    const { handleForgotPassword } = useAuth();
    const [ email, setEmail ] = useState('');
    const [ submitting, setSubmitting ] = useState(false);
    const [ message, setMessage ] = useState('');
    const [ error, setError ] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');
        setSubmitting(true);
        try {
            const data = await handleForgotPassword({ email });
            setMessage(data?.message || 'If an account exists for this email, a reset link has been sent.');
        } catch (err) {
            setError(err?.response?.data?.message || err?.response?.data?.errors?.[ 0 ]?.msg || 'Something went wrong. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0e0e0e] text-[#e5e2e1] font-sans selection:bg-[#FFD700] selection:text-[#131313] flex items-center justify-center px-6">
            <div className="w-full max-w-md bg-[#131313] border border-[#1c1b1b] p-8 md:p-10">
                <h1 className="text-3xl font-light mb-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Forgot password?</h1>
                <p className="text-sm text-[#999077] mb-8">Enter your email and we'll send you a link to reset your password.</p>

                {message && <div className="mb-5 px-4 py-3 text-[12px] bg-[#16241a] text-[#9fd9a0]">{message}</div>}
                {error && <div className="mb-5 px-4 py-3 text-[12px] bg-[#2e1616] text-[#ff9a94]">{error}</div>}

                <form onSubmit={onSubmit} className="flex flex-col gap-5">
                    <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full bg-[#1c1b1b] border border-[#2a2a2a] focus:border-[#FFD700] outline-none px-4 py-3 text-sm text-[#e5e2e1] placeholder-[#6b6757] transition-colors"
                    />
                    <button type="submit" disabled={submitting} className="w-full bg-[#FFD700] text-[#131313] py-3.5 text-[11px] uppercase tracking-[0.2em] font-semibold hover:opacity-90 transition-opacity disabled:opacity-50">
                        {submitting ? 'Sending...' : 'Send reset link'}
                    </button>
                </form>

                <p className="mt-8 text-xs text-[#999077] text-center">
                    <Link to="/login" className="hover:text-[#FFD700] transition-colors">← Back to login</Link>
                </p>
            </div>
        </div>
    );
};

export default ForgotPassword;
