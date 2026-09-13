// import React, { useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import { useProduct } from '../hooks/useProduct';
// import { Link } from 'react-router';
// import { useNavigate } from 'react-router';

// const tokens = {
//     surface: '#171512',
//     surfaceLow: '#201d18',
//     surfaceHigh: '#2b2720',
//     surfaceHighest: '#332e26',
//     onSurface: '#f3efe8',
//     onSurfaceVariant: '#cfc8ba',
//     secondary: '#a89e8d',
//     muted: '#6f665a',
//     primary: '#C9A96E',
//     primaryDark: '#e9c98f',
//     outlineVariant: '#3a352c',
// };

// const TruckIcon = () => (
//     <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
//         <rect x="1" y="6" width="14" height="11" rx="1" /><path d="M15 9h4l3 3v5h-7z" /><circle cx="6" cy="19" r="1.7" /><circle cx="17.5" cy="19" r="1.7" />
//     </svg>
// );
// const ReturnIcon = () => (
//     <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
//         <polyline points="1 4 1 10 7 10" /><path d="M3.5 15a9 9 0 1 0 2-9.5L1 10" />
//     </svg>
// );
// const ShieldIcon = () => (
//     <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
//         <path d="M12 2 4 5v6c0 5 3.5 8.5 8 11 4.5-2.5 8-6 8-11V5z" /><path d="m9 12 2 2 4-4" />
//     </svg>
// );
// const SupportIcon = () => (
//     <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
//         <path d="M3 18v-6a9 9 0 0 1 18 0v6" /><path d="M21 19a2 2 0 0 1-2 2h-1v-6h3z" /><path d="M3 19a2 2 0 0 0 2 2h1v-6H3z" />
//     </svg>
// );

// const FEATURES = [
//     { icon: <TruckIcon />, title: 'Complimentary Shipping', text: 'On all orders over INR 15,000' },
//     { icon: <ReturnIcon />, title: 'Easy Returns', text: 'Within 14 days of delivery' },
//     { icon: <ShieldIcon />, title: 'Secure Checkout', text: '100% authenticity guaranteed' },
//     { icon: <SupportIcon />, title: 'Dedicated Support', text: 'We are here whenever you need us' },
// ];

// const Home = () => {
//     const products = useSelector(state => state.product.products);
//     const user = useSelector(state => state.auth.user);
//     const { handleGetAllProducts } = useProduct();

//     const navigate = useNavigate();

//     useEffect(() => {
//         handleGetAllProducts();
//     }, []);

//     return (
//         <>
//             <link
//                 href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Inter:wght@300;400;500;600&display=swap"
//                 rel="stylesheet"
//             />

//             <div
//                 className="min-h-screen selection:bg-[#C9A96E]/30"
//                 style={{ backgroundColor: tokens.surface, fontFamily: "'Inter', sans-serif" }}
//             >
//                 {/* ── Hero ── */}
//                 <section
//                     className="relative overflow-hidden"
//                     style={{ backgroundColor: '#0f0d0a' }}
//                 >
//                     <div
//                         className="absolute inset-0 opacity-40"
//                         style={{
//                             backgroundImage: `radial-gradient(circle at 20% 20%, ${tokens.primary}55, transparent 45%), radial-gradient(circle at 80% 60%, ${tokens.primary}33, transparent 40%)`,
//                         }}
//                     />
//                     <div className="relative max-w-7xl mx-auto px-8 lg:px-16 xl:px-24 pt-28 pb-24 lg:pt-36 lg:pb-32 flex flex-col items-start">
//                         <span
//                             className="text-[10px] uppercase tracking-[0.35em] font-medium mb-6"
//                             style={{ color: tokens.primary }}
//                         >
//                             New Season · 2026
//                         </span>
//                         <h1
//                             className="font-light leading-[1.02] mb-6 max-w-3xl"
//                             style={{
//                                 fontFamily: "'Cormorant Garamond', serif",
//                                 color: '#fbf9f6',
//                                 fontSize: 'clamp(2.8rem, 7vw, 5.5rem)',
//                             }}
//                         >
//                             Curated fashion,<br />built to last a lifetime.
//                         </h1>
//                         <p
//                             className="max-w-md text-sm md:text-base leading-relaxed mb-10"
//                             style={{ color: '#d8d4cd' }}
//                         >
//                             Discover a hand-picked archive of premium, minimalist pieces —
//                             crafted with intention and made to be worn for years, not seasons.
//                         </p>
//                         <div className="flex flex-wrap gap-4">
//                             <a
//                                 href="#collection"
//                                 className="px-10 py-4 text-[11px] uppercase tracking-[0.25em] font-medium transition-all duration-300"
//                                 style={{ backgroundColor: tokens.primary, color: tokens.onSurface }}
//                             >
//                                 Shop the Collection
//                             </a>
//                             {!user && (
//                                 <Link
//                                     to="/register"
//                                     className="px-10 py-4 text-[11px] uppercase tracking-[0.25em] font-medium border transition-all duration-300"
//                                     style={{ borderColor: '#585650', color: '#fbf9f6' }}
//                                 >
//                                     Create an Account
//                                 </Link>
//                             )}
//                         </div>
//                     </div>
//                 </section>

