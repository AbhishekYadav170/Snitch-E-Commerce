// import { createSlice } from "@reduxjs/toolkit";


// const productSlice = createSlice({
//     name: "product",
//     initialState: {
//         sellerProducts: [],
//         products:[]
//     },
//     reducers: {
//         setSellerProducts: (state, action) => {
//             state.sellerProducts = action.payload
//         },
//         setProducts: (state, action) => {
//             state.products = action.payload
//         }
//     }
// })


// export const { setSellerProducts, setProducts } = productSlice.actions
// export default productSlice.reducer





import { createSlice } from "@reduxjs/toolkit";


const productSlice = createSlice({
    name: "product",
    initialState: {
        sellerProducts: [],
        products:[]
    },
    reducers: {
        setSellerProducts: (state, action) => {
            state.sellerProducts = action.payload
        },
        setProducts: (state, action) => {
            state.products = action.payload
        },
        removeSellerProduct: (state, action) => {
            const productId = action.payload
            state.sellerProducts = state.sellerProducts.filter(p => p._id !== productId)
        },
        removeVariantFromSellerProduct: (state, action) => {
            const { productId, variantId } = action.payload
            state.sellerProducts = state.sellerProducts.map(p => {
                if (p._id !== productId) return p
                return { ...p, variants: p.variants.filter(v => v._id !== variantId) }
            })
        }
    }
})


export const { setSellerProducts, setProducts, removeSellerProduct, removeVariantFromSellerProduct } = productSlice.actions
export default productSlice.reducer