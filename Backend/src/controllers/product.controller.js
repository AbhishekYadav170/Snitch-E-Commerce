
// import productModel from "../models/product.model.js";
// import { uploadFile } from "../services/storage.service.js";


// export async function createProduct(req, res) {

//     const { title, description, priceAmount, priceCurrency } = req.body;
//     const seller = req.user;

//     const images = await Promise.all(req.files.map(async (file) => {
//         return await uploadFile({
//             buffer: file.buffer,
//             fileName: file.originalname
//         })
//     }))


//     const product = await productModel.create({
//         title,
//         description,
//         price: {
//             amount: priceAmount,
//             currency: priceCurrency || "INR"
//         },
//         images,
//         seller: seller._id,
//         //variants: []
//     })


//     res.status(201).json({
//         message: "Product created successfully",
//         success: true,
//         product
//     })
// }

// export async function getSellerProducts(req, res) {
//     const seller = req.user;

//     const products = await productModel.find({ seller: seller._id });


//     res.status(200).json({
//         message: "Products fetched successfully",
//         success: true,
//         products
//     })
// }

// export async function getAllProducts(req, res) {
//     const products = await productModel.find()

//     return res.status(200).json({
//         message: "Product fetched successfully",
//         success: true,
//         products
//     })
// }

// export async function getProductDetails(req,res) {
//     const { id } = req.params;

//     const product = await productModel.findById(id)
//     // console.log("PRODUCT FROM DB:", product); 

//     if (!product) {
//         return res.status(404).json({
//             message: "Product not found",
//             success: false
//         })
//     }

//     return res.status(200).json({
//         message: "Product detail fetched succesfully",
//         success: true,
//         product
//     })
// }

// export async function addProductVariant(req, res) {

//     const productId = req.params.productId;

//     const product = await productModel.findOne({
//         _id: productId,
//         seller: req.user._id
//     });

//     if(!product) {
//         return res.status(404).json({
//             message: "Product not found",
//             success: false
//         })
//     }


//     //const files = req.files?.images || [];
//     const files = req.files || [];

//     //let images = [];
//     // const images = [];

//     // if (files.length > 0) {
//     //    images = await Promise.all(
//     //        files.map(async (file) => {
//     //           return await uploadFile({
//     //               buffer: file.buffer,
//     //               fileName: file.originalname
//     //             });
//     //         })
//     //     );
//     // }

//     let images = [];
//     if (files && files.length > 0) {
//         (await Promise.all(files.map(async (file) => {
//             const image = await uploadFile({
//                 buffer: file.buffer,
//                 fileName: file.originalname
//             })
//             return image
//         }))).map(image => images.push(image))
//     }
    

//     const price = req.body.priceAmount
//     const stock = Number(req.body.stock);
//     const attributes = JSON.parse(req.body.attributes || "{}")


//     console.log(price)

//     product.variants.push({
//         images,
//         price: {
//             amount: Number(price) || product.price.amount,
//             currency: req.body.priceCurrency || product.price.currency
//         },
//         stock,
//         attributes
//     })

//     await product.save();

//     return res.status(200).json({
//         message: "Product variant added successfully",
//         success: true,
//         product
//     })
    
// }









import productModel from "../models/product.model.js";
import { uploadFile } from "../services/storage.service.js";


export async function createProduct(req, res) {

    const { title, description, priceAmount, priceCurrency } = req.body;
    const seller = req.user;

    const images = await Promise.all(req.files.map(async (file) => {
        return await uploadFile({
            buffer: file.buffer,
            fileName: file.originalname
        })
    }))


    const product = await productModel.create({
        title,
        description,
        price: {
            amount: priceAmount,
            currency: priceCurrency || "INR"
        },
        images,
        seller: seller._id,
        //variants: []
    })


    res.status(201).json({
        message: "Product created successfully",
        success: true,
        product
    })
}

export async function getSellerProducts(req, res) {
    const seller = req.user;

    const products = await productModel.find({ seller: seller._id });


    res.status(200).json({
        message: "Products fetched successfully",
        success: true,
        products
    })
}

export async function getAllProducts(req, res) {
    const products = await productModel.find()

    return res.status(200).json({
        message: "Product fetched successfully",
        success: true,
        products
    })
}

export async function getProductDetails(req,res) {
    const { id } = req.params;

    const product = await productModel.findById(id)
    // console.log("PRODUCT FROM DB:", product); 

    if (!product) {
        return res.status(404).json({
            message: "Product not found",
            success: false
        })
    }

    return res.status(200).json({
        message: "Product detail fetched succesfully",
        success: true,
        product
    })
}

export async function addProductVariant(req, res) {

    const productId = req.params.productId;

    const product = await productModel.findOne({
        _id: productId,
        seller: req.user._id
    });

    if(!product) {
        return res.status(404).json({
            message: "Product not found",
            success: false
        })
    }


    //const files = req.files?.images || [];
    const files = req.files || [];

    //let images = [];
    // const images = [];

    // if (files.length > 0) {
    //    images = await Promise.all(
    //        files.map(async (file) => {
    //           return await uploadFile({
    //               buffer: file.buffer,
    //               fileName: file.originalname
    //             });
    //         })
    //     );
    // }

    let images = [];
    if (files && files.length > 0) {
        (await Promise.all(files.map(async (file) => {
            const image = await uploadFile({
                buffer: file.buffer,
                fileName: file.originalname
            })
            return image
        }))).map(image => images.push(image))
    }
    

    const price = req.body.priceAmount
    const stock = Number(req.body.stock);
    const attributes = JSON.parse(req.body.attributes || "{}")


    console.log(price)

    product.variants.push({
        images,
        price: {
            amount: Number(price) || product.price.amount,
            currency: req.body.priceCurrency || product.price.currency
        },
        stock,
        attributes
    })

    await product.save();

    return res.status(200).json({
        message: "Product variant added successfully",
        success: true,
        product
    })
    
}

export async function deleteProduct(req, res) {
    const { productId } = req.params;

    // Only the seller who owns this product can delete it
    const product = await productModel.findOneAndDelete({
        _id: productId,
        seller: req.user._id
    });

    if (!product) {
        return res.status(404).json({
            message: "Product not found",
            success: false
        })
    }

    return res.status(200).json({
        message: "Product deleted successfully",
        success: true
    })
}

export async function deleteProductVariant(req, res) {
    const { productId, variantId } = req.params;

    const product = await productModel.findOne({
        _id: productId,
        seller: req.user._id
    });

    if (!product) {
        return res.status(404).json({
            message: "Product not found",
            success: false
        })
    }

    const variantExists = product.variants.some(v => v._id.toString() === variantId);

    if (!variantExists) {
        return res.status(404).json({
            message: "Variant not found",
            success: false
        })
    }

    product.variants = product.variants.filter(v => v._id.toString() !== variantId);
    await product.save();

    return res.status(200).json({
        message: "Variant deleted successfully",
        success: true,
        product
    })
}