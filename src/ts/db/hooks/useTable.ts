import { useQuery } from "@tanstack/react-query";
import { connectionString } from "@ts/db/connectionString";

export function useTable(schemaName?: string, tableName?: string) {
  const enabled =
    schemaName !== null &&
    schemaName !== undefined &&
    tableName !== null &&
    tableName !== undefined;
  const res = useQuery({
    enabled,
    queryKey: ["table", schemaName, tableName],
    queryFn: async () => {
      await window.electronAPI.openDbConnectionIfNecessary(connectionString);
      const res: string = await window.electronAPI.queryDb({
        query: `SELECT * FROM ${schemaName}.${tableName} LIMIT 100`,
      });
      if (!res) throw new Error("Failed to get table");
      const resJSON: TTableResult = JSON.parse(res);
      console.log(resJSON);
      return resJSON;
    },
  });
  return {
    ...res,
    isLoading: res.isLoading || !enabled,
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
