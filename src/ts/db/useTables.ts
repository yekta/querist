import { useQuery } from "@tanstack/react-query";
import { connectionString } from "@ts/db/connectionString";

export function useTables(schemaName: string | null) {
  const res = useQuery({
    queryKey: ["tables", schemaName],
    queryFn: async () => {
      const res: string = await window.electronAPI.queryDb({
        connectionString,
        query: `
          SELECT table_name
          FROM information_schema.tables
          WHERE table_schema = $1::text
        `,
        queryParams: [schemaName],
      });
      if (!res) throw new Error("Failed to get schemas");
      const resJSON: { rows: { table_name: string }[] } = JSON.parse(res);
      return resJSON.rows.map((row) => row.table_name);
    },
  });
  return { ...res, isLoading: res.isLoading || !schemaName };
}
