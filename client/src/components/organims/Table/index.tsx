import React, { FunctionComponent } from "react";
import { Table as TableAnt } from "antd";
import { ColumnsType } from "antd/es/table";

interface TableProps<TItem extends object = {}> {
  columns: ColumnsType<TItem>;
  data: TItem[];
}

const Table = <TItem extends object>({ columns, data }: TableProps<TItem>) => (
  <TableAnt columns={columns} dataSource={data} />
);

export default Table;
