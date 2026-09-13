// import React, { useState, useRef, useEffect } from 'react'
// import { useSelector } from 'react-redux'
// import { useNavigate, Link } from 'react-router'
// import { useAuth } from '../../auth/hook/useAuth'

// const tokens = {
//     surface: '#141311',
//     onSurface: '#f3efe8',
//     secondary: '#a89e8d',
//     muted: '#7d7568',
//     primary: '#C9A96E',
//     outlineVariant: '#302b23',
// }

// const Nav = () => {
//     const navigate = useNavigate()
//     const user = useSelector(state => state.auth.user)
//     const cartItems = useSelector(state => state.cart?.items)
//     const { handleLogout } = useAuth()

//     const [ menuOpen, setMenuOpen ] = useState(false)
//     const menuRef = useRef(null)

//     useEffect(() => {
//         function handleClickOutside(e) {
//             if (menuRef.current && !menuRef.current.contains(e.target)) {
//                 setMenuOpen(false)
//             }
//         }
//         document.addEventListener('mousedown', handleClickOutside)
//         return () => document.removeEventListener('mousedown', handleClickOutside)
//     }, [])

//     const onLogout = async () => {
//         setMenuOpen(false)
//         await handleLogout()
//         navigate('/login')
//     }

//     const initials = user?.fullname
//         ?.split(' ')
//         .filter(Boolean)
//         .slice(0, 2)
//         .map(w => w[ 0 ]?.toUpperCase())
//         .join('') || '?'

//     return (
//         <nav
//             className="sticky top-0 z-30 px-8 lg:px-16 xl:px-24 py-5 flex items-center justify-between border-b backdrop-blur-md"
//             style={{ borderColor: tokens.outlineVariant, backgroundColor: `${tokens.surface}e6` }}
//         >
//             <Link to="/"
//                 className="text-lg font-medium tracking-[0.35em] uppercase hover:opacity-80 transition-opacity"
//                 style={{ fontFamily: "'Cormorant Garamond', serif", color: tokens.primary }}
//             >
//                 Snitch.
//             </Link>

//             <div className="flex gap-7 items-center text-[10px] uppercase tracking-[0.2em] font-medium" style={{ color: tokens.secondary }}>
//                 <Link to="/" className="hidden sm:inline transition-colors hover:text-[#C9A96E]">Home</Link>

//                 {user ? (
//                     <>
//                         {user.role === 'seller' && (
//                             <Link to="/seller/dashboard" className="hidden sm:inline transition-colors hover:text-[#C9A96E]">Seller Dashboard</Link>
//                         )}

//                         {/* Cart */}
//                         <Link
//                             to="/cart"
//                             className="relative flex items-center hover:opacity-70 transition-opacity"
//                             style={{ color: tokens.onSurface }}
//                             aria-label="Shopping cart"
//                         >
//                             <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
//                                 <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
//                                 <line x1="3" y1="6" x2="21" y2="6" />
//                                 <path d="M16 10a4 4 0 0 1-8 0" />
//                             </svg>
//                             {cartItems?.length > 0 && (
//                                 <span
//                                     className="absolute -top-2 -right-2 flex items-center justify-center rounded-full text-white"
//                                     style={{
//                                         backgroundColor: tokens.primary,
//                                         width: '16px',
//                                         height: '16px',
//                                         fontSize: '9px',
//                                         fontFamily: "'Inter', sans-serif",
//                                         fontWeight: 600,
//                                         letterSpacing: 0,
//                                     }}
//                                 >
//                                     {cartItems.length > 9 ? '9+' : cartItems.length}
//                                 </span>
//                             )}
//                         </Link>

//                         {/* User menu */}
//                         <div className="relative" ref={menuRef}>
//                             <button
//                                 onClick={() => setMenuOpen(o => !o)}
//                                 className="flex items-center gap-2 cursor-pointer"
//                                 aria-label="Account menu"
//                             >
//                                 <span
//                                     className="flex items-center justify-center rounded-full font-semibold"
//                                     style={{
//                                         width: '28px',
//                                         height: '28px',
//                                         backgroundColor: tokens.primary,
//                                         color: '#fff',
//                                         fontSize: '10px',
//                                         letterSpacing: 0,
//                                         fontFamily: "'Inter', sans-serif",
//                                     }}
//                                 >
//                                     {initials}
//                                 </span>
//                                 <span className="hidden md:inline normal-case tracking-normal text-[13px]" style={{ color: tokens.onSurface, fontFamily: "'Inter', sans-serif" }}>
//                                     {user.fullname}
//                                 </span>
//                             </button>

