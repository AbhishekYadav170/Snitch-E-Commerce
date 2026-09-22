import axios from "axios"

const orderApiInstance = axios.create({
    baseURL: "/api/orders",
    withCredentials: true
})

export const placeOrder = async (shippingAddress) => {
    const response = await orderApiInstance.post("/", { shippingAddress })
    return response.data
}

export const getMyOrders = async () => {
    const response = await orderApiInstance.get("/my")
    return response.data
}

export const getSellerOrders = async () => {
    const response = await orderApiInstance.get("/seller")
    return response.data
}

export const getOrderById = async (orderId) => {
    const response = await orderApiInstance.get(`/${orderId}`)
    return response.data
}

export const updateOrderStatus = async (orderId, status) => {
    const response = await orderApiInstance.patch(`/${orderId}/status`, { status })
    return response.data
}
