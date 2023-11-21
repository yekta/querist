import IconLoading from "@components/icons/IconLoading";
import {
  ExclamationTriangleIcon,
  TableCellsIcon,
} from "@heroicons/react/24/outline";
import { flexRender, type Table } from "@tanstack/react-table";
import { useRef } from "react";

export function Table({
  table,
  isLoading,
  isError,
  isNonexistent = false,
}: {
  table: Table<any>;
  isLoading: boolean;
  isError?: boolean;
  isNonexistent?: boolean;
}) {
  const theadRef = useRef<HTMLTableSectionElement>(null);
  const tbodyRef = useRef<HTMLTableSectionElement>(null);
  const tableRef = useRef<HTMLTableElement>(null);
  // Function to handle key press on a row
  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLTableCellElement>,
    cellId: string,
    rowId: string,
    ref: React.MutableRefObject<HTMLTableSectionElement>
  ) => {
    event.stopPropagation();

    const key = event.key;
    const rowElement = ref.current.children.namedItem(rowId);
    const cellElement = rowElement?.children.namedItem(cellId);

    if (key === "ArrowLeft") {
      const elToFocus = cellElement?.previousElementSibling as HTMLElement;
      elToFocus?.focus();
      return;
    }
    if (key === "ArrowRight") {
      const elToFocus = cellElement?.nextElementSibling as HTMLElement;
      elToFocus?.focus();
      return;
    }

    const cellIndex = Array.from(rowElement?.children).indexOf(cellElement);

    if (key === "ArrowUp") {
      const rowIndex = Array.from(ref.current.children).indexOf(rowElement);
      if (ref === tbodyRef && rowIndex === 0) {
        const headerRowElement = theadRef.current?.children[0];
        const elToFocus = headerRowElement?.children[cellIndex] as HTMLElement;
        elToFocus?.focus();
        return;
      }
      const prevRow = rowElement?.previousElementSibling;
      const elToFocus = prevRow?.children[cellIndex] as HTMLElement;
      elToFocus?.focus();
      return;
    }
    if (key === "ArrowDown") {
      if (ref === theadRef) {
        const nextRow = tbodyRef.current?.children[0];
        const elToFocus = nextRow?.children[cellIndex] as HTMLElement;
        elToFocus?.focus();
        return;
      }
      const nextRow = rowElement?.nextElementSibling;
      const elToFocus = nextRow?.children[cellIndex] as HTMLElement;
      elToFocus?.focus();
      return;
    }
  };

  if (isError) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center w-full gap-2">
        <ExclamationTriangleIcon className="w-8 h-8 text-foreground/60" />
        <p className="text-sm text-foreground/60">Something went wrong</p>
      </div>
    );
  }
  if (isLoading)
    return (
      <div className="flex-1 flex flex-col items-center justify-center w-full gap-2">
        <IconLoading className="w-8 h-8 opacity-60" />
        <p className="text-sm text-foreground/0">Loading</p>
      </div>
    );
  if (isNonexistent) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center w-full gap-2">
        <TableCellsIcon className="w-8 h-8 text-foreground/60" />
        <p className="text-sm text-foreground/60">No table to show</p>
      </div>
    );
  }
  return (
    <table
      ref={tableRef}
      className="text-sm -mt-px -ml-px text-left font-normal text-foreground border-0.5 border-border"
    >
      <thead ref={theadRef}>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr id={headerGroup.id} key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th
                onKeyDown={(e) =>
                  handleKeyDown(e, header.id, headerGroup.id, theadRef)
                }
                className="p-0 m-0 select-none group"
                tabIndex={-1}
                key={header.id}
                id={header.id}
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
      <tbody ref={tbodyRef}>
        {table.getRowModel().rows.map((row) => (
          <tr id={row.id} key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td
                onKeyDown={(e) => handleKeyDown(e, cell.id, row.id, tbodyRef)}
                className="p-0 m-0 select-none group"
                tabIndex={-1}
                key={cell.id}
                id={cell.id}
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
