// import { addItem, getCart, incrementCartItemApi} from "../service/cart.api"
// import { useDispatch } from "react-redux"
// import { addItem as addItemToCart, setItems } from "../state/cart.slice"

// export const useCart = () => {

//     const dispatch = useDispatch()

//     async function handleAddItem({ productId, variantId }) {
//         const data = await addItem({ productId, variantId })

//         return data
//     }

//     async function handleGetCart() {
//         const data = await getCart()
//         dispatch(setItems(data.cart.items))
//     }

//     async function handleIncrementCartItem({ productId, variantId }) {
//         const data = await incrementCartItemApi({ productId, variantId })
//         dispatch(incrementCartItem({ productId, variantId}))
//     }

//     return { handleAddItem, handleGetCart, handleIncrementCartItem }

// }




// import { addItem, getCart, incrementCartItemApi} from "../service/cart.api"
// import { useDispatch } from "react-redux"
// import { addItem as addItemToCart, setItems, incrementItemQuantity } from "../state/cart.slice"

// export const useCart = () => {

//     const dispatch = useDispatch()

//     async function handleAddItem({ productId, variantId }) {
//         const data = await addItem({ productId, variantId })

//         return data
//     }

//     async function handleGetCart() {
//         const data = await getCart()
//         dispatch(setItems(data.cart.items))
//     }

//     async function handleIncrementCartItem({ productId, variantId }) {
//         const data = await incrementCartItemApi({ productId, variantId })
//         dispatch(incrementItemQuantity({ productId, variantId}))
//     }

//     return { handleAddItem, handleGetCart, handleIncrementCartItem }

// }






import { addItem, getCart, incrementCartItemApi, decrementCartItemApi, removeCartItemApi} from "../service/cart.api"
import { useDispatch } from "react-redux"
import { addItem as addItemToCart, setItems, incrementItemQuantity, decrementItemQuantity, removeItem } from "../state/cart.slice"

export const useCart = () => {

    const dispatch = useDispatch()

    async function handleGetCart() {
        const data = await getCart()
        dispatch(setItems(data.cart.items))
        return data.cart.items
    }

    async function handleAddItem({ productId, variantId, quantity = 1 }) {
        const data = await addItem({ productId, variantId, quantity })

        // Keep the cart badge / state in sync immediately after adding
        await handleGetCart()

        return data
    }

    async function handleIncrementCartItem({ productId, variantId }) {
        const data = await incrementCartItemApi({ productId, variantId })
        dispatch(incrementItemQuantity({ productId, variantId}))
        return data
    }

    async function handleDecrementCartItem({ productId, variantId }) {
        const data = await decrementCartItemApi({ productId, variantId })
        if (data?.removed) {
            dispatch(removeItem({ productId, variantId }))
        } else {
            dispatch(decrementItemQuantity({ productId, variantId }))
        }
        return data
    }

    async function handleRemoveCartItem({ productId, variantId }) {
        const data = await removeCartItemApi({ productId, variantId })
        dispatch(removeItem({ productId, variantId }))
        return data
    }

    return { handleAddItem, handleGetCart, handleIncrementCartItem, handleDecrementCartItem, handleRemoveCartItem }

}