//                 {/* ── Trust / Feature strip ── */}
//                 <section className="border-b" style={{ borderColor: tokens.surfaceHighest }}>
//                     <div className="max-w-7xl mx-auto px-8 lg:px-16 xl:px-24 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
//                         {FEATURES.map((f, i) => (
//                             <div key={i} className="flex flex-col items-start gap-3">
//                                 <div style={{ color: tokens.primary }}>{f.icon}</div>
//                                 <div>
//                                     <p className="text-[11px] uppercase tracking-[0.15em] font-semibold mb-1" style={{ color: tokens.onSurface }}>
//                                         {f.title}
//                                     </p>
//                                     <p className="text-[11px] leading-relaxed" style={{ color: tokens.secondary }}>
//                                         {f.text}
//                                     </p>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </section>

//                 <div id="collection" className="max-w-7xl mx-auto px-8 lg:px-16 xl:px-24">
//                     {/* ── Section header ── */}
//                     <div className="pt-20 pb-14 text-center flex flex-col items-center">
//                         <span className="text-[10px] uppercase tracking-[0.24em] font-medium mb-6" style={{ color: tokens.primary }}>
//                             The Collection
//                         </span>
//                         <h2
//                             className="text-4xl lg:text-6xl font-light leading-tight mb-6"
//                             style={{ fontFamily: "'Cormorant Garamond', serif", color: tokens.onSurface }}
//                         >
//                             Curated Archive
//                         </h2>
//                         <p className="max-w-xl mx-auto text-sm leading-relaxed" style={{ color: tokens.secondary }}>
//                             Discover our latest curation of premium minimalist pieces, meticulously designed for effortless elegance and enduring quality.
//                         </p>
//                     </div>

//                     {/* ── Product Grid ── */}
//                     {products && products.length > 0 ? (
//                         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16 pb-32">
//                             {products.map(product => {
//                                 const imageUrl = product.images && product.images.length > 0
//                                     ? product.images[ 0 ].url
//                                     : '/snitch_editorial_warm.png';

//                                 const colorEntries = (product.variants || [])
//                                     .map(v => v.attributes?.color || v.attributes?.Color)
//                                     .filter(Boolean);
//                                 const uniqueColors = [ ...new Set(colorEntries) ];

//                                 return (
//                                     <div
//                                         onClick={() => navigate(`/product/${product._id}`)}
//                                         key={product._id} className="group cursor-pointer flex flex-col">
//                                         {/* Image Container */}
//                                         <div className="relative aspect-[4/5] overflow-hidden mb-6" style={{ backgroundColor: tokens.surfaceLow }}>
//                                             <img
//                                                 src={imageUrl}
//                                                 alt={product.title}
//                                                 className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
//                                             />
//                                             <div
//                                                 className="absolute inset-x-0 bottom-0 py-3 text-center text-[10px] uppercase tracking-[0.22em] font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300"
//                                                 style={{ backgroundColor: 'rgba(27,28,26,0.85)', color: '#fbf9f6' }}
//                                             >
//                                                 View Piece
//                                             </div>
//                                         </div>

