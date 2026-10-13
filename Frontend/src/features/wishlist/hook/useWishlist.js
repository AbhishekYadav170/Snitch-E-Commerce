import { useDispatch } from "react-redux"
import { getWishlistApi, toggleWishlistApi } from "../service/wishlist.api"
import { setWishlist, setWishlistIds, clearWishlist } from "../state/wishlist.slice"

export const useWishlist = () => {

    const dispatch = useDispatch()

    async function handleLoadWishlist() {
        const data = await getWishlistApi()
        dispatch(setWishlist(data.products))
        return data.products
    }

    async function handleToggleWishlist(productId) {
        const data = await toggleWishlistApi(productId)
        dispatch(setWishlistIds(data.productIds))
        return data
    }

    function handleClearWishlist() {
        dispatch(clearWishlist())
    }

    return { handleLoadWishlist, handleToggleWishlist, handleClearWishlist }
}
