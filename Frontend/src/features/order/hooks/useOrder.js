import { useDispatch } from "react-redux"
import { placeOrder, getMyOrders, getSellerOrders, getOrderById, updateOrderStatus } from "../service/order.api"
import { setMyOrders, setSellerOrders, setLastPlacedOrder, updateSellerOrderStatus } from "../state/order.slice"

export const useOrder = () => {

    const dispatch = useDispatch()

    async function handlePlaceOrder(shippingAddress) {
        const data = await placeOrder(shippingAddress)
        dispatch(setLastPlacedOrder(data.order))
        return data.order
    }

    async function handleGetMyOrders() {
        const data = await getMyOrders()
        dispatch(setMyOrders(data.orders))
        return data.orders
    }

    async function handleGetSellerOrders() {
        const data = await getSellerOrders()
        dispatch(setSellerOrders(data.orders))
        return data.orders
    }

    async function handleGetOrderById(orderId) {
        const data = await getOrderById(orderId)
        return data.order
    }

    async function handleUpdateOrderStatus(orderId, status) {
        const data = await updateOrderStatus(orderId, status)
        dispatch(updateSellerOrderStatus({ orderId, status }))
        return data.order
    }

    return {
        handlePlaceOrder,
        handleGetMyOrders,
        handleGetSellerOrders,
        handleGetOrderById,
        handleUpdateOrderStatus
    }
}
