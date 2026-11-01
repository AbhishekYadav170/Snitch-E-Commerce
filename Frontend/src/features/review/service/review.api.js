// import axios from "axios"

// const reviewApiInstance = axios.create({
//     baseURL: "/api/reviews",
//     withCredentials: true
// })

// export const getReviewsApi = async (productId) => {
//     const response = await reviewApiInstance.get(`/${productId}`)
//     return response.data
// }

// export const saveReviewApi = async (productId, { rating, comment }) => {
//     const response = await reviewApiInstance.post(`/${productId}`, { rating, comment })
//     return response.data
// }

// export const deleteReviewApi = async (productId) => {
//     const response = await reviewApiInstance.delete(`/${productId}`)
//     return response.data
// }





import axios from "axios";

const reviewApiInstance = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/api/reviews`,
    withCredentials: true,
});

export const getReviewsApi = async (productId) => {
    const response = await reviewApiInstance.get(`/${productId}`);
    return response.data;
};

export const saveReviewApi = async (productId, { rating, comment }) => {
    const response = await reviewApiInstance.post(`/${productId}`, {
        rating,
        comment,
    });
    return response.data;
};

export const deleteReviewApi = async (productId) => {
    const response = await reviewApiInstance.delete(`/${productId}`);
    return response.data;
};
