import { TRow } from "@components/dataGrid/DataGridQ";
import { getGridColsAndRowsFromTableResult } from "@components/dataGrid/helpers";
import { useQuery } from "@tanstack/react-query";
import { connectionString } from "@ts/db/connectionString";
import { useEffect, useState } from "react";
import { Column } from "react-data-grid";

export function useTable({
  schemaName,
  tableName,
}: {
  schemaName?: string;
  tableName?: string | null;
}) {
  const { data, ...rest } = useQuery({
    queryKey: ["table", schemaName, tableName],
    queryFn: async () => {
      if (
        schemaName === undefined ||
        tableName === undefined ||
        tableName === null
      )
        return null;
      await window.electronAPI.openDbConnectionIfNecessary(connectionString);
      const res: string = await window.electronAPI.queryDb({
        query: `SELECT * FROM ${schemaName}.${tableName} LIMIT 100`,
      });
      if (!res) throw new Error("Failed to get table");
      const resJSON: TTableResult = JSON.parse(res);
      return resJSON;
    },
  });

  const { cols: initColumns, rows: initRows } =
    getGridColsAndRowsFromTableResult({
      data,
    });

  const [columns, setColumns] = useState<Column<TRow, any>[]>(initColumns);
  const [rows, setRows] = useState<any[]>(initRows);

  useEffect(() => {
    const { cols, rows } = getGridColsAndRowsFromTableResult({
      data,
    });
    setColumns(cols);
    setRows(rows);
  }, [data]);

  return {
    ...rest,
    data,
    columns,
    rows,
  };
}

export interface TTableResult {
  rows: Record<string, any>[];
  fields: TTableField[];
}

export interface TTableField {
  columnID: number;
  name: string;
  dataTypeId: number;
  dataTypeSize: number;
  format: string;
}