//                             {menuOpen && (
//                                 <div
//                                     className="absolute right-0 mt-3 w-44 py-2 shadow-[0_16px_32px_rgba(0,0,0,0.4)] normal-case tracking-normal"
//                                     style={{ backgroundColor: '#1c1a16', border: `1px solid ${tokens.outlineVariant}` }}
//                                 >
//                                     <div className="px-4 py-2 text-[11px] uppercase tracking-[0.18em]" style={{ color: tokens.muted }}>
//                                         {user.role === 'seller' ? 'Seller Account' : 'My Account'}
//                                     </div>
//                                     <Link
//                                         to="/cart"
//                                         onClick={() => setMenuOpen(false)}
//                                         className="block px-4 py-2 text-sm hover:bg-[#26221c] transition-colors"
//                                         style={{ color: tokens.onSurface, fontFamily: "'Inter', sans-serif" }}
//                                     >
//                                         My Cart
//                                     </Link>
//                                     {user.role === 'seller' && (
//                                         <Link
//                                             to="/seller/dashboard"
//                                             onClick={() => setMenuOpen(false)}
//                                             className="block px-4 py-2 text-sm hover:bg-[#26221c] transition-colors"
//                                             style={{ color: tokens.onSurface, fontFamily: "'Inter', sans-serif" }}
//                                         >
//                                             Seller Dashboard
//                                         </Link>
//                                     )}
//                                     <button
//                                         onClick={onLogout}
//                                         className="w-full text-left block px-4 py-2 text-sm hover:bg-[#331c1c] transition-colors cursor-pointer"
//                                         style={{ color: '#ff6b6b', fontFamily: "'Inter', sans-serif" }}
//                                     >
//                                         Logout
//                                     </button>
//                                 </div>
//                             )}
//                         </div>
//                     </>
//                 ) : (
//                     <>
//                         <Link to="/login" className="transition-colors hover:text-[#C9A96E]">Sign In</Link>
//                         <Link
//                             to="/register"
//                             className="px-5 py-2.5 transition-colors"
//                             style={{ backgroundColor: tokens.onSurface, color: tokens.surface }}
//                         >
//                             Sign Up
//                         </Link>
//                     </>
//                 )}
//             </div>
//         </nav>
//     )
// }

// export default Nav




import React, { useState, useRef, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useLocation, Link } from 'react-router'
import { useAuth } from '../../auth/hook/useAuth'
import { useTheme, lightTokens, darkTokens } from '../../../app/ThemeContext'

const sellerTokens = {
    surface: '#131313',
    onSurface: '#e5e2e1',
    secondary: '#999077',
    muted: '#6b6459',
    primary: '#FFD700',
    outlineVariant: '#33302a',
}

const SunIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
)
const MoonIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
)

