import { useQuery } from "@tanstack/react-query";

export function useSchemas() {
  const res = useQuery({
    queryKey: ["schemas"],
    queryFn: async () => {
      const res: string[] = await window.electronAPI.getSchemas(
        "postgres url goes here"
      );
      if (!res) throw new Error("Failed to get schemas");
      return res;
    },
  });
  return res;
}
