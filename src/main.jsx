import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import RootLayout from "./component/Layout/RootLayout.jsx";
import Home from "./component/Home/Home.jsx";
import AllProducts from "./component/AllProducts/AllProducts.jsx";
import AuthProvider from "./constext/AuthProvider.jsx";
import Register from "./component/Register/Register.jsx";
import Login from "./component/Login/Login.jsx";
import MyProducts from "./component/MyProducts/MyProducts.jsx";
import MyBids from "./component/MyBids/MyBids.jsx";
import PrivateRoute from "./Routes/PrivateRoute.jsx";
import ProductDetails from "./component/Product/ProductDetails.jsx";
import CreateAProduct from "./component/CreateAProduct/CreateAProduct.jsx";
import { ToastContainer } from "react-toastify";
import LoadingPage from "./component/LoadingPage/LoadingPage.jsx";
import MyDownloads from "./component/MyDownloads/MyDownloads.jsx";
import DownloadsDetails from "./component/MyDownloads/DownloadsDetails.jsx";

const route = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    hydrateFallbackElement: <LoadingPage />,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/allProducts",
        Component: AllProducts,
      },
      {
        path: "/register",
        Component: Register,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/my-products",
        element: (
          <PrivateRoute>
            <MyProducts />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-downloadsProducts",
        element: (
          <PrivateRoute>
            <MyDownloads />
          </PrivateRoute>
        ),
      },
      {
        path: "/downloads-details/:id",
        loader: ({ params }) =>
          fetch(`http://localhost:5000/downloads-details/${params.id}`),
        element: (
          <PrivateRoute>
            <DownloadsDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-bids",
        element: (
          <PrivateRoute>
            <MyBids />
          </PrivateRoute>
        ),
      },
      {
        path: "/create-a-product",
        element: (
          <PrivateRoute>
            <CreateAProduct />
          </PrivateRoute>
        ),
      },
      {
        path: "/product-details/:id",
        loader: ({ params }) =>
          fetch(
            `https://smart-deals-server-10.vercel.app/single-product/${params.id}`
          ),
        element: (
          <PrivateRoute>
            <ProductDetails />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={route}></RouterProvider>
    </AuthProvider>
    <ToastContainer position="top-center" />
  </StrictMode>
);
