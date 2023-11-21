import IconLoading from "@components/icons/IconLoading";
import { flexRender, type Table } from "@tanstack/react-table";

export function Table({
  table,
  isLoading,
}: {
  table: Table<any>;
  isLoading: boolean;
}) {
  if (isLoading)
    return (
      <div className="flex-1 flex items-center justify-center w-full">
        <IconLoading className="w-8 h-8 opacity-60" />
      </div>
    );
  return (
    <table className="text-sm -mt-px -ml-px text-left font-normal text-foreground/85 border-0.5 border-border">
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th
                className="p-0 m-0 select-none group"
                tabIndex={-1}
                key={header.id}
              >
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td
                className="p-0 m-0 select-none group"
                tabIndex={-1}
                key={cell.id}
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}