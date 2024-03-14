import axios from "axios";
import React, { FunctionComponent, useState } from "react";
import { API } from "@constants/API";
import { ROUTES } from "@constants/Routes";
import Header from "./Header";
import AsideMenu from "@components/organims/AsideMenu";

const MainLayout: FunctionComponent<{ children: React.ReactNode; }> = ({ children }) => {
  const [menu, setmenu] = useState<string[]>([]);

  const getMenu = async () => {
    const response = await axios.get(API.MENU);
    setmenu(response.data);
  };

  React.useEffect(() => {
    getMenu();
  }, []);

  return (
    <>
      <Header />
      <main className="container flex justify-between mx-auto">
        <aside className="sticky flex flex-col h-full mt-20 mr-5 top-20 w-36">
          <AsideMenu menu={menu} to={ROUTES.HEADECOEUR_PRODUCTS} />
        </aside>
        <div className="mt-6 w-full">{children}</div>
      </main>
    </>
  );
};

export default MainLayout;
