import { createSlice } from "@reduxjs/toolkit";

const wishlistSlice = createSlice({
    name: "wishlist",
    initialState: {
        ids: [],        // product ids (for the heart buttons)
        products: [],   // full products (for the Wishlist page)
        loaded: false
    },
    reducers: {
        setWishlist: (state, action) => {
            state.products = action.payload;
            state.ids = action.payload.map(p => p._id);
            state.loaded = true;
        },
        setWishlistIds: (state, action) => {
            state.ids = action.payload;
            state.products = state.products.filter(p => action.payload.includes(p._id));
        },
        clearWishlist: (state) => {
            state.ids = [];
            state.products = [];
            state.loaded = false;
        }
    }
})

export const { setWishlist, setWishlistIds, clearWishlist } = wishlistSlice.actions
export default wishlistSlice.reducer
