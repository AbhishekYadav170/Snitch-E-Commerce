import { createProduct, getSellerProduct, getAllProducts, getProductByID, addProductVariant, deleteProduct, deleteProductVariant } from "../service/product.api"
import { useDispatch } from "react-redux"
import { setSellerProducts, setProducts, removeSellerProduct, removeVariantFromSellerProduct } from "../state/product.slice"


export const useProduct = () => {

    const dispatch = useDispatch()

    async function handleCreateProduct(formData) {
        const data = await createProduct(formData)
        return data.product
    }

    async function handleGetSellerProduct() {
        const data = await getSellerProduct()
        dispatch(setSellerProducts(data.products))
        return data.products
    }

    async function handleGetAllProducts(){

        const data = await getAllProducts()
        dispatch(setProducts(data.products))
    }

    async function handleGetProductById(productId) {
        const data = await getProductByID(productId)
        return data.product
    }

    async function handleAddProductVariant(product, newProductVariant) {
        const data = await addProductVariant(product, newProductVariant)

        return data
    }

    async function handleDeleteProduct(productId) {
        const data = await deleteProduct(productId)
        dispatch(removeSellerProduct(productId))
        return data
    }

    async function handleDeleteProductVariant(productId, variantId) {
        const data = await deleteProductVariant(productId, variantId)
        dispatch(removeVariantFromSellerProduct({ productId, variantId }))
        return data
    }

    return { handleCreateProduct, handleGetSellerProduct, handleGetAllProducts, handleGetProductById, handleAddProductVariant, handleDeleteProduct, handleDeleteProductVariant }

}