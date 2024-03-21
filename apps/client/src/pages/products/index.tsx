import MySelect from "@components/molecules/MySelect";
import ProductsTemplate from "@components/templates/productsTemplate";
import { API } from "@constants/API";
import { ROUTES } from "@constants/Routes";
import MainLayout from "@layouts/MainLayout";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ShoppingCartOutlined } from "@ant-design/icons";

const ProductsPage = () => {
    const { company } = useParams();
    const navigate = useNavigate();

    const getSearchResult = async (search: string) => {
        const response = await axios(API.PRODUCTS, { params: { search } });
        return response.data.map((item: { title: any; code_supplier: number; }) => ({ label: item.title, value: item.code_supplier, ...item }));
    };

    const onSelect = (item: any) => {
        if (item) {
            return navigate(ROUTES.HEADECOEUR_PRODUCTS + `/${item.category.name.toLowerCase()}?search=${item.title.toLowerCase()}`);
        }
    };

    return (
        <MainLayout>
            <section className='container mx-auto mt-5 flex flex-col mb-10'>
                <div className="flex justify-between mb-5">
                    <h2 className='text-2xl font-bold font-sans text-primary'>
                        {company?.toUpperCase()}
                    </h2>
                    <Link className="border border-primary text-white bg-primary p-2 rounded-lg " to={ROUTES.HEADECOEUR_SHOPPING_CART}><ShoppingCartOutlined /></Link >
                </div>
                <div className='flex'>
                    <MySelect myOnChange={getSearchResult} className="w-1/2 mr-5" blurLeSelect={onSelect} placeholder="Rechercher le produit..." />
                </div>
            </section>
            <ProductsTemplate />
        </MainLayout>
    );
};

export default ProductsPage;