//                                         {/* Product Details */}
//                                         <div className="flex flex-col gap-2">
//                                             <h3
//                                                 className="text-xl leading-snug transition-colors duration-300 group-hover:text-[#C9A96E]"
//                                                 style={{ fontFamily: "'Cormorant Garamond', serif", color: tokens.onSurface }}
//                                             >
//                                                 {product.title}
//                                             </h3>

//                                             <p
//                                                 className="text-[12px] line-clamp-2 leading-relaxed"
//                                                 style={{ color: tokens.secondary }}
//                                             >
//                                                 {product.description}
//                                             </p>

//                                             <div className="flex items-center justify-between mt-2">
//                                                 <span
//                                                     className="text-[10px] uppercase tracking-[0.2em] font-medium"
//                                                     style={{ color: tokens.onSurface }}
//                                                 >
//                                                     {product.price?.currency} {product.price?.amount?.toLocaleString()}
//                                                 </span>

//                                                 {uniqueColors.length > 0 && (
//                                                     <div className="flex items-center gap-1.5">
//                                                         {uniqueColors.slice(0, 4).map((c, i) => (
//                                                             <span
//                                                                 key={i}
//                                                                 title={c}
//                                                                 className="w-3.5 h-3.5 rounded-full"
//                                                                 style={{
//                                                                     backgroundColor: c.toLowerCase().replace(/\s+/g, ''),
//                                                                     boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.15)',
//                                                                 }}
//                                                             />
//                                                         ))}
//                                                         {uniqueColors.length > 4 && (
//                                                             <span className="text-[10px]" style={{ color: tokens.muted }}>+{uniqueColors.length - 4}</span>
//                                                         )}
//                                                     </div>
//                                                 )}
//                                             </div>
//                                         </div>
//                                     </div>
//                                 );
//                             })}
//                         </div>
//                     ) : (
//                         <div className="py-24 text-center flex flex-col items-center">
//                             <h2 className="text-2xl mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", color: tokens.onSurface }}>
//                                 No pieces available.
//                             </h2>
//                             <p className="max-w-md mx-auto text-sm leading-relaxed" style={{ color: tokens.secondary }}>
//                                 We are currently preparing our next collection. Please check back later.
//                             </p>
//                         </div>
//                     )}
//                 </div>

//                 {/* ── Become a Seller banner ── */}
//                 {!user && (
//                     <section className="border-t" style={{ borderColor: tokens.surfaceHighest, backgroundColor: tokens.surfaceLow }}>
//                         <div className="max-w-7xl mx-auto px-8 lg:px-16 xl:px-24 py-16 flex flex-col md:flex-row items-center justify-between gap-8">
//                             <div>
//                                 <h3 className="text-2xl md:text-3xl font-light mb-2" style={{ fontFamily: "'Cormorant Garamond', serif", color: tokens.onSurface }}>
//                                     Have a collection worth sharing?
//                                 </h3>
//                                 <p className="text-sm max-w-lg" style={{ color: tokens.secondary }}>
//                                     Register as a seller and list your own curated pieces on Snitch.
//                                 </p>
//                             </div>
//                             <Link
//                                 to="/register"
//                                 className="px-8 py-4 text-[11px] uppercase tracking-[0.25em] font-medium whitespace-nowrap transition-all duration-300"
//                                 style={{ backgroundColor: tokens.onSurface, color: tokens.surface }}
//                             >
//                                 Start Selling
//                             </Link>
//                         </div>
//                     </section>
//                 )}

