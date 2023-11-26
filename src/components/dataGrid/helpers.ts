import { TRow, renderCell } from "@components/dataGrid/DataGridQ";
import { TTableResult } from "@ts/db/hooks/useTable";
import { Column, SelectColumn } from "react-data-grid";

export function getGridColsAndRowsFromTableResult({
  data,
  hasSelect = true,
}: TGridColsAndRowsFromTableProps) {
  return {
    rows: getGridRowsFromTableResult({ data }),
    cols: getGridColsFromTableResult({ data, hasSelect }),
  };
}

export function getGridColsFromTableResult({
  data,
  hasSelect = true,
}: TGridColsFromTableProps): Column<TRow, any>[] {
  let arr: Column<TRow, any>[] = [];
  if (hasSelect && data?.fields) arr.push({ ...SelectColumn });
  if (data?.fields)
    arr = arr.concat(
      data?.fields.map((f, i) => ({
        key: f.name,
        ...f,
        frozen: i === 0,
        resizable: true,
        renderCell,
      }))
    );
  return arr;
}

export function getGridRowsFromTableResult({
  data,
}: TGridRowsFromTableProps): any[] {
  return (
    data?.rows?.map((r, i) => ({
      ...r,
      id: r.id || `row-${i}`,
    })) || []
  );
}

type TGridRowsFromTableProps = {
  data: TTableResult;
};

type TGridColsFromTableProps = {
  data: TTableResult;
  hasSelect?: boolean;
};

export type TGridColsAndRowsFromTableProps = TGridRowsFromTableProps &
  TGridColsFromTableProps;
