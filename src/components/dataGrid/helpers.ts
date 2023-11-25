import { TRow, renderCell } from "@components/dataGrid/DataGridQ";
import { TTableResult } from "@ts/db/hooks/useTable";
import { Column, SelectColumn } from "react-data-grid";

export function getGridColsFromTableResult({
  data,
  hasSelect = true,
}: {
  data: TTableResult;
  hasSelect?: boolean;
}): Column<TRow, any>[] {
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
}: {
  data: TTableResult;
}): any[] {
  return (
    data?.rows?.map((r, i) => ({
      ...r,
      id: r.id || `row-${i}`,
    })) || []
  );
}
