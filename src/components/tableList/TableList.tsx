import { TableListEmptyView } from "@components/tableList/TableListEmptyView";
import {
  TableListItem,
  TableListItemPlaceholder,
} from "@components/tableList/TableListItem";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { TTablesRow } from "@ts/db/hooks/useSchemaTables";

export function TableList({
  isError,
  isLoading,
  data,
  selectedTable,
  setSelectedTable,
}: {
  isError: boolean;
  isLoading: boolean;
  data: TTablesRow[];
  selectedTable: string | null;
  setSelectedTable: (table: string) => void;
}) {
  if (isError)
    return <TableListEmptyView text="Error" Icon={ExclamationTriangleIcon} />;

  if (isLoading)
    return (
      <div className="w-full flex flex-col animate-pulse duration-1000">
        {Array.from({ length: 8 }).map((_, i) => (
          <TableListItemPlaceholder key={i} />
        ))}
      </div>
    );

  if (data && data.length === 0)
    return <TableListEmptyView text="No tables found" />;

  return (
    data &&
    data.length > 0 &&
    data.map((t, i) => (
      <TableListItem
        isSelected={t.table_name === selectedTable}
        key={t.table_name}
        tableName={t.table_name}
        setTable={setSelectedTable}
      />
    ))
  );
}
