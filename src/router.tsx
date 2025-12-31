import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "./layouts/MainLayout";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Products />,
      },
      {
        path: "/producto/:name",
        element: <ProductDetail />,
      },
    ],
  },
]);
