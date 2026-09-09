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
        }
    }
})

export const { setItems, addItem, incrementItemQuantity, decrementItemQuantity } = cartSlice.actions
export default cartSlice.reducer





// import { createSlice } from "@reduxjs/toolkit";

// const cartSlice = createSlice({
//     name: "cart",
//     initialState: {
//         items: [],
//     },
//     reducers: {

//         setItems: (state, action) => {
//             state.items = action.payload;
//         },

//         addItem: (state, action) => {
//             const newItem = action.payload;

//             const existing = state.items.find(
//                 item =>
//                     item.product._id === newItem.product._id &&
//                     item.variant === newItem.variant
//             );

//             if (existing) {
//                 existing.quantity += 1;   // 🔥 increment if exists
//             } else {
//                 state.items.push({ ...newItem, quantity: 1 });
//             }
//         },

//         incrementItemQuantity: (state, action) => {
//             const { productId, variantId } = action.payload;

//             const item = state.items.find(
//                 item =>
//                     item.product._id === productId &&
//                     item.variant === variantId
//             );

//             if (item) {
//                 item.quantity += 1;   // ✅ +1 only
//             }
//         },

//         decrementItemQuantity: (state, action) => {
//             const { productId, variantId } = action.payload;

//             const item = state.items.find(
//                 item =>
//                     item.product._id === productId &&
//                     item.variant === variantId
//             );

//             if (item) {
//                 item.quantity -= 1;   // ✅ -1 only
//             }

//             // ❌ remove if 0
//             state.items = state.items.filter(item => item.quantity > 0);
//         },

//         removeItem: (state, action) => {
//             const { productId, variantId } = action.payload;

//             state.items = state.items.filter(
//                 item =>
//                     !(item.product._id === productId &&
//                       item.variant === variantId)
//             );
//         }

//     }
// });

// export const {
//     setItems,
//     addItem,
//     incrementItemQuantity,
//     decrementItemQuantity,
//     removeItem
// } = cartSlice.actions;

// export default cartSlice.reducer;