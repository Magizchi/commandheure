import { useEffect, useState } from 'react';
import axios from 'axios';
import { API } from '@constants/API';
import { useParams, useSearchParams } from 'react-router-dom';
import useArrayHook from '@hooks/useArray';
import ShowProducs from '@components/organims/ShowProducts';
import { Spin, TableProps } from 'antd';
import Table from '@components/organims/Table';
import { Product, ProductVariant } from '@pages/products/models/product.models';
import Button from '@components/atoms/Button';
import { ArrowUpOutlined } from "@ant-design/icons";

const ProductsTemplate = () => {
    const { array: products, save: saveProducts } = useArrayHook<Product>([]);
    const { save: saveShoppingCart, show } = useArrayHook<ProductVariant>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const { id } = useParams();
    const [searchParams] = useSearchParams();

    const getProducts = async () => {
        const response = await axios.get(API.PRODUCTS + `/${id}`, { params: { search: searchParams.get('search') } });
        saveProducts(response.data);
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

    const goToTop = () => {
        const rootElement = document.documentElement;
        rootElement.scrollTo({ top: 0, behavior: "smooth" });
    };

    useEffect(() => {
        getShoppingCart();
    }, []);

    useEffect(() => {
        getProducts();
        setLoading(false);
    }, [id, searchParams]);

    if (loading) {
        return <div className="fixed top-[50%] right-[50%]"><Spin size='large' /></div>;
    }
    return (
        <section className="container flex justify-between mx-auto space-x-5 mb-5 relative">
            <div className="flex flex-col flex-grow mt-6 gap-5 space-y-3 scroll-smooth">
                <h3 className="text-xl bg-gray-100 font-bold uppercase text-primary">{id?.toUpperCase()}</h3>
                {products.map((product, index) => <ShowProducs key={index} onChange={setInShoppingCart} {...product} index={index} register={undefined} />)}
            </div>
            <div className="sticky top-20 h-full flex flex-col flex-grow mt-6 gap-5 space-y-3">
                <h3 className="sticky top-20 z-50 text-xl uppercase text-primary font-bold">Commande en cours...</h3>
                <Table className="w-full" columns={columns} data={show(10)} />
            </div>
            <div className='absolute bottom-0 right-0'>
                <Button onClick={() => goToTop()} className='flex justify-center items-center'><ArrowUpOutlined /></Button>
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