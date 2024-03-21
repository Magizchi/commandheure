import { TableProps } from "antd";
import axios from "axios";
import { useEffect } from "react";
import Button from "@components/atoms/Button";
import Table from "@components/organims/Table";
import { API } from "@constants/API";
import useArrayHook from "@hooks/useArray";
import { ProductVariant } from "@pages/products/models/product.models";
import ExportCSV from "../../utils/exportCsv";
import MainLayout from "@layouts/MainLayout";
import { useParams } from "react-router-dom";

const ShoppingCartPage = () => {
  const { array: products, set } = useArrayHook<ProductVariant>([]);
  const { company } = useParams();

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
    <MainLayout>
      <section className="container mx-auto space-y-5">
        <h2 className="text-xl text-primary font-bold mt-10">
          Commande {company?.toUpperCase()}
        </h2>
        <Table
          size="small"
          data={products}
          columns={columns}
          className="!mt-5 !w-full"
        />
        <div className="flex justify-end">
          <Button
            onClick={() => GetCSVFile()}
            className="!my-5 bg-primary text-white border-2 border-primary hover:bg-stars-300 hover:text-primary"
          >
            Télécharger CSV
          </Button>
        </div>
      </section>
    </MainLayout>
  );
};

export default ShoppingCartPage;
