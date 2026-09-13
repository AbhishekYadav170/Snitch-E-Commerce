import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext({
    theme: 'light',
    toggleTheme: () => {},
});

export const ThemeProvider = ({ children }) => {
    const [ theme, setTheme ] = useState(() => {
        try {
            return localStorage.getItem('snitch-theme') || 'light';
        } catch {
            return 'light';
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem('snitch-theme', theme);
        } catch {
            // ignore storage errors (e.g. private browsing)
        }
    }, [ theme ]);

    const toggleTheme = () => setTheme(prev => (prev === 'light' ? 'dark' : 'light'));

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);

/* ─── Shared "Avenue Montaigne" palettes for customer-facing pages ─── */
/* (Seller Dashboard / SellerProductDetails / Login / Register / CreateProduct
   keep their own fixed dark+gold identity and are NOT affected by this toggle) */

export const lightTokens = {
    surface: '#fbf9f6',
    surfaceLow: '#f5f3f0',
    surfaceLowest: '#ffffff',
    surfaceHigh: '#eae8e5',
    surfaceHighest: '#e4e2df',
    onSurface: '#1b1c1a',
    onSurfaceVariant: '#4d463a',
    secondary: '#7A6E63',
    muted: '#B5ADA3',
    primary: '#C9A96E',
    primaryDark: '#745a27',
    outlineVariant: '#d0c5b5',
    outline: '#7f7668',
};

export const darkTokens = {
    surface: '#171512',
    surfaceLow: '#201d18',
    surfaceLowest: '#26221c',
    surfaceHigh: '#2b2720',
    surfaceHighest: '#332e26',
    onSurface: '#f3efe8',
    onSurfaceVariant: '#cfc8ba',
    secondary: '#a89e8d',
    muted: '#6f665a',
    primary: '#C9A96E',
    primaryDark: '#e9c98f',
    outlineVariant: '#3a352c',
    outline: '#8a8071',
};

export const useTokens = () => {
    const { theme } = useTheme();
    return theme === 'dark' ? darkTokens : lightTokens;
};
