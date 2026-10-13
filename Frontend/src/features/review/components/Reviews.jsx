import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router';
import { getReviewsApi, saveReviewApi, deleteReviewApi } from '../service/review.api';
import StarRating from './StarRating';
import { useTokens } from '../../../app/ThemeContext';

const Reviews = ({ productId, onSummaryChange }) => {
    const tokens = useTokens();
    const user = useSelector(state => state.auth.user);

    const [ reviews, setReviews ] = useState([]);
    const [ summary, setSummary ] = useState({ avg: 0, count: 0 });
    const [ rating, setRating ] = useState(0);
    const [ hover, setHover ] = useState(0);
    const [ comment, setComment ] = useState('');
    const [ submitting, setSubmitting ] = useState(false);
    const [ message, setMessage ] = useState(null); // { type, text }

    const myReview = user ? reviews.find(r => r.user === user.id) : null;

    const load = async () => {
        try {
            const data = await getReviewsApi(productId);
            setReviews(data.reviews);
            setSummary(data.summary);
            onSummaryChange?.(data.summary);
        } catch (err) {
            console.error('Failed to load reviews', err);
        }
    };

    useEffect(() => {
        load();
    }, [ productId ]);

    // Pre-fill the form with the customer's own review so they can edit it
    useEffect(() => {
        if (myReview) {
            setRating(myReview.rating);
            setComment(myReview.comment || '');
        }
    }, [ myReview?._id ]);

    const onSubmit = async (e) => {
        e.preventDefault();
        setMessage(null);
        if (rating < 1) {
            setMessage({ type: 'error', text: 'Please choose a star rating.' });
            return;
        }
        setSubmitting(true);
        try {
            const data = await saveReviewApi(productId, { rating, comment });
            setSummary(data.summary);
            onSummaryChange?.(data.summary);
            await load();
            setMessage({ type: 'success', text: myReview ? 'Your review was updated.' : 'Thanks for your review!' });
        } catch (err) {
            setMessage({ type: 'error', text: err?.response?.data?.message || 'Could not save your review.' });
        } finally {
            setSubmitting(false);
        }
    };

    const onDelete = async () => {
        if (!window.confirm('Delete your review?')) return;
        try {
            await deleteReviewApi(productId);
            setRating(0);
            setComment('');
            setMessage(null);
            await load();
        } catch (err) {
            setMessage({ type: 'error', text: err?.response?.data?.message || 'Could not delete your review.' });
        }
    };

    const canReview = user && user.role !== 'seller';

    return (
        <section className="mt-24 pt-12 border-t" style={{ borderColor: tokens.outlineVariant, fontFamily: "'Inter', sans-serif" }}>
            <h2 className="text-3xl font-light mb-8" style={{ fontFamily: "'Cormorant Garamond', serif", color: tokens.onSurface }}>
                Customer Reviews
            </h2>

            <div className="grid lg:grid-cols-[260px_1fr] gap-12">
                {/* Summary + form */}
                <div>
                    <div className="mb-8">
                        <div className="text-5xl font-light mb-2" style={{ fontFamily: "'Cormorant Garamond', serif", color: tokens.onSurface }}>
                            {summary.count ? summary.avg.toFixed(1) : '–'}
                        </div>
                        <StarRating value={summary.avg} size={18} />
                        <p className="text-[11px] uppercase tracking-[0.18em] mt-2" style={{ color: tokens.muted }}>
                            {summary.count} review{summary.count !== 1 ? 's' : ''}
                        </p>
                    </div>

                    {canReview ? (
                        <form onSubmit={onSubmit} className="flex flex-col gap-4">
                            <p className="text-[11px] uppercase tracking-[0.18em] font-medium" style={{ color: tokens.secondary }}>
                                {myReview ? 'Edit your review' : 'Write a review'}
                            </p>
                            <div className="flex gap-1" onMouseLeave={() => setHover(0)}>
                                {[ 1, 2, 3, 4, 5 ].map(n => (
                                    <button
                                        key={n}
                                        type="button"
                                        aria-label={`${n} star${n > 1 ? 's' : ''}`}
                                        onClick={() => setRating(n)}
                                        onMouseEnter={() => setHover(n)}
                                        className="text-3xl leading-none cursor-pointer"
                                        style={{ color: n <= (hover || rating) ? '#e0a526' : '#cfc8bb' }}
                                    >
                                        ★
                                    </button>
                                ))}
                            </div>
                            <textarea
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                rows={4}
                                maxLength={1000}
                                placeholder="Share your experience with this product (optional)"
                                className="w-full p-3 text-sm outline-none border resize-none"
                                style={{ backgroundColor: tokens.surfaceLow, borderColor: tokens.outlineVariant, color: tokens.onSurface }}
                            />
                            {message && (
                                <div
                                    className="text-[11px] px-3 py-2"
                                    style={message.type === 'success'
                                        ? { backgroundColor: '#16241a', color: '#9fd9a0' }
                                        : { backgroundColor: '#2e1616', color: '#ff9a94' }}
                                >
                                    {message.text}
                                </div>
                            )}
                            <div className="flex gap-3">
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="px-6 py-3 text-[11px] uppercase tracking-[0.2em] font-medium disabled:opacity-50 cursor-pointer"
                                    style={{ backgroundColor: tokens.onSurface, color: tokens.surface }}
                                >
                                    {submitting ? 'Saving...' : myReview ? 'Update' : 'Submit'}
                                </button>
                                {myReview && (
                                    <button
                                        type="button"
                                        onClick={onDelete}
                                        className="px-4 py-3 text-[11px] uppercase tracking-[0.2em] border cursor-pointer"
                                        style={{ borderColor: tokens.outlineVariant, color: tokens.secondary }}
                                    >
                                        Delete
                                    </button>
                                )}
                            </div>
                        </form>
                    ) : !user ? (
                        <p className="text-sm" style={{ color: tokens.secondary }}>
                            <Link to="/login" className="underline" style={{ color: tokens.onSurface }}>Log in</Link> to write a review.
                        </p>
                    ) : null}
                </div>

                {/* List */}
                <div className="flex flex-col gap-8">
                    {reviews.length === 0 ? (
                        <p className="text-sm" style={{ color: tokens.secondary }}>No reviews yet. Be the first to review this product.</p>
                    ) : reviews.map(r => (
                        <div key={r._id} className="pb-8 border-b" style={{ borderColor: tokens.outlineVariant }}>
                            <div className="flex flex-wrap items-center gap-3 mb-2">
                                <StarRating value={r.rating} size={14} />
                                <span className="text-sm font-medium" style={{ color: tokens.onSurface }}>{r.userName}</span>
                                {r.verifiedBuyer && (
                                    <span className="text-[9px] uppercase tracking-[0.15em] px-2 py-0.5" style={{ backgroundColor: '#16241a', color: '#9fd9a0' }}>
                                        Verified buyer
                                    </span>
                                )}
                                <span className="text-[11px]" style={{ color: tokens.muted }}>
                                    {new Date(r.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                                </span>
                            </div>
                            {r.comment && <p className="text-sm leading-relaxed" style={{ color: tokens.secondary }}>{r.comment}</p>}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Reviews;
