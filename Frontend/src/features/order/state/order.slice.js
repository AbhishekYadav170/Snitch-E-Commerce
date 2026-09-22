import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
    name: "order",
    initialState: {
        myOrders: [],
        sellerOrders: [],
        lastPlacedOrder: null
    },
    reducers: {
        setMyOrders: (state, action) => {
            state.myOrders = action.payload
        },
        setSellerOrders: (state, action) => {
            state.sellerOrders = action.payload
        },
        setLastPlacedOrder: (state, action) => {
            state.lastPlacedOrder = action.payload
        },
        updateSellerOrderStatus: (state, action) => {
            const { orderId, status } = action.payload
            state.sellerOrders = state.sellerOrders.map(o =>
                o._id === orderId ? { ...o, status } : o
            )
        }
    }
})

export const { setMyOrders, setSellerOrders, setLastPlacedOrder, updateSellerOrderStatus } = orderSlice.actions
export default orderSlice.reducer
