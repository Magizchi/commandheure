import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ROUTES } from "@constants/Routes";
import Header from "@layouts/Header";
import ProductsPage from "@pages/products";
import Homepage from '@pages/home';
import ShoppingCartPage from "@pages/shoppingCart";

const App = () => {
  return (
    <main className="min-h-screen bg-gray-100">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route index element={<Navigate to={ROUTES.HEADECOEUR_PRODUCTS + '/alwadi'} replace />} />
          <Route
            path={ROUTES.HEADECOEUR_PRODUCTS + "/:id"}
            element={
              <ProductsPage />
            }
          />
          <Route
            path={ROUTES.SHOPPING_CART}
            element={
              <ShoppingCartPage />
            }
          />
        </Routes>
      </BrowserRouter>
    </main>
  );
}
export default App;
