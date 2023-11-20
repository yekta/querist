import { useQuery } from "@tanstack/react-query";
import { connectionString } from "@ts/db/connectionString";

export function useTables(schema: string) {
  const res = useQuery({
    enabled: schema !== undefined || schema !== null,
    queryKey: ["tables", schema],
    queryFn: async () => {
      const res: string = await window.electronAPI.queryDb({
        connectionString,
        query: `
          SELECT *
          FROM information_schema.tables
          WHERE table_schema = $1::text
        `,
        queryParams: [schema],
      });
      if (!res) throw new Error("Failed to get schemas");
      const resJSON: TResult = JSON.parse(res);
      return resJSON.rows;
    },
  });
  return { ...res };
}

interface TResult {
  rows: { table_name: string; table_schema: string; table_type: string }[];
}
