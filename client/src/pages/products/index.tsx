import { ColumnsType } from "antd/es/table";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Table from "../../components/organims/Table";
import { API } from "../../constants/API";
import { Products } from "./models/product.models";

const ProductsPage = () => {
  const [products, setProducts] = useState<Products[]>([]);
  const params = useParams();
  console.log("prod", products);

  const getProducts = async () => {
    const response = await axios.get(API.PRODUCTS_PER_CATEGORY + params.id);
    setProducts(response.data);
  };

  useEffect(() => {
    getProducts();
  }, [params.id]);

  return (
    <section className="w-full bg-red-500 mx-auto">
      <Table columns={columns} data={products} />
    </section>
  );
};

const columns: ColumnsType<Products> = [
  {
    title: "code Fournisseur",
    dataIndex: "code_supplier",
    key: "code_supplier",
    width: "8em",
  },
  {
    title: "Nom du produit",
    dataIndex: "name",
    key: "name",
    width: "100%",
  },
  {
    title: "PCB",
    dataIndex: "quantity_per_box",
    key: "quantity_per_box",
    width: "8em",
  },
  {
    title: "Marque",
    dataIndex: "brand",
    key: "brand",
    width: "8em",
  },
];

export default ProductsPage;
