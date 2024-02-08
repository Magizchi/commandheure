import React, { FunctionComponent, useContext, useState } from "react";
import { Product } from "@pages/products/models/product.models";

interface ProductListContextProps {
  product: Product;
  setProduct: React.Dispatch<React.SetStateAction<Product>>;
}

const ProductListContext = React.createContext<ProductListContextProps>({
  product: {} as Product,
  setProduct: () => { },
});

const ShoppingCartProvider: FunctionComponent<{ children: React.ReactNode }> = ({ children }) => {
  const [product, setProduct] = useState<Product>({} as Product);

  return (
    <ProductListContext.Provider value={{ product: product, setProduct: setProduct }}>
      {children}
    </ProductListContext.Provider>
  );
};

const useShoppingCartContext = (): ProductListContextProps => {
  const context = useContext(ProductListContext);
  if (context === undefined) throw new Error("useProductListContext must be used within a ShoppingCartProvider");
  return context as ProductListContextProps;
};

export { ShoppingCartProvider, useShoppingCartContext };