const Nav = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const user = useSelector(state => state.auth.user)
    const cartItems = useSelector(state => state.cart?.items)
    const { handleLogout } = useAuth()
    const { theme, toggleTheme } = useTheme()

    // Seller area keeps its own fixed dark+gold identity regardless of the
    // toggle; only the customer-facing pages (Home/Cart/Product) respond to it.
    const isSellerArea = location.pathname.startsWith('/seller')
    const tokens = isSellerArea ? sellerTokens : (theme === 'dark' ? darkTokens : lightTokens)
    const dropdownBg = isSellerArea || theme === 'dark' ? '#1c1a16' : '#ffffff'
    const dropdownHover = isSellerArea || theme === 'dark' ? '#26221c' : '#f5f3f0'
    const dropdownDangerHover = isSellerArea || theme === 'dark' ? '#331c1c' : '#fbeaea'

    const [ menuOpen, setMenuOpen ] = useState(false)
    const menuRef = useRef(null)

    useEffect(() => {
        function handleClickOutside(e) {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setMenuOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const onLogout = async () => {
        setMenuOpen(false)
        await handleLogout()
        navigate('/login')
    }

    const initials = user?.fullname
        ?.split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map(w => w[ 0 ]?.toUpperCase())
        .join('') || '?'

    return (
        <nav
            className="sticky top-0 z-30 px-8 lg:px-16 xl:px-24 py-5 flex items-center justify-between border-b backdrop-blur-md"
            style={{ borderColor: tokens.outlineVariant, backgroundColor: `${tokens.surface}e6` }}
        >
            <Link to="/"
                className="text-lg font-medium tracking-[0.35em] uppercase hover:opacity-80 transition-opacity"
                style={{ fontFamily: "'Cormorant Garamond', serif", color: tokens.primary }}
            >
                Snitch.
            </Link>

            <div className="flex gap-7 items-center text-[10px] uppercase tracking-[0.2em] font-medium" style={{ color: tokens.secondary }}>
                <Link to="/" className="hidden sm:inline transition-colors hover:text-[#C9A96E]">Home</Link>

                {!isSellerArea && (
                    <button
                        onClick={toggleTheme}
                        aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                        title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                        className="flex items-center justify-center hover:opacity-70 transition-opacity cursor-pointer"
                        style={{ color: tokens.onSurface }}
                    >
                        {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
                    </button>
                )}

                {user ? (
                    <>
                        {user.role === 'seller' && (
                            <Link to="/seller/dashboard" className="hidden sm:inline transition-colors hover:text-[#C9A96E]">Seller Dashboard</Link>
                        )}

                        {/* Cart */}
                        <Link
                            to="/cart"
                            className="relative flex items-center hover:opacity-70 transition-opacity"
                            style={{ color: tokens.onSurface }}
                            aria-label="Shopping cart"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                                <line x1="3" y1="6" x2="21" y2="6" />
                                <path d="M16 10a4 4 0 0 1-8 0" />
                            </svg>
                            {cartItems?.length > 0 && (
                                <span
                                    className="absolute -top-2 -right-2 flex items-center justify-center rounded-full text-white"
                                    style={{
                                        backgroundColor: tokens.primary,
                                        width: '16px',
                                        height: '16px',
                                        fontSize: '9px',
                                        fontFamily: "'Inter', sans-serif",
                                        fontWeight: 600,
                                        letterSpacing: 0,
                                    }}
                                >
                                    {cartItems.length > 9 ? '9+' : cartItems.length}
                                </span>
                            )}
                        </Link>

                        {/* User menu */}
                        <div className="relative" ref={menuRef}>
                            <button
                                onClick={() => setMenuOpen(o => !o)}
                                className="flex items-center gap-2 cursor-pointer"
                                aria-label="Account menu"
                            >
                                <span
                                    className="flex items-center justify-center rounded-full font-semibold"
                                    style={{
                                        width: '28px',
                                        height: '28px',
                                        backgroundColor: tokens.primary,
                                        color: '#fff',
                                        fontSize: '10px',
                                        letterSpacing: 0,
                                        fontFamily: "'Inter', sans-serif",
                                    }}
                                >
                                    {initials}
                                </span>
                                <span className="hidden md:inline normal-case tracking-normal text-[13px]" style={{ color: tokens.onSurface, fontFamily: "'Inter', sans-serif" }}>
                                    {user.fullname}
                                </span>
                            </button>

                            {menuOpen && (
                                <div
                                    className="absolute right-0 mt-3 w-44 py-2 shadow-[0_16px_32px_rgba(0,0,0,0.25)] normal-case tracking-normal"
                                    style={{ backgroundColor: dropdownBg, border: `1px solid ${tokens.outlineVariant}` }}
                                >
                                    <div className="px-4 py-2 text-[11px] uppercase tracking-[0.18em]" style={{ color: tokens.muted }}>
                                        {user.role === 'seller' ? 'Seller Account' : 'My Account'}
                                    </div>
                                    <Link
                                        to="/cart"
                                        onClick={() => setMenuOpen(false)}
                                        className="block px-4 py-2 text-sm transition-colors"
                                        style={{ color: tokens.onSurface, fontFamily: "'Inter', sans-serif" }}
                                        onMouseEnter={e => e.currentTarget.style.backgroundColor = dropdownHover}
                                        onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                                    >
                                        My Cart
                                    </Link>
                                    {user.role === 'seller' && (
                                        <Link
                                            to="/seller/dashboard"
                                            onClick={() => setMenuOpen(false)}
                                            className="block px-4 py-2 text-sm transition-colors"
                                            style={{ color: tokens.onSurface, fontFamily: "'Inter', sans-serif" }}
                                            onMouseEnter={e => e.currentTarget.style.backgroundColor = dropdownHover}
                                            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                                        >
                                            Seller Dashboard
                                        </Link>
                                    )}
                                    <button
                                        onClick={onLogout}
                                        className="w-full text-left block px-4 py-2 text-sm transition-colors cursor-pointer"
                                        style={{ color: '#ff6b6b', fontFamily: "'Inter', sans-serif" }}
                                        onMouseEnter={e => e.currentTarget.style.backgroundColor = dropdownDangerHover}
                                        onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="transition-colors hover:text-[#C9A96E]">Sign In</Link>
                        <Link
                            to="/register"
                            className="px-5 py-2.5 transition-colors"
                            style={{ backgroundColor: tokens.onSurface, color: tokens.surface }}
                        >
                            Sign Up
                        </Link>
                    </>
                )}
            </div>
        </nav>
    )
}

export default Nav
