import React, { useEffect, useState } from "react";
import { InputNumber } from "antd";
import { useShoppingCartContext } from "../../../contexts/shoppingCart";
import Button from "../../atoms/Button";
import { PlusOutlined } from "@ant-design/icons";
import { Product } from "../../../pages/products/models/product.models";

export interface EditableCellProps {
  title: React.ReactNode;
  editable: boolean;
  children: React.ReactNode;
  dataIndex: keyof Product;
  record: Product;
  handleSave: (record: Product) => void;
}

const EditableCell: React.FC<EditableCellProps> = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const { saveProduct } = useShoppingCartContext();
  const [value, setValue] = useState<number>(record ? record.quantities : 0);
  const [editing, setEditing] = useState(true);
  const toggleEdit = () => {
    setEditing(!editing);
  };
  // console.log("record", record);

  const onChange = (value: any) => {
    setValue(value);
    saveProduct({ ...record, quantities: value });
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <div className="flex">
        <Button className="mx-1 flex justify-center items-center" onClick={() => onChange(value - 5)}>
          -5
        </Button>
        <Button className="mx-1 flex justify-center items-center" onClick={() => onChange(value - 1)}>
          -1
        </Button>
        <InputNumber
          name={dataIndex}
          defaultValue={value === 0 ? undefined : value}
          value={value}
          className="mx-1 flex justify-center items-center"
          min={0}
          onChange={onChange}
        />
        <Button
          className="mx-1 flex justify-center items-center"
          onClick={() => onChange(value + 1)}
          icon={
            <div className="mx-1 flex justify-center items-center">
              <PlusOutlined />
            </div>
          }
        />
        <Button
          className="mx-1 flex justify-center items-center"
          onClick={() => onChange(value + 5)}
          icon={
            <div className="mx-1 flex justify-center items-center">
              <PlusOutlined />
              <PlusOutlined />
            </div>
          }
        />
      </div>
    ) : (
      <div className="editable-cell-value-wrap" style={{ paddingRight: 24 }} onClick={toggleEdit}>
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

export default EditableCell;
