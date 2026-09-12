import { createSlice } from "@reduxjs/toolkit";


const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: [],
    },
    reducers: {
        setItems: (state, action) => {
            state.items = action.payload;
        },
        addItem: (state, action) => {
            state.items.push(action.payload)
        },
        incrementItemQuantity: (state, action) => {
            const { productId, variantId } = action.payload;
           
            state.items = state.items.map(item => {
                if (item.product._id === productId && item.variant === variantId) {
                    return {...item, quantity: item.quantity + 1}
                } else {
                    return item;
                }
            })
        },
        decrementItemQuantity: (state, action) => {
            const { productId, variantId } = action.payload;
           
            state.items = state.items.map(item => {
                if (item.product._id === productId && item.variant === variantId) {
                    return {...item, quantity: item.quantity - 1}
                } else {
                    return item;
                }
            })
        },
        removeItem: (state, action) => {
            const { productId, variantId } = action.payload;

            state.items = state.items.filter(
                item => !(item.product._id === productId && item.variant === variantId)
            );
        }
    }
})

export const { setItems, addItem, incrementItemQuantity, decrementItemQuantity, removeItem } = cartSlice.actions
export default cartSlice.reducer