import classNames from 'classnames';
import { FunctionComponent } from 'react';
import { Link, Location } from 'react-router-dom';

interface DropmenuProps {
    title: string;
    menu: readonly string[];
    location: Location;
}
const Dropmenu: FunctionComponent<DropmenuProps> = ({ title, menu, location }) => {
    return (
        <li className='space-y-2'>
            <p className={classNames("w-full", {
                "transform after:divide-gray-300 after:border-2 after:absolute after:-bottom-1 after:left-0 after:rounded-s-xl after:w-full ": location.pathname.includes(title.toLocaleLowerCase())
            })}>
                {title}
            </p>
            <ul className="flex flex-col space-y-1 ml-5 w-full">
                {
                    menu.map((item, index) =>
                        <Link
                            key={index}
                            to={`/${title.toLowerCase()}/products/${item.toLowerCase()}`}
                            className={classNames("hover:bg-gray-300 hover:rounded-s-xl hover:text-primary p-1 w-full", {
                                "bg-gray-100 text-primary flex flex-row !rounded-s-xl": location.pathname.includes(item.toLowerCase()),
                                "bg-none text-white": !location.pathname.includes(item.toLowerCase()),
                            })}>
                            {item}
                        </Link>)
                }
            </ul>
        </li >
    );
};

export default Dropmenu; 