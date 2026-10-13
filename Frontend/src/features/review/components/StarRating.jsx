import React from 'react';

/** Read-only star display. `value` is 0-5 (decimals allowed). */
const StarRating = ({ value = 0, size = 14 }) => {
    const pct = Math.max(0, Math.min(5, value)) / 5 * 100;
    return (
        <span
            className="relative inline-block leading-none select-none"
            style={{ fontSize: size, letterSpacing: 1 }}
            role="img"
            aria-label={`${value} out of 5 stars`}
        >
            <span style={{ color: '#cfc8bb' }}>★★★★★</span>
            <span className="absolute left-0 top-0 overflow-hidden whitespace-nowrap" style={{ width: `${pct}%`, color: '#e0a526' }}>★★★★★</span>
        </span>
    );
};

export default StarRating;
