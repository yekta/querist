import { useQuery } from "@tanstack/react-query";
import { connectionString } from "@ts/db/connectionString";

export function useSchemaTables(schemaName: string | undefined) {
  const res = useQuery({
    queryKey: ["schema-tables", schemaName],
    queryFn: async () => {
      await window.electronAPI.openDbConnectionIfNecessary(connectionString);
      const res: string = await window.electronAPI.queryDb({
        query: `
          SELECT *
          FROM information_schema.tables
          WHERE table_schema = $1::text
        `,
        queryParams: [schemaName],
      });
      if (!res) throw new Error("Failed to get schemas");
      const resJSON: TTablesResult = JSON.parse(res);
      return resJSON.rows;
    },
  });
  return {
    ...res,
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
