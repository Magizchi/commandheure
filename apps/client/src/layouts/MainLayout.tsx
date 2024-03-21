import { API } from '@constants/API';
import { ROUTES } from '@constants/Routes';
import axios from 'axios';
import React, { FunctionComponent, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import DropMenu from '@components/molecules/Dropmenu';

interface MainlayoutProps {
    children: React.ReactNode;
}

const Mainlayout: FunctionComponent<MainlayoutProps> = ({ children }) => {
    const [menu, setmenu] = useState<{ name: string; categories: string[]; }[]>([]);
    const location = useLocation();

    const getMenu = async () => {
        const response = await axios.get(API.MENU);
        setmenu(response.data);
    };

    React.useEffect(() => {
        getMenu();
    }, []);

    return (
        <main className='flex min-h-screen pb-5'>
            <div className='flex flex-col max-w-64 *:ml-5 *:mb-10 h-full'>
                <header className='mt-3 p-3 rounded-xl'>
                    <h1>
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
                            menu.map((each) => <DropMenu key={each.name} title={each.name} menu={each.categories} location={location} />)
                        }
                    </ul>
                </aside>
            </div>
            <div className='relative mt-5 rounded-lg bg-gray-100 w-full mr-5'>
                {children}
            </div>
        </main>);
};

export default Mainlayout;