import { Table as TableAnt, TableProps as TableAntProps } from "antd";

interface TableProps<TItem extends object = {}> extends TableAntProps<TItem> {
  columns: any;
  data: TItem[];
}

const Table = <TItem extends object>({ columns, data, ...props }: TableProps<TItem>) => {
  return (
    <TableAnt
      columns={columns}
      dataSource={data}
      pagination={false}
      {...props}
    />
  );
};

export default Table;
