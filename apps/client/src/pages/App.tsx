import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ROUTES } from "@constants/Routes";
import LandingPage from '@pages/landing';
import ShoppingCartPage from "@pages/shoppingCart";
import ProductsPage from "./products";

const App = () => {
  return (
    <div className="bg-primary">
      <BrowserRouter>
        <Routes>
          <Route
            path={ROUTES.LANDING}
            element={<LandingPage />}
          />
          <Route
            path={ROUTES.SUPPLIER_PRODUCTS}
            element={
              <ProductsPage />
            }
          />
          <Route
            path={ROUTES.SUPPLIER_SHOPPING_CART}
            element={
              <ShoppingCartPage />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};
export default App;
