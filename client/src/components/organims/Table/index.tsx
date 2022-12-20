import React, { FunctionComponent } from "react";
import { Table as TableAnt, TableProps as TableAntProps } from "antd";
import { ColumnsType } from "antd/es/table";

interface TableProps<TItem extends object = {}> extends TableAntProps<TItem> {
  columns: ColumnsType<TItem>;
  data: TItem[];
}

const Table = <TItem extends object>({ columns, data, ...props }: TableProps<TItem>) => (
  <TableAnt columns={columns} dataSource={data} {...props} />
);

export default Table;
