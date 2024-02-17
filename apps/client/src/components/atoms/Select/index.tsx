import { FunctionComponent } from "react";
import { Select as SelectAnt, SelectProps as SelectAntProps } from "antd";

interface SelectProps extends SelectAntProps {
  options: { label: string; value: string }[];
  onChange: (value: string) => void;
  onSearch: (value: string) => void;
}

const Select: FunctionComponent<SelectProps> = ({ options, onChange, onSearch, ...props }) => (
  <SelectAnt
    showSearch
    placeholder="Select a person"
    optionFilterProp="children"
    onChange={onChange}
    onSearch={onSearch}
    // filterOption={(input, option) => (option?.label ?? "")?.toLowerCase().includes(input.toLowerCase())}
    options={options}
    {...props}
  />
);

export default Select;
