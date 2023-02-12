import React, { FunctionComponent } from "react";
import { InputNumber } from "antd";
import useDelay from "../../../hooks/useHookDelay";
import { Product } from "../../../pages/products/models/product.models";
import { useShoppingCartContext } from "../../../contexts/shoppingCart";

export interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  children: React.ReactNode;
  dataIndex: string;
  record: Product;
  update: (record: Product) => Product;
}

const EditableCell: FunctionComponent<EditableCellProps> = ({
  dataIndex,
  update,
  editing = false,
  children,
  record,
  ...props
}) => {
  const { product, setProduct } = useShoppingCartContext();
  const onChange = (value: number) =>
    setProduct({ ...record, shoppingCart: { id: record.shoppingCart?.id, quantities: value } });

  return (
    <td {...props}>
      {editing ? (
        <InputNumber
          keyboard={false}
          controls={false}
          name={dataIndex}
          defaultValue={product.shoppingCart?.quantities ?? record?.shoppingCart.quantities}
          value={product.shoppingCart?.quantities ?? record?.shoppingCart.quantities}
          className="mx-1 flex justify-center items-center"
          min={0}
          onChange={useDelay((value) => onChange(value ?? 0), 500)}
        />
      ) : (
        children
      )}
    </td>
  );
};

export default EditableCell;
