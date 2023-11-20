import { useQuery } from "@tanstack/react-query";
import { connectionString } from "@ts/db/connectionString";

export function useTables(schema: string) {
  const res = useQuery({
    enabled: schema !== undefined || schema !== null,
    queryKey: ["tables", schema],
    queryFn: async () => {
      await window.electronAPI.openDbConnectionIfNecessary(connectionString);
      const res: string = await window.electronAPI.queryDb({
        query: `
          SELECT *
          FROM information_schema.tables
          WHERE table_schema = $1::text
        `,
        queryParams: [schema],
      });
      if (!res) throw new Error("Failed to get schemas");
      const resJSON: TTablesResult = JSON.parse(res);
      return resJSON.rows;
    },
  });
  return {
    ...res,
    isLoading: res.isLoading || schema === undefined || schema === null,
  };
}

export interface TTablesResult {
  rows: TTablesRow[];
}

export interface TTablesRow {
  table_name: string;
  table_schema: string;
  table_type: string;
}
[];
