


// import { createBrowserRouter } from "react-router";
// import Register from "../features/auth/pages/Register";
// import Login from "../features/auth/pages/Login";
// import CreateProduct from "../features/product/pages/CreateProduct";
// import Dashboard from "../features/product/pages/Dashboard";
// import Protected from "../features/auth/components/Protected";
// import Home from "../features/product/pages/Home";
// import ProductDetail from "../features/product/pages/ProductDetail";
// import SellerProductDetails from "../features/product/pages/SellerProductDetails";
// import Cart from "../features/cart/pages/Cart.jsx"
// import AppLayout from "./AppLayout"


// export const routes = createBrowserRouter([
//     // {
//     //     path: "/",
//     //     element: <Home />
//     // },
//     {
//         path: "/register",
//         element: <Register />,
//     },
//     {
//         path: "/login",
//         element: <Login />,
//     },
//      {
//         element: <AppLayout />,
//         children: [
//             {
//                 path: "/",
//                 element: <Home />,
//             },
//             {
//                 path: "/product/:productId",
//                 element: <ProductDetail />
//             },
//             {
//                 path: "/cart",
//                 element: <Protected> <Cart /></Protected>
//             },
//             {
//                 path: "/seller",
//                 children: [
//                     {
//                         path: "/seller/create-product",

//                         element: <Protected role="seller" >
//                             <CreateProduct />
//                         </Protected>
//                     },
//                     {
//                         path: "/seller/dashboard",
//                         element: <Protected role="seller" >
//                             <Dashboard />
//                         </Protected>
//                     },
//                     {
//                         path: "/seller/product/:productId",
//                         element: <Protected role="seller" >
//                             <SellerProductDetails />
//                         </Protected>
//                     }
//                 ]
//             }
//         ]
//     }


// ])









import { createBrowserRouter } from "react-router";
import Register from "../features/auth/pages/Register";
import Login from "../features/auth/pages/Login";
import CreateProduct from "../features/product/pages/CreateProduct";
import Dashboard from "../features/product/pages/Dashboard";
import Protected from "../features/auth/components/Protected";
import Home from "../features/product/pages/Home";
import ProductDetail from "../features/product/pages/ProductDetail";
import SellerProductDetails from "../features/product/pages/SellerProductDetails";
import Cart from "../features/cart/pages/Cart.jsx"
import Checkout from "../features/order/pages/Checkout.jsx"
import OrderConfirmation from "../features/order/pages/OrderConfirmation.jsx"
import MyOrders from "../features/order/pages/MyOrders.jsx"
import SellerOrders from "../features/order/pages/SellerOrders.jsx"
import AppLayout from "./AppLayout"


export const routes = createBrowserRouter([
    // {
    //     path: "/",
    //     element: <Home />
    // },
    {
        path: "/register",
        element: <Register />,
    },
    {
        path: "/login",
        element: <Login />,
    },
     {
        element: <AppLayout />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/product/:productId",
                element: <ProductDetail />
            },
            {
                path: "/cart",
                element: <Protected> <Cart /></Protected>
            },
            {
                path: "/checkout",
                element: <Protected> <Checkout /></Protected>
            },
            {
                path: "/order-confirmation/:orderId",
                element: <Protected> <OrderConfirmation /></Protected>
            },
            {
                path: "/my-orders",
                element: <Protected> <MyOrders /></Protected>
            },
            {
                path: "/seller",
                children: [
                    {
                        path: "/seller/create-product",

                        element: <Protected role="seller" >
                            <CreateProduct />
                        </Protected>
                    },
                    {
                        path: "/seller/dashboard",
                        element: <Protected role="seller" >
                            <Dashboard />
                        </Protected>
                    },
                    {
                        path: "/seller/product/:productId",
                        element: <Protected role="seller" >
                            <SellerProductDetails />
                        </Protected>
                    },
                    {
                        path: "/seller/orders",
                        element: <Protected role="seller" >
                            <SellerOrders />
                        </Protected>
                    }
                ]
            }
        ]
    }


])
//     {
//         path: "/product/:productId",
//         element: <ProductDetail />
//     },
//     {
//         path: "/cart",
//         element:<Protected><Cart /></Protected>
//     },
//     {
//         path: "/seller",
//         children: [
//             {
//                 path:"/seller/create-product",
//                 element: <Protected role="seller"><CreateProduct/></Protected>
//             },
//             {
//                 path: "/seller/dashboard",
//                 element: <Protected role="seller" >
//                     <Dashboard />
//                 </Protected>
//             },
//             {
//                 path: "/seller/product/:productId",
//                 element: <Protected role="seller" >
//                     <SellerProductDetails/>
//                 </Protected>
//             }
//         ]
//     }

