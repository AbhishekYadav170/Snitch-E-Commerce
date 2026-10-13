import axios from "axios"

const wishlistApiInstance = axios.create({
    baseURL: "/api/wishlist",
    withCredentials: true
})

export const getWishlistApi = async () => {
    const response = await wishlistApiInstance.get("/")
    return response.data
}

export const toggleWishlistApi = async (productId) => {
    const response = await wishlistApiInstance.post(`/toggle/${productId}`)
    return response.data
}
