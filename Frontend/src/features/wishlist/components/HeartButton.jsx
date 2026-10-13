import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { useWishlist } from '../hook/useWishlist';

/**
 * Heart toggle for saving a product to the wishlist.
 * Works on cards (absolute-positioned via className) and on the product page.
 */
const HeartButton = ({ productId, className = '', size = 18 }) => {
    const user = useSelector(state => state.auth.user);
    const ids = useSelector(state => state.wishlist.ids);
    const { handleToggleWishlist } = useWishlist();
    const navigate = useNavigate();
    const [ busy, setBusy ] = React.useState(false);

    const active = ids.includes(productId);

    // Sellers can't wishlist
    if (user?.role === 'seller') return null;

    const onClick = async (e) => {
        e.stopPropagation();
        e.preventDefault();

        if (!user) {
            navigate('/login');
            return;
        }
        if (busy) return;

        setBusy(true);
        try {
            await handleToggleWishlist(productId);
        } catch (err) {
            console.error('Wishlist update failed', err);
        } finally {
            setBusy(false);
        }
    };

    return (
        <button
            type="button"
            onClick={onClick}
            aria-label={active ? 'Remove from wishlist' : 'Add to wishlist'}
            aria-pressed={active}
            title={active ? 'Remove from wishlist' : 'Add to wishlist'}
            className={`flex items-center justify-center rounded-full transition-transform hover:scale-110 cursor-pointer ${className}`}
            style={{ width: size + 14, height: size + 14, backgroundColor: 'rgba(255,255,255,0.92)', color: active ? '#d6336c' : '#4d463a' }}
        >
            <svg width={size} height={size} viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
        </button>
    );
};

export default HeartButton;
