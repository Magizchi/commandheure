import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import Card from "../../components/atoms/Card";
import { API } from "../../constants/API";
import { FormatProduct, Product } from "./models/product.models";
import { InputNumber } from "antd";
import Button from "../../components/atoms/Button";
import Pagination from "../../components/molecules/pagination";
import useArrayHook from "../../hooks/useArray";
import useDelay from "../../hooks/useHookDelay";

const ProductsPage = () => {
  const { array: products, save, update } = useArrayHook<Product>([]);
  const [totalProducts, setTotalProducts] = useState<number>(0);
  const [searchParams] = useSearchParams();
  const params = useParams();

  const getProducts = async () => {
    const {
      data: { products, total },
    } = await axios.get(API.PRODUCTS + `/${params.id}?${searchParams.toString()}`);

    save(FormatProduct(products));
    setTotalProducts(total);
  };

  useEffect(() => {
    getProducts();
  }, [params.id, searchParams]);

  const onChange = async (value: number, product: Product) => {
    try {
      if (value < 0) value = 0;
      const modulo = value % product.quantity_per_box;
      const diff = product.quantity_per_box - modulo;
      if (modulo < 5) {
        value = value - modulo;
      } else {
        value = value + diff;
      }
      const { id, ...body } = {
        id: product.shoppingCart.id,
        product: product.id,
        quantities: value,
      };

      if (id) {
        await axios.patch(API.SHOPPING_CART + `/${id}`, body);
        update({ ...product, shoppingCart: { id: product.shoppingCart.id, quantities: value } });
      } else {
        const { data: saved } = await axios.post(API.SHOPPING_CART, body);
        update({ ...product, shoppingCart: { id: saved.id, quantities: saved.quantities } });
      }
      return;
    } catch (err) {
      throw `Erreur:${err}`;
    }
  };

  return (
    <section className="flex items-center flex-col">
      <Pagination defaultCurrent={1} total={totalProducts} />
      <div className="flex flex-wrap">
        {products.map((product) => (
          <Card
            hoverable
            key={product.code_supplier}
            className="w-64 m-2"
            cover={
              <img className="flex justify-center items-center h-60 bg-contain" alt="exemple" src={product.image} />
            }
          >
            <div className="flex flex-col justify-between h-40">
              <div>
                <p className="m-0 p-0 ">{product.name}</p>
                <p>Colisage: {product.quantity_per_box}</p>
              </div>
              <div className="flex justify-center">
                <Button
                  className="mr-1 flex justify-center items-center p-2"
                  onClick={() => onChange(+product.shoppingCart.quantities - +product.quantity_per_box, product)}
                >
                  -
                </Button>
                <InputNumber
                  keyboard={false}
                  controls={false}
                  value={product.shoppingCart.quantities}
                  className=""
                  min={0}
                  onChange={useDelay((value) => onChange(value ?? 0, product), 500)}
                />
                <Button
                  className="ml-1 flex justify-center items-center p-2"
                  onClick={() => onChange(+product.shoppingCart.quantities + +product.quantity_per_box, product)}
                >
                  +
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
      <Pagination defaultCurrent={1} total={totalProducts} />
    </section>
  );
};

export default ProductsPage;
