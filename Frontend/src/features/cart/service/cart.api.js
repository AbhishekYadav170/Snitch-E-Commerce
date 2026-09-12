// import axios from "axios"


// const cartApiInstance = axios.create({
//     baseURL: "/api/cart",
//     withCredentials: true
// })


// export const addItem = async ({ productId, variantId }) => {
//     const response = await cartApiInstance.post(`/add/${productId}/${variantId}`, {
//         quantity: 1
//     })

//     return response.data
// }

// export const getCart = async () => {
//     const response = await cartApiInstance.get("/", {withCredentials: true})
//     return response.data
// }

// export const incrementCartItemApi = async ({ productId, variantId }) => {
//     const response = await cartApiInstance.patch(`/quantity/increment/${productId}/${variantId}`)
//     return response.data
// }




import axios from "axios"


const cartApiInstance = axios.create({
    baseURL: "/api/cart",
    withCredentials: true
})


export const addItem = async ({ productId, variantId, quantity = 1 }) => {
    const response = await cartApiInstance.post(`/add/${productId}/${variantId}`, {
        quantity
    })

    return response.data
}

export const getCart = async () => {
    const response = await cartApiInstance.get("/", {withCredentials: true})
    return response.data
}

export const incrementCartItemApi = async ({ productId, variantId }) => {
    const response = await cartApiInstance.patch(`/quantity/increment/${productId}/${variantId}`)
    return response.data
}

export const decrementCartItemApi = async ({ productId, variantId }) => {
    const response = await cartApiInstance.patch(`/quantity/decrement/${productId}/${variantId}`)
    return response.data
}

export const removeCartItemApi = async ({ productId, variantId }) => {
    const response = await cartApiInstance.delete(`/remove/${productId}/${variantId}`)
    return response.data
}