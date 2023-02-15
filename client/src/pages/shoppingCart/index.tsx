import { Typography } from "antd";
import { ColumnsType } from "antd/lib/table";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "../../components/atoms/Button";
import Table from "../../components/organims/Table";
import EditableCell from "../../components/organims/Table/EditableCell";
import { API } from "../../constants/API";
import { useShoppingCartContext } from "../../contexts/shoppingCart";
import useArrayHook from "../../hooks/useArray";
import { Product } from "../products/models/product.models";

const ShoppingCartPage = () => {
  const { product, setProduct } = useShoppingCartContext();
  const { array: products, set, update } = useArrayHook<Product>([]);
  const [editingKey, setEditingKey] = useState<number>(0);

  const getShoppingList = async () => {
    const { data } = await axios.get(API.SHOPPING_CART);
    set(data);
  };

  useEffect(() => {
    getShoppingList();
  }, []);

  const isEditing = (record: Product) => record.key === editingKey;
  const edit = (record: Product) => setEditingKey(record.key);
  const removeProduct = async (record: Product) => {
    const response = await axios.delete(API.SHOPPING_CART + "/" + record.shoppingCart.id);
    if (response.status === 200) {
      getShoppingList();
    }
  };
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
      width: "20em",
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
      title: "Quantité",
      dataIndex: "shoppingCart",
      key: "key",
      width: "8em",
      onCell: (record: Product) => ({
        record,
        dataIndex: "quantities",
        title: "quantities",
        editing: isEditing(record),
        update,
      }),
      render: (text) => <p>{text.quantities}</p>,
    },
    {
      title: "operation",
      dataIndex: "operation",
      width: "8em",
      render: (_: any, record: Product) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => {
                update(product);
                setEditingKey(0);
              }}
              style={{ marginRight: 8 }}
            >
              Sauvegarder
            </Typography.Link>
            <a onClick={() => [setEditingKey(0), setProduct({} as Product)]}>Annuler</a>
          </span>
        ) : (
          <>
            <Typography.Link disabled={editingKey !== 0} onClick={() => edit(record)}>
              Changer
            </Typography.Link>
            <Typography.Link
              onClick={() => {
                removeProduct(record);
              }}
              style={{ marginRight: 8 }}
              className="!ml-2"
            >
              Supprimer
            </Typography.Link>
          </>
        );
      },
    },
  ];

  return (
    <section className="container mx-auto">
      <Button>Sauvegarder</Button>
      <Table
        size="small"
        components={{ body: { cell: EditableCell } }}
        rowClassName={() => "editable-row"}
        data={products}
        columns={columns}
        total={products.length}
      />
    </section>
  );
};

export default ShoppingCartPage;
