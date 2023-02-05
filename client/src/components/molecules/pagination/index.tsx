import React, { FunctionComponent, useEffect, useState } from "react";
import { Pagination as PaginationAnt, PaginationProps as PaginationAntProps } from "antd";
import { useSearchParams } from "react-router-dom";

interface PaginationProps extends PaginationAntProps {}
const Pagination: FunctionComponent<PaginationProps> = ({ ...props }) => {
  const [searchParams, setParams] = useSearchParams();

  const [pagination, setPagination] = useState({
    page: +searchParams.get("page")! ?? 1,
    defaultPageSize: +searchParams.get("size")! ?? 20,
  });

  useEffect(() => {
    setPagination((curr) => ({
      ...curr,
      page: +searchParams.get("page")!,
      defaultPageSize: +searchParams.get("size")!,
    }));
  }, [searchParams]);

  const onChange = (pagination: any, pageSize: any) => {
    setPagination((curr) => ({ ...curr, page: pagination, defaultPageSize: pageSize }));
    setParams(`size=${pageSize}&page=${pagination}`);
  };

  return <PaginationAnt defaultPageSize={pagination.defaultPageSize} onChange={onChange} {...props} />;
};

export default Pagination;
