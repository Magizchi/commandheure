import { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Layout from "../layouts";
import Header from "../layouts/Header";

const App = () => {
  return (
    <body className="min-h-screen bg-gray-100">
      <Router>
        <Header />
        <Layout>
          {/* <input type="file" onChange={onChange} />
    <Route exact path="/" component={Home} />
    <Route exact path="/panier" component={ShoppingCart} />
  <Route exact path="/haudecoeur/product/:id" component={ProductRoutes} /> */}
        </Layout>
      </Router>
    </body>
  );
};

export default App;
