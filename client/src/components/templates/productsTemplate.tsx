import { useEffect, useState } from 'react';
import AsideMenu from "@components/organims/AsideMenu"
import { ROUTES } from "@constants/Routes";
import axios from 'axios';
import { API } from '@constants/API';
import { useParams } from 'react-router-dom';
import useArrayHook from '@hooks/useArray';
import ShowProducs from '@components/organims/ShowProducts';
import { TableProps } from 'antd';
import Table from '@components/organims/Table';
import InputNumber from '@components/atoms/inputs/inputNumber';
import { Product, ProductVariant } from '@pages/products/models/product.models';



const ProductsTemplate = () => {
    const [menu, setmenu] = useState<string[]>([]);
    const { array: products, save: saveProducts } = useArrayHook<Product>([]);
    const params = useParams();

    const getProducts = async () => {
        const response = await axios.get(API.PRODUCTS + `/${params.id}`);
        saveProducts(response.data);
    };

    const getMenu = async () => {
        const response = await axios.get(API.MENU);
        setmenu(response.data);
    };

    const setInShoppingCart = async (productVariantId: number, quantity: number) => {
        console.log('product', productVariantId, quantity)
        const response = await axios.post(API.SHOPPING_CART, { productId: productVariantId, quantities: quantity })
        console.log(response)
    }

    useEffect(() => {
        if (menu.length === 0) getMenu();
        getProducts();
    }, [params]);

    return (
        <section className="container flex justify-between mx-auto">
            <AsideMenu menu={menu} to={ROUTES.HEADECOEUR_PRODUCTS} />
            <div className="flex flex-col flex-grow mt-6 gap-5">
                {products.map((product, index) => <ShowProducs key={index} onChange={setInShoppingCart} {...product} index={index} register={undefined} />)}
            </div>
            <div className="sticky top-20 h-full flex flex-grow mt-6 gap-5 ml-5">
                <Table className="w-full" columns={columns} data={[]} />
            </div>
        </section>
    )
}

const columns: TableProps<ProductVariant>['columns'] = [
    {
        title: 'Nom',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Volume',
        dataIndex: 'volume',
        key: 'volume',
    },
    {
        title: 'PCB',
        dataIndex: 'pcb',
        key: 'pcb',
    },
    {
        title: 'Code',
        dataIndex: 'code',
        key: 'code',
    },
    {
        title: 'Quantité',
        dataIndex: 'quantity',
        key: 'quantity',
        render: () => {
            return <InputNumber />
        }
    }
];

export default ProductsTemplate