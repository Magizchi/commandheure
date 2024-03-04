import { useEffect, useState } from 'react';
import AsideMenu from "@components/organims/AsideMenu";
import { ROUTES } from "@constants/Routes";
import axios from 'axios';
import { API } from '@constants/API';
import { useParams } from 'react-router-dom';
import useArrayHook from '@hooks/useArray';
import ShowProducs from '@components/organims/ShowProducts';
import { TableProps } from 'antd';
import Table from '@components/organims/Table';
import { Product, ProductVariant } from '@pages/products/models/product.models';
import Link from '@components/atoms/Link';


const ProductsTemplate = () => {
    const [menu, setmenu] = useState<string[]>([]);
    const { array: products, save: saveProducts } = useArrayHook<Product>([]);
    const { array: shoppingCart, save: saveShoppingCart, show } = useArrayHook<ProductVariant>([]);
    const params = useParams();

    const getProducts = async () => {
        const response = await axios.get(API.PRODUCTS + `/${params.id}`);
        saveProducts(response.data);
    };

    const getMenu = async () => {
        const response = await axios.get(API.MENU);
        setmenu(response.data);
    };

    const getShoppingCart = async () => {
        const response = await axios.get(API.SHOPPING_CART + '?take=10');
        saveShoppingCart(response.data);
    };

    const setInShoppingCart = async (productId: number, quantity: number) => {
        const response = await axios.post(API.SHOPPING_CART, { productId, quantity });
        if (response.data.product) {
            getShoppingCart();
        }
    };

    useEffect(() => {
        if (menu.length === 0) getMenu();
        if (shoppingCart.length === 0) getShoppingCart();
        getProducts();
    }, [params]);

    return (
        <section className="container flex justify-between mx-auto space-x-5">
            <AsideMenu menu={menu} to={ROUTES.HEADECOEUR_PRODUCTS} />
            <div className="flex flex-col flex-grow mt-6 gap-5 space-y-3">
                <h2 className="text-2xl bg-gray-100 font-bold uppercase text-primary">{params.id?.toUpperCase()}</h2>
                {products.map((product, index) => <ShowProducs onChange={setInShoppingCart} {...product} index={index} register={undefined} />)}
            </div>
            <div className="sticky top-20 h-full flex flex-col flex-grow mt-6 gap-5">
                <h2 className="sticky top-20 z-50 text-2xl uppercase text-primary font-bold">panier</h2>
                <Table className="w-full" columns={columns} data={show(10)} />
                <Link href={ROUTES.SHOPPING_CART} className='min-w-24 max-w-48 border-2 border-primary bg-primary text-white text-center p-auto rounded-md hover:bg-stars-500'>Visualiser panier</Link>
            </div>
        </section>
    );
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

export default ProductsTemplate;