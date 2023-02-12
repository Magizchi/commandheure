import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ROUTES } from "../constants/Routes";
import { ShoppingCartProvider } from "../contexts/shoppingCart";
import Layout from "../layouts";
import Header from "../layouts/Header";
import ProductsPage from "./products";
import ShoppingCartPage from "./shoppingCart";

const App = () => (
  <section className="min-h-screen bg-gray-100">
    <BrowserRouter>
      <Header />
      <Routes>
        <Route
          path={ROUTES.PRODUCTS}
          element={
            <Layout>
              <ProductsPage />
            </Layout>
          }
        />
        <Route
          path={ROUTES.SHOPPING_CART}
          element={
            <ShoppingCartProvider>
              <ShoppingCartPage />
            </ShoppingCartProvider>
          }
        />
      </Routes>
    </BrowserRouter>
  </section>
);

export default App;
