import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Select from "@components/atoms/Select";
import { API } from "@constants/API";
import { ShoppingCartOutlined } from "@ant-design/icons";
import Button from "@components/atoms/Button";
import { ROUTES } from "@constants/Routes";

const Header = (): JSX.Element => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [options, setOptions] = useState([]);
  const navigate = useNavigate();

  const onChange = async (value: string) => {
    setSearchValue(value);
    const response = await axios("/api/products/site" + "/" + value);
  };

  const getSearchResult = async (search: string) => {
    const response = await axios(API.PRODUCTS, { params: { search } });
    setSearchValue(search);
    setOptions(response.data);
  };

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between bg-white border-b-2 shadow-md h-14 border-primary">
      <h1 className="px-10">
        <Link to={ROUTES.HEADECOEUR_PRODUCTS + '/alwadi'}>
          <span className="pr-1 font-extrabold text-primary">Le</span>
          <span className="font-extrabold text-main">Command</span>
          <span className="font-extrabold text-primary">&apos;Heure</span>
        </Link>
      </h1>
      <div className="flex justify-center p-10 w-full">
        <Select
          value={searchValue}
          className="!min-w-[30%]"
          onChange={onChange}
          onSearch={getSearchResult}
          options={options}
        />
      </div>
      <Button
        className="flex justify-center items-center"
        type="default"
        icon={<ShoppingCartOutlined />}
        // loading={loadings[2]}
        onClick={() => navigate("/panier")}
      />
    </header>
  );
};

export default Header;
