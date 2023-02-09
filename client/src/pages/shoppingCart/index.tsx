import { ColumnsType } from "antd/es/table";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Table from "../../components/organims/Table";
import { API } from "../../constants/API";
import { Product } from "../products/models/product.models";

const ShoppingCartPage = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const getShoppingList = async () => {
    const { data } = await axios.get(API.SHOPPING_CART);
    setProducts(data);
  };

  useEffect(() => {
    getShoppingList();
  }, []);

  return (
    <section className="container mx-auto">
      <Table data={products} columns={columns} total={products.length} />
    </section>
  );
};

export default ShoppingCartPage;
const columns: ColumnsType<Product> = [
  {
    title: "code",
    dataIndex: "code_supplier",
    key: "code_supplier",
    width: "10em",
    sorter: true,
  },
  {
    title: "Désignation",
    dataIndex: "name",
    key: "name",
    width: "auto",
  },
  {
    title: "Marque",
    dataIndex: "brand",
    key: "brand",
    width: "8em",
  },
  {
    title: "PCB",
    dataIndex: "quantity_per_box",
    key: "quantity_per_box",
    width: "8em",
  },
  {
    title: "Quantiter",
    dataIndex: "quantities",
    key: "key",
  },
];
