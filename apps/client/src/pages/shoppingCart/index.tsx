import { TableProps } from "antd";
import axios from "axios";
import { useEffect } from "react";
import Button from "@components/atoms/Button";
import Table from "@components/organims/Table";
import { API } from "@constants/API";
import useArrayHook from "@hooks/useArray";
import { ProductVariant } from "@pages/products/models/product.models";
import ExportCSV from "../../utils/exportCsv";

const ShoppingCartPage = () => {
  const { array: products, set } = useArrayHook<ProductVariant>([]);

  const getShoppingList = async () => {
    const { data } = await axios.get(API.SHOPPING_CART);
    set(data);
  };

  useEffect(() => {
    getShoppingList();
  }, []);

  const GetCSVFile = async () => {
    const response = await axios.get(API.SHOPPING_CART_CSV);
    ExportCSV(response.data);
  };

  const columns: TableProps<ProductVariant>['columns'] = [
    {
      title: 'Nom',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Volume',
      dataIndex: 'weight',
      key: 'weight',
    },
    {
      title: 'PCB',
      dataIndex: 'quantity_per_box',
      key: 'quantity_per_box',
    },
    {
      title: 'Code',
      dataIndex: 'code_supplier',
      key: 'code_supplier',
    },
    {
      title: 'Quantité',
      dataIndex: 'quantity',
      key: 'quantity',
    }
  ];

  return (
    <section className="container mx-auto flex flex-col items-end">
      <Table
        size="small"
        data={products}
        columns={columns}
        className="!mt-5 !w-full"
      />
      <Button
        onClick={() => GetCSVFile()}
        className="!my-5 bg-primary text-white border-2 border-primary hover:bg-stars-300 hover:text-primary"
      >
        Télécharger CSV
      </Button>
    </section>
  );
};

export default ShoppingCartPage;
