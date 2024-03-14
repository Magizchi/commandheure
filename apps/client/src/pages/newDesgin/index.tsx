import AsideMenu from '@components/organims/AsideMenu';
import ProductsTemplate from '@components/templates/productsTemplate';
import { API } from '@constants/API';
import { ROUTES } from '@constants/Routes';
import { Select } from 'antd';
import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Dropdown from '@components/molecules/Dropdown';

const NewDesign = () => {
    const [menu, setmenu] = useState<string[]>([]);
    const [searchValue, setSearchValue] = useState<string>("");
    const [options, setOptions] = useState([]);
    const navigate = useNavigate();
    const { company, id } = useParams();

    console.log('header params', id, company);
    const onChange = async (value: string) => {
        setSearchValue(value);
        // const response = await axios("/api/products/site" + "/" + value);
    };

    const getSearchResult = async (search: string) => {
        const response = await axios(API.PRODUCTS, { params: { search } });
        setSearchValue(search);
        setOptions(response.data);
    };
    const getMenu = async () => {
        const response = await axios.get(API.MENU);
        setmenu(response.data);
    };

    React.useEffect(() => {
        getMenu();
    }, []);

    return <main className='flex'>
        <div className='flex flex-col max-w-64 *:ml-5 *:mb-10 h-full'>
            <header className='mt-3 p-3 rounded-xl'>
                <h1 className="">
                    <Link to={ROUTES.HEADECOEUR_PRODUCTS + '/alwadi'}>
                        <span className="font-extrabold text-main">Command</span>
                        <span className="font-extrabold text-white">&apos;Heure</span>
                    </Link>
                </h1>
                <p className='text-sm text-white'>La solution pour les entreprise sans site e-commerce</p>
            </header>
            <aside className='flex flex-col p-3 space-y-3 text-white'>
                <h2>Fournisseur</h2>
                <ul className='flex flex-col space-y-1 pl-2 *:p-1 *:rounded-md'>
                    <Dropdown title="Haudcoeur" />
                    <Dropdown title="Anju" />
                    {/* <Link className="hover:bg-gray-600 hover:opacity-75" to="/">
                        Haudcoeur
                    </Link> */}
                    {/* <AsideMenu menu={menu} to={ROUTES.HEADECOEUR_PRODUCTS} />
                    <Link className="hover:bg-gray-600 hover:opacity-75" to="/">
                        Anju
                    </Link> */}

                </ul>
            </aside>
        </div>
        <div className='mt-5 rounded-lg bg-gray-100 w-full mr-5'>
            <section className='container mx-auto mt-5'>
                <h2 className='text-2xl font-bold font-sans text-primary'>
                    {company?.toUpperCase()}
                </h2>

                <Select
                    placeholder="Recherche des produits..."
                    value={searchValue}
                    className="w-2/4"
                    onChange={onChange}
                    onSearch={getSearchResult}
                    options={options}
                />
            </section>
            <ProductsTemplate />
        </div>
    </main>;
};

export default NewDesign;