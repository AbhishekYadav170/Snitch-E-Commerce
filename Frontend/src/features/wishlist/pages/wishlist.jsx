import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router';
import { useWishlist } from '../hook/useWishlist';
import HeartButton from '../components/HeartButton';
import { useTokens } from '../../../app/ThemeContext';

const Wishlist = () => {
    const products = useSelector(state => state.wishlist.products);
    const { handleLoadWishlist } = useWishlist();
    const tokens = useTokens();
    const navigate = useNavigate();
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        handleLoadWishlist().catch(() => {}).finally(() => setLoading(false));
    }, []);

    return (
        <div className="min-h-screen" style={{ backgroundColor: tokens.surface, fontFamily: "'Inter', sans-serif" }}>
            <div className="max-w-7xl mx-auto px-8 lg:px-16 xl:px-24 py-16">
                <h1 className="text-4xl font-light mb-2" style={{ fontFamily: "'Cormorant Garamond', serif", color: tokens.onSurface }}>
                    My Wishlist
                </h1>
                <p className="text-[11px] uppercase tracking-[0.2em] mb-12" style={{ color: tokens.muted }}>
                    {products.length} saved item{products.length !== 1 ? 's' : ''}
                </p>

                {loading ? (
                    <p className="text-sm" style={{ color: tokens.secondary }}>Loading...</p>
                ) : products.length === 0 ? (
                    <div className="py-20 text-center">
                        <p className="mb-6 text-xl" style={{ fontFamily: "'Cormorant Garamond', serif", color: tokens.onSurface }}>
                            Your wishlist is empty.
                        </p>
                        <Link to="/" className="px-8 py-3 text-[11px] uppercase tracking-[0.2em] font-medium" style={{ backgroundColor: tokens.onSurface, color: tokens.surface }}>
                            Discover Products
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
                        {products.map(p => (
                            <div key={p._id} className="group cursor-pointer" onClick={() => navigate(`/product/${p._id}`)}>
                                <div className="relative aspect-[4/5] overflow-hidden mb-4" style={{ backgroundColor: tokens.surfaceLow }}>
                                    {p.images?.[ 0 ]?.url && (
                                        <img src={p.images[ 0 ].url} alt={p.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                    )}
                                    <HeartButton productId={p._id} className="absolute top-3 right-3" />
                                </div>
                                <h3 className="text-lg leading-snug" style={{ fontFamily: "'Cormorant Garamond', serif", color: tokens.onSurface }}>{p.title}</h3>
                                <p className="text-[11px] uppercase tracking-[0.2em] mt-1" style={{ color: tokens.secondary }}>
                                    {p.price?.currency} {p.price?.amount?.toLocaleString()}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Wishlist;