//                 {/* ── Footer ── */}
//                 <footer className="border-t" style={{ borderColor: tokens.surfaceHighest }}>
//                     <div className="max-w-7xl mx-auto px-8 lg:px-16 xl:px-24 py-16 grid grid-cols-2 md:grid-cols-4 gap-10">
//                         <div className="col-span-2 md:col-span-1">
//                             <span
//                                 className="text-lg font-medium tracking-[0.3em] uppercase"
//                                 style={{ fontFamily: "'Cormorant Garamond', serif", color: tokens.primary }}
//                             >
//                                 Snitch.
//                             </span>
//                             <p className="mt-4 text-[12px] leading-relaxed max-w-xs" style={{ color: tokens.secondary }}>
//                                 Premium minimalist fashion, curated for those who value quality over quantity.
//                             </p>
//                         </div>

//                         <div>
//                             <h4 className="text-[10px] uppercase tracking-[0.2em] font-semibold mb-4" style={{ color: tokens.onSurface }}>
//                                 Shop
//                             </h4>
//                             <ul className="space-y-3 text-[12px]" style={{ color: tokens.secondary }}>
//                                 <li><a href="#collection" className="hover:text-[#C9A96E] transition-colors">All Products</a></li>
//                                 <li><Link to="/" className="hover:text-[#C9A96E] transition-colors">New Arrivals</Link></li>
//                                 <li><Link to="/cart" className="hover:text-[#C9A96E] transition-colors">My Cart</Link></li>
//                             </ul>
//                         </div>

//                         <div>
//                             <h4 className="text-[10px] uppercase tracking-[0.2em] font-semibold mb-4" style={{ color: tokens.onSurface }}>
//                                 Customer Care
//                             </h4>
//                             <ul className="space-y-3 text-[12px]" style={{ color: tokens.secondary }}>
//                                 <li>Shipping &amp; Returns</li>
//                                 <li>Track Order</li>
//                                 <li>Contact Us</li>
//                             </ul>
//                         </div>

//                         <div>
//                             <h4 className="text-[10px] uppercase tracking-[0.2em] font-semibold mb-4" style={{ color: tokens.onSurface }}>
//                                 Company
//                             </h4>
//                             <ul className="space-y-3 text-[12px]" style={{ color: tokens.secondary }}>
//                                 {!user && (
//                                     <>
//                                         <li><Link to="/login" className="hover:text-[#C9A96E] transition-colors">Sign In</Link></li>
//                                         <li><Link to="/register" className="hover:text-[#C9A96E] transition-colors">Sign Up</Link></li>
//                                     </>
//                                 )}
//                                 <li>About Snitch</li>
//                                 <li>Privacy Policy</li>
//                             </ul>
//                         </div>
//                     </div>

//                     <div
//                         className="border-t py-6 text-center"
//                         style={{ borderColor: tokens.surfaceHighest }}
//                     >
//                         <span
//                             className="text-[10px] uppercase tracking-[0.35em]"
//                             style={{ fontFamily: "'Cormorant Garamond', serif", color: tokens.primary }}
//                         >
//                             Snitch. © {new Date().getFullYear()} — All rights reserved.
//                         </span>
//                     </div>
//                 </footer>
//             </div>
//         </>
//     );
// };

// export default Home;





import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useProduct } from '../hooks/useProduct';
import { Link } from 'react-router';
import { useNavigate } from 'react-router';
import { useTokens, useTheme } from '../../../app/ThemeContext';

const TruckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="6" width="14" height="11" rx="1" /><path d="M15 9h4l3 3v5h-7z" /><circle cx="6" cy="19" r="1.7" /><circle cx="17.5" cy="19" r="1.7" />
    </svg>
);
const ReturnIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="1 4 1 10 7 10" /><path d="M3.5 15a9 9 0 1 0 2-9.5L1 10" />
    </svg>
);
const ShieldIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2 4 5v6c0 5 3.5 8.5 8 11 4.5-2.5 8-6 8-11V5z" /><path d="m9 12 2 2 4-4" />
    </svg>
);
const SupportIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 18v-6a9 9 0 0 1 18 0v6" /><path d="M21 19a2 2 0 0 1-2 2h-1v-6h3z" /><path d="M3 19a2 2 0 0 0 2 2h1v-6H3z" />
    </svg>
);

