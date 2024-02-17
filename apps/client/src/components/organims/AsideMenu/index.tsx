import classNames from "classnames";
import { FunctionComponent } from "react";
import { Link, useLocation } from "react-router-dom";

interface AsideMenuProps {
    menu: string[];
    to: string;
}

const AsideMenu: FunctionComponent<AsideMenuProps> = ({ menu, to }) => {
    const location = useLocation();

    return (
        <aside className="sticky flex flex-col h-full mt-5 mr-5 top-20 w-36">
            <ul className="flex flex-col bg-white border rounded-md shadow-sm border-primary text-primary">
                {menu.map((menuName: string, index: number) => (
                    <Link
                        key={index}
                        to={to + `/${menuName.toLowerCase()}`}
                        className={classNames("px-2 py-1 hover:bg-primary hover:text-white", {
                            "bg-primary text-white": location.pathname.includes(menuName.toLowerCase()),
                            "bg-none text-primary": !location.pathname.includes(menuName.toLowerCase()),
                        })}
                    >
                        {menuName}
                    </Link>
                ))}
            </ul>
        </aside>
    );
};

export default AsideMenu;
