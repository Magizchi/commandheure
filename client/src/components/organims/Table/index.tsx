import React, { useEffect, useState } from "react";
import { Table as TableAnt, TableProps as TableAntProps } from "antd";
import { ColumnsType, TablePaginationConfig } from "antd/es/table";
import { useSearchParams } from "react-router-dom";

interface TableProps<TItem extends object = {}> extends TableAntProps<TItem> {
  columns: ColumnsType<TItem>;
  data: TItem[];
  total: number;
}

const Table = <TItem extends object>({ columns, data, total, ...props }: TableProps<TItem>) => {
  const [searchParams, setParams] = useSearchParams();
  const [pagination, setPagination] = useState({
    page: +searchParams.get("page")! ?? 1,
    defaultPageSize: +searchParams.get("size")! ?? 20,
    position: ["topRight", "bottomRight"],
  });

  useEffect(() => {
    setPagination((curr) => ({
      ...curr,
      page: +searchParams.get("page")!,
      defaultPageSize: +searchParams.get("size")!,
    }));
  }, [searchParams]);

  const onChange = (pagination: TablePaginationConfig) => {
    setPagination((curr) => ({ ...curr, page: +pagination.current!, defaultPageSize: pagination.defaultPageSize! }));
    setParams(`size=${pagination.pageSize}&page=${pagination.current}`);
  };

  return (
    <TableAnt
      columns={columns}
      dataSource={data}
      onChange={onChange}
      pagination={{
        defaultPageSize: pagination.defaultPageSize,
        pageSize: pagination.defaultPageSize,
        total: total,
        defaultCurrent: pagination.page,
        current: pagination.page,
        position: ["topRight", "bottomRight"],
      }}
      {...props}
    />
  );
};

export default Table;
