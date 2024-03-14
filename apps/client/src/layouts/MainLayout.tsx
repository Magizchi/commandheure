import { API } from '@constants/API';
import { ROUTES } from '@constants/Routes';
import { Select } from 'antd';
import axios from 'axios';
import React, { FunctionComponent, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import Dropdown from '@components/molecules/Dropdown';

interface MainlayoutProps {
    children: React.ReactNode;
}

const Mainlayout: FunctionComponent<MainlayoutProps> = ({ children }) => {
    const [menu, setmenu] = useState<{ name: string; categories: string[]; }[]>([]);

    const { company } = useParams();
    const location = useLocation();
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
                <p className='text-sm text-white'>La solution pour les entreprises sans site e-commerce</p>
            </header>
            <aside className='flex flex-col space-y-3 text-white'>
                <h2>Fournisseur</h2>
                <ul className='flex flex-col pl-2 space-y-4'>
                    {
                        menu.map((each) => <Dropdown key={each.name} title={each.name} menu={each.categories} location={location} />)
                    }
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
                    // value={searchValue}
                    className="w-2/4"
                // onChange={onChange}
                // onSearch={getSearchResult}
                // options={options}
                />
            </section>
            {children}
        </div>
    </main>;
};

export default Mainlayout;