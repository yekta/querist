import { useQuery } from "@tanstack/react-query";
import { connectionString } from "@ts/db/connectionString";

export function useTable({
  schemaName,
  tableName,
}: {
  schemaName?: string;
  tableName?: string | null;
}) {
  const res = useQuery({
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
  return {
    ...res,
  };
}

export interface TTableResult {
  rows: any[];
  fields: TTableField[];
}

export interface TTableField {
  columnID: number;
  name: string;
  dataTypeId: number;
  dataTypeSize: number;
  format: string;
}
