

import React, { useEffect, useState } from 'react';
import { useProduct } from '../hooks/useProduct';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

const Dashboard = () => {
    const { handleGetSellerProduct, handleDeleteProduct } = useProduct();
    const sellerProducts = useSelector(state => state.product.sellerProducts);
    const navigate = useNavigate();
    const [ deletingId, setDeletingId ] = useState(null);
    const [ dashboardError, setDashboardError ] = useState(null);

    useEffect(() => {
        handleGetSellerProduct();
    }, []);

    const onDeleteProduct = async (e, product) => {
        e.stopPropagation(); // don't navigate to the product detail page
        const confirmed = window.confirm(`Delete "${product.title}" permanently? This cannot be undone.`);
        if (!confirmed) return;

        setDashboardError(null);
        setDeletingId(product._id);
        try {
            await handleDeleteProduct(product._id);
        } catch (err) {
            setDashboardError(err?.response?.data?.message || 'Could not delete this product. Please try again.');
        } finally {
            setDeletingId(null);
        }
    };

    const totalProducts = sellerProducts?.length ?? 0;
    const totalVariants = sellerProducts?.reduce((sum, p) => sum + (p.variants?.length ?? 0), 0) ?? 0;
    const totalStock = sellerProducts?.reduce(
        (sum, p) => sum + (p.variants?.reduce((s, v) => s + (v.stock ?? 0), 0) ?? 0),
        0
    ) ?? 0;
    const outOfStockCount = sellerProducts?.filter(
        p => (p.variants?.length ?? 0) > 0 && p.variants.every(v => (v.stock ?? 0) <= 0)
    ).length ?? 0;

    return (
        <>
            {/* Google Fonts */}
            <link
                href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Inter:wght@300;400;500;600&display=swap"
                rel="stylesheet"
            />

            <div
                className="min-h-screen selection:bg-[#FFD700]/30"
                style={{ backgroundColor: '#131313', fontFamily: "'Inter', sans-serif" }}
            >
                <div className="max-w-7xl mx-auto px-8 lg:px-16 xl:px-24">

                    {/* ── Top Bar ── */}
                    <div className="pt-10 pb-0 flex items-center gap-5">
                        <button
                            onClick={() => navigate(-1)}
                            className="text-lg transition-colors duration-200 leading-none"
                            style={{ color: '#999077' }}
                            aria-label="Go back"
                            onMouseEnter={e => e.currentTarget.style.color = '#FFD700'}
                            onMouseLeave={e => e.currentTarget.style.color = '#999077'}
                        >
                            ←
                        </button>
                        <span
                            className="text-xs font-medium tracking-[0.32em] uppercase"
                            style={{ fontFamily: "'Cormorant Garamond', serif", color: '#FFD700' }}
                        >
                            Snitch.
                        </span>
                    </div>

                    {/* ── Page Header ── */}
                    <div className="pt-10 pb-10 flex flex-col md:flex-row md:items-end justify-between gap-6 overflow-hidden">
                        <div>
                            <h1
                                className="text-4xl lg:text-5xl font-light leading-tight"
                                style={{ fontFamily: "'Cormorant Garamond', serif", color: '#e5e2e1' }}
                            >
                                Your Vault
                            </h1>
                            {/* Gold rule separator */}
                            <div className="mt-4 w-14 h-px" style={{ backgroundColor: '#FFD700' }} />
                        </div>

                        <button
                            onClick={() => navigate('/seller/create-product')}
                            className="py-4 px-8 text-[11px] uppercase tracking-[0.3em] font-medium transition-all duration-300 w-full md:w-auto text-center"
                            style={{
                                backgroundColor: '#FFD700',
                                color: '#131313',
                                fontFamily: "'Inter', sans-serif"
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.backgroundColor = '#e9c400';
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.backgroundColor = '#FFD700';
                            }}
                        >
                            New Listing
                        </button>
                    </div>

                    {dashboardError && (
                        <div
                            className="mb-8 text-[11px] uppercase tracking-[0.15em] font-medium px-5 py-4 border"
                            style={{ backgroundColor: '#2e1616', borderColor: '#5c2b2b', color: '#ff9a94' }}
                        >
                            {dashboardError}
                        </div>
                    )}

                    {/* ── Stats Row ── */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-14">
                        {[
                            { label: 'Listings', value: totalProducts },
                            { label: 'Variants', value: totalVariants },
                            { label: 'Units in Stock', value: totalStock },
                            { label: 'Out of Stock', value: outOfStockCount },
                        ].map((stat, i) => (
                            <div
                                key={i}
                                className="px-6 py-6 border flex flex-col gap-1"
                                style={{ borderColor: '#33302a', backgroundColor: '#1c1b1b' }}
                            >
                                <span
                                    className="text-3xl font-light"
                                    style={{ fontFamily: "'Cormorant Garamond', serif", color: '#e5e2e1' }}
                                >
                                    {stat.value}
                                </span>
                                <span className="text-[10px] uppercase tracking-[0.2em]" style={{ color: '#999077' }}>
                                    {stat.label}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* ── Product Grid ── */}
                    {sellerProducts && sellerProducts.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16 pb-24">
                            {sellerProducts.map(product => {
                                const imageUrl = product.images && product.images.length > 0
                                    ? product.images[ 0 ].url
                                    : '/snitch_editorial_warm.png'; // Fallback to our warm editorial

                                const variantCount = product.variants?.length ?? 0;
                                const stockTotal = product.variants?.reduce((s, v) => s + (v.stock ?? 0), 0) ?? 0;
                                const isOutOfStock = variantCount > 0 && stockTotal === 0;

                                return (
                                    <div
                                        onClick={() => { navigate(`/seller/product/${product._id}`) }}
                                        key={product._id} className="group cursor-pointer flex flex-col">
                                        {/* Image Container */}
                                        <div className="relative aspect-[4/5] overflow-hidden mb-6" style={{ backgroundColor: '#201f1f' }}>
                                            <img
                                                src={imageUrl}
                                                alt={product.title}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                            />
                                            {isOutOfStock && (
                                                <span
                                                    className="absolute top-3 left-3 text-[9px] uppercase tracking-[0.15em] font-semibold px-2.5 py-1"
                                                    style={{ backgroundColor: '#8a2d2d', color: '#fff' }}
                                                >
                                                    Out of Stock
                                                </span>
                                            )}

                                            <button
                                                onClick={(e) => onDeleteProduct(e, product)}
                                                disabled={deletingId === product._id}
                                                aria-label={`Delete ${product.title}`}
                                                title="Delete product"
                                                className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 disabled:opacity-100 disabled:cursor-not-allowed"
                                                style={{ backgroundColor: 'rgba(19,19,19,0.9)', color: '#ff9a94' }}
                                            >
                                                {deletingId === product._id ? (
                                                    <span className="text-[9px] uppercase tracking-wide">...</span>
                                                ) : (
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                                                        <polyline points="3 6 5 6 21 6" />
                                                        <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                                        <line x1="10" y1="11" x2="10" y2="17" />
                                                        <line x1="14" y1="11" x2="14" y2="17" />
                                                    </svg>
                                                )}
                                            </button>
                                        </div>

                                        {/* Product Details */}
                                        <div className="flex flex-col gap-2">
                                            <div className="flex items-start justify-between gap-4">
                                                <h3
                                                    className="text-xl leading-snug transition-colors duration-300 group-hover:text-[#FFD700]"
                                                    style={{ fontFamily: "'Cormorant Garamond', serif", color: '#e5e2e1' }}
                                                >
                                                    {product.title}
                                                </h3>
                                            </div>

                                            <p
                                                className="text-[12px] line-clamp-2 leading-relaxed"
                                                style={{ color: '#999077' }}
                                            >
                                                {product.description}
                                            </p>

                                            <div className="flex items-center justify-between mt-2">
                                                <span
                                                    className="text-[10px] uppercase tracking-[0.2em] font-medium"
                                                    style={{ color: '#e5e2e1' }}
                                                >
                                                    {product.price?.currency} {product.price?.amount?.toLocaleString()}
                                                </span>
                                                <span className="text-[10px] tracking-[0.1em]" style={{ color: '#6b6459' }}>
                                                    {variantCount} variant{variantCount !== 1 ? 's' : ''} · {stockTotal} in stock
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="py-24 text-center flex flex-col items-center">
                            <span className="text-[10px] uppercase tracking-[0.2em] font-medium mb-4" style={{ color: '#FFD700' }}>Empty Vault</span>
                            <p className="max-w-md mx-auto text-lg leading-relaxed" style={{ fontFamily: "'Cormorant Garamond', serif", color: '#999077' }}>
                                You haven't added any curated pieces to your archive yet. Begin by creating a new listing.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Dashboard;
