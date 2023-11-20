import { useQuery } from "@tanstack/react-query";

export function useSchemas() {
  const res = useQuery({
    queryKey: ["schemas"],
    queryFn: async () => {
      const res: string = await window.electronAPI.queryDb({
        connectionString: "connection string",
        query: "SELECT schema_name FROM information_schema.schemata",
      });
      if (!res) throw new Error("Failed to get schemas");
      const resJSON: {
        rows: { schema_name: string }[];
      } = JSON.parse(res);
      return resJSON.rows.map((row) => row.schema_name);
    },
  });
  return res;
}