const FEATURES = [
    { icon: <TruckIcon />, title: 'Complimentary Shipping', text: 'On all orders over INR 15,000' },
    { icon: <ReturnIcon />, title: 'Easy Returns', text: 'Within 14 days of delivery' },
    { icon: <ShieldIcon />, title: 'Secure Checkout', text: '100% authenticity guaranteed' },
    { icon: <SupportIcon />, title: 'Dedicated Support', text: 'We are here whenever you need us' },
];

const Home = () => {
    const products = useSelector(state => state.product.products);
    const user = useSelector(state => state.auth.user);
    const { handleGetAllProducts } = useProduct();
    const tokens = useTokens();
    const { theme } = useTheme();

    const navigate = useNavigate();

    useEffect(() => {
        handleGetAllProducts();
    }, []);

    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Inter:wght@300;400;500;600&display=swap"
                rel="stylesheet"
            />

            <div
                className="min-h-screen selection:bg-[#C9A96E]/30"
                style={{ backgroundColor: tokens.surface, fontFamily: "'Inter', sans-serif" }}
            >
                {/* ── Hero ── */}
                <section
                    className="relative overflow-hidden"
                    style={{ backgroundColor: '#0f0d0a' }}
                >
                    <div
                        className="absolute inset-0 opacity-40"
                        style={{
                            backgroundImage: `radial-gradient(circle at 20% 20%, ${tokens.primary}55, transparent 45%), radial-gradient(circle at 80% 60%, ${tokens.primary}33, transparent 40%)`,
                        }}
                    />
                    <div className="relative max-w-7xl mx-auto px-8 lg:px-16 xl:px-24 pt-28 pb-24 lg:pt-36 lg:pb-32 flex flex-col items-start">
                        <span
                            className="text-[10px] uppercase tracking-[0.35em] font-medium mb-6"
                            style={{ color: tokens.primary }}
                        >
                            New Season · 2026
                        </span>
                        <h1
                            className="font-light leading-[1.02] mb-6 max-w-3xl"
                            style={{
                                fontFamily: "'Cormorant Garamond', serif",
                                color: '#fbf9f6',
                                fontSize: 'clamp(2.8rem, 7vw, 5.5rem)',
                            }}
                        >
                            Curated fashion,<br />built to last a lifetime.
                        </h1>
                        <p
                            className="max-w-md text-sm md:text-base leading-relaxed mb-10"
                            style={{ color: '#d8d4cd' }}
                        >
                            Discover a hand-picked archive of premium, minimalist pieces —
                            crafted with intention and made to be worn for years, not seasons.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <a
                                href="#collection"
                                className="px-10 py-4 text-[11px] uppercase tracking-[0.25em] font-medium transition-all duration-300"
                                style={{ backgroundColor: tokens.primary, color: tokens.onSurface }}
                            >
                                Shop the Collection
                            </a>
                            {!user && (
                                <Link
                                    to="/register"
                                    className="px-10 py-4 text-[11px] uppercase tracking-[0.25em] font-medium border transition-all duration-300"
                                    style={{ borderColor: '#585650', color: '#fbf9f6' }}
                                >
                                    Create an Account
                                </Link>
                            )}
                        </div>
                    </div>
                </section>

                {/* ── Trust / Feature strip ── */}
                <section className="border-b" style={{ borderColor: tokens.surfaceHighest }}>
                    <div className="max-w-7xl mx-auto px-8 lg:px-16 xl:px-24 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
                        {FEATURES.map((f, i) => (
                            <div key={i} className="flex flex-col items-start gap-3">
                                <div style={{ color: tokens.primary }}>{f.icon}</div>
                                <div>
                                    <p className="text-[11px] uppercase tracking-[0.15em] font-semibold mb-1" style={{ color: tokens.onSurface }}>
                                        {f.title}
                                    </p>
                                    <p className="text-[11px] leading-relaxed" style={{ color: tokens.secondary }}>
                                        {f.text}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <div id="collection" className="max-w-7xl mx-auto px-8 lg:px-16 xl:px-24">
                    {/* ── Section header ── */}
                    <div className="pt-20 pb-14 text-center flex flex-col items-center">
                        <span className="text-[10px] uppercase tracking-[0.24em] font-medium mb-6" style={{ color: tokens.primary }}>
                            The Collection
                        </span>
                        <h2
                            className="text-4xl lg:text-6xl font-light leading-tight mb-6"
                            style={{ fontFamily: "'Cormorant Garamond', serif", color: tokens.onSurface }}
                        >
                            Curated Archive
                        </h2>
                        <p className="max-w-xl mx-auto text-sm leading-relaxed" style={{ color: tokens.secondary }}>
                            Discover our latest curation of premium minimalist pieces, meticulously designed for effortless elegance and enduring quality.
                        </p>
                    </div>

                    {/* ── Product Grid ── */}
                    {products && products.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16 pb-32">
                            {products.map(product => {
                                const imageUrl = product.images && product.images.length > 0
                                    ? product.images[ 0 ].url
                                    : '/snitch_editorial_warm.png';

                                const colorEntries = (product.variants || [])
                                    .map(v => v.attributes?.color || v.attributes?.Color)
                                    .filter(Boolean);
                                const uniqueColors = [ ...new Set(colorEntries) ];

                                return (
                                    <div
                                        onClick={() => navigate(`/product/${product._id}`)}
                                        key={product._id} className="group cursor-pointer flex flex-col">
                                        {/* Image Container */}
                                        <div className="relative aspect-[4/5] overflow-hidden mb-6" style={{ backgroundColor: tokens.surfaceLow }}>
                                            <img
                                                src={imageUrl}
                                                alt={product.title}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                            />
                                            <div
                                                className="absolute inset-x-0 bottom-0 py-3 text-center text-[10px] uppercase tracking-[0.22em] font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                                style={{ backgroundColor: 'rgba(27,28,26,0.85)', color: '#fbf9f6' }}
                                            >
                                                View Piece
                                            </div>
                                        </div>

                                        {/* Product Details */}
                                        <div className="flex flex-col gap-2">
                                            <h3
                                                className="text-xl leading-snug transition-colors duration-300 group-hover:text-[#C9A96E]"
                                                style={{ fontFamily: "'Cormorant Garamond', serif", color: tokens.onSurface }}
                                            >
                                                {product.title}
                                            </h3>

                                            <p
                                                className="text-[12px] line-clamp-2 leading-relaxed"
                                                style={{ color: tokens.secondary }}
                                            >
                                                {product.description}
                                            </p>

                                            <div className="flex items-center justify-between mt-2">
                                                <span
                                                    className="text-[10px] uppercase tracking-[0.2em] font-medium"
                                                    style={{ color: tokens.onSurface }}
                                                >
                                                    {product.price?.currency} {product.price?.amount?.toLocaleString()}
                                                </span>

                                                {uniqueColors.length > 0 && (
                                                    <div className="flex items-center gap-1.5">
                                                        {uniqueColors.slice(0, 4).map((c, i) => (
                                                            <span
                                                                key={i}
                                                                title={c}
                                                                className="w-3.5 h-3.5 rounded-full"
                                                                style={{
                                                                    backgroundColor: c.toLowerCase().replace(/\s+/g, ''),
                                                                    boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.15)',
                                                                }}
                                                            />
                                                        ))}
                                                        {uniqueColors.length > 4 && (
                                                            <span className="text-[10px]" style={{ color: tokens.muted }}>+{uniqueColors.length - 4}</span>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="py-24 text-center flex flex-col items-center">
                            <h2 className="text-2xl mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", color: tokens.onSurface }}>
                                No pieces available.
                            </h2>
                            <p className="max-w-md mx-auto text-sm leading-relaxed" style={{ color: tokens.secondary }}>
                                We are currently preparing our next collection. Please check back later.
                            </p>
                        </div>
                    )}
                </div>

                {/* ── Become a Seller banner ── */}
                {!user && (
                    <section className="border-t" style={{ borderColor: tokens.surfaceHighest, backgroundColor: tokens.surfaceLow }}>
                        <div className="max-w-7xl mx-auto px-8 lg:px-16 xl:px-24 py-16 flex flex-col md:flex-row items-center justify-between gap-8">
                            <div>
                                <h3 className="text-2xl md:text-3xl font-light mb-2" style={{ fontFamily: "'Cormorant Garamond', serif", color: tokens.onSurface }}>
                                    Have a collection worth sharing?
                                </h3>
                                <p className="text-sm max-w-lg" style={{ color: tokens.secondary }}>
                                    Register as a seller and list your own curated pieces on Snitch.
                                </p>
                            </div>
                            <Link
                                to="/register"
                                className="px-8 py-4 text-[11px] uppercase tracking-[0.25em] font-medium whitespace-nowrap transition-all duration-300"
                                style={{ backgroundColor: tokens.onSurface, color: tokens.surface }}
                            >
                                Start Selling
                            </Link>
                        </div>
                    </section>
                )}

                {/* ── Footer ── */}
                <footer className="border-t" style={{ borderColor: tokens.surfaceHighest }}>
                    <div className="max-w-7xl mx-auto px-8 lg:px-16 xl:px-24 py-16 grid grid-cols-2 md:grid-cols-4 gap-10">
                        <div className="col-span-2 md:col-span-1">
                            <span
                                className="text-lg font-medium tracking-[0.3em] uppercase"
                                style={{ fontFamily: "'Cormorant Garamond', serif", color: tokens.primary }}
                            >
                                Snitch.
                            </span>
                            <p className="mt-4 text-[12px] leading-relaxed max-w-xs" style={{ color: tokens.secondary }}>
                                Premium minimalist fashion, curated for those who value quality over quantity.
                            </p>
                        </div>

                        <div>
                            <h4 className="text-[10px] uppercase tracking-[0.2em] font-semibold mb-4" style={{ color: tokens.onSurface }}>
                                Shop
                            </h4>
                            <ul className="space-y-3 text-[12px]" style={{ color: tokens.secondary }}>
                                <li><a href="#collection" className="hover:text-[#C9A96E] transition-colors">All Products</a></li>
                                <li><Link to="/" className="hover:text-[#C9A96E] transition-colors">New Arrivals</Link></li>
                                <li><Link to="/cart" className="hover:text-[#C9A96E] transition-colors">My Cart</Link></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-[10px] uppercase tracking-[0.2em] font-semibold mb-4" style={{ color: tokens.onSurface }}>
                                Customer Care
                            </h4>
                            <ul className="space-y-3 text-[12px]" style={{ color: tokens.secondary }}>
                                <li>Shipping &amp; Returns</li>
                                <li>Track Order</li>
                                <li>Contact Us</li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-[10px] uppercase tracking-[0.2em] font-semibold mb-4" style={{ color: tokens.onSurface }}>
                                Company
                            </h4>
                            <ul className="space-y-3 text-[12px]" style={{ color: tokens.secondary }}>
                                {!user && (
                                    <>
                                        <li><Link to="/login" className="hover:text-[#C9A96E] transition-colors">Sign In</Link></li>
                                        <li><Link to="/register" className="hover:text-[#C9A96E] transition-colors">Sign Up</Link></li>
                                    </>
                                )}
                                <li>About Snitch</li>
                                <li>Privacy Policy</li>
                            </ul>
                        </div>
                    </div>

                    <div
                        className="border-t py-6 text-center"
                        style={{ borderColor: tokens.surfaceHighest }}
                    >
                        <span
                            className="text-[10px] uppercase tracking-[0.35em]"
                            style={{ fontFamily: "'Cormorant Garamond', serif", color: tokens.primary }}
                        >
                            Snitch. © {new Date().getFullYear()} — All rights reserved.
                        </span>
                    </div>
                </footer>
            </div>
        </>
    );
};

export default Home;
