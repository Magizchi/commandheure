import axios from "axios";
import classNames from "classnames";
import React, { FunctionComponent, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { API } from "../constants/API";
import { ROUTES } from "../constants/Routes";

const Layout: FunctionComponent<{ children: React.ReactNode }> = ({ children }) => {
  const [menu, setmenu] = useState<string[]>([]);
  const location = useLocation();

  const getMenu = async () => {
    const response = await axios.get(API.MENU);
    setmenu(response.data);
  };

  React.useEffect(() => {
    getMenu();
  }, []);

  return (
    <div className="container flex justify-between mx-auto">
      <aside className="sticky flex flex-col h-full mt-20 mr-5 top-20 w-36">
        <ul className="flex flex-col bg-white border rounded-md shadow-sm border-primary text-primary">
          {menu.map((data: string, index: number) => (
            <Link
              key={index}
              to={ROUTES.PRODUCTS + `/${data.toLowerCase()}?size=20&page=1`}
              className={classNames("px-2 py-1 hover:bg-primary hover:text-white", {
                "bg-primary text-white": location.pathname.includes(data.toLowerCase()),
                "bg-none text-primary": !location.pathname.includes(data.toLowerCase()),
              })}
            >
              {data}
            </Link>
          ))}
        </ul>
      </aside>
      <main className="mt-6 w-full">{children}</main>
    </div>
  );
};

export default Layout;
