import { TableCellsIcon } from "@heroicons/react/24/outline";

export function TableListItem({
  tableName,
  isSelected,
  setTable,
}: {
  tableName: string;
  isSelected: boolean;
  setTable: (table: string) => void;
}) {
  return (
    <button
      onClick={() => setTable(tableName)}
      className="px-3 py-px w-full text-sm group flex items-center justify-start cursor-default"
    >
      <div
        className={`w-full flex items-center justify-start px-2.5 py-2 border ${
          isSelected
            ? "bg-border border-border shadow-border shadow-borderish"
            : "border-transparent group-hover:border-border group-hover:shadow-border group-hover:shadow-borderish"
        }`}
      >
        <TableCellsIcon
          className={`w-4 h-4 shrink-0 mr-2 group-hover:text-foreground
          ${isSelected ? "text-foreground" : "text-foreground/75"}`}
        />
        <p
          className={`shrink min-w-0 overflow-hidden overflow-ellipsis group-hover:text-foreground
          ${isSelected ? "text-foreground" : "text-foreground/75"}`}
        >
          {tableName}
        </p>
      </div>
    </button>
  );
}

export function TableListItemPlaceholder() {
  return (
    <div className="px-3 py-px w-full text-sm group flex items-center justify-start cursor-default">
      <div className="w-full flex items-center justify-start px-2.5 py-2 border border-transparent">
        <div className="w-4 h-4 shrink-0 mr-2 bg-foreground/10" />
        <p className="flex-1 min-w-0 overflow-hidden overflow-ellipsis bg-foreground/10 text-transparent">
          Loading
        </p>
      </div>
    </div>
  );
}
