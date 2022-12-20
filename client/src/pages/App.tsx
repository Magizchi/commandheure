import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../layouts";
import Header from "../layouts/Header";
import ProductsPage from "./products";

const App = () => {
  return (
    <section className="min-h-screen bg-gray-100">
      <BrowserRouter>
        <Header />
        <Layout>
          <Routes>
            <Route path="/products/:id" element={<ProductsPage />} />
            {/* <input type="file" onChange={onChange} />
    <Route exact path="/" component={Home} />
    <Route exact path="/panier" component={ShoppingCart} />
  <Route exact path="/haudecoeur/product/:id" component={ProductRoutes} /> */}
          </Routes>
        </Layout>
      </BrowserRouter>
    </section>
  );
};

export default App;
