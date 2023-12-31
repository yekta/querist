import IconLoading from "@components/icons/IconLoading/IconLoading";
import {
  ExclamationTriangleIcon,
  TableCellsIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";
import DataGrid, {
  Column,
  RenderCheckboxProps,
  RenderCellProps,
} from "react-data-grid";
import "react-data-grid/lib/styles.css";
import "@css/grid.css";
import { useState } from "react";

export type TRow = Record<string, any>;

export function DataGridQ({
  rows,
  columns,
  isLoading,
  isError,
  isNonexistent = false,
}: {
  rows: any[];
  columns: Column<TRow>[];
  isLoading: boolean;
  isError?: boolean;
  isNonexistent?: boolean;
}) {
  const [selectedRows, setSelectedRows] = useState(
    (): ReadonlySet<number> => new Set()
  );

  if (isError) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center gap-2">
        <ExclamationTriangleIcon className="w-8 h-8 text-foreground/60" />
        <p className="text-foreground/60">Something went wrong</p>
      </div>
    );
  }

  if (isLoading)
    return (
      <div className="w-full h-full flex flex-col items-center justify-center gap-2">
        <IconLoading className="w-8 h-8" colorClassName="bg-foreground/60" />
        <p className="text-foreground/0">Loading</p>
      </div>
    );

  if (isNonexistent) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center gap-2">
        <TableCellsIcon className="w-8 h-8 text-foreground/60" />
        <p className="text-foreground/60">No table to show</p>
      </div>
    );
  }

  return (
    <DataGrid
      onSelectedRowsChange={setSelectedRows}
      selectedRows={selectedRows}
      className="fill-grid data-grid"
      columns={columns}
      rows={rows}
      rowKeyGetter={rowKeyGetter}
      renderers={{ renderCheckbox }}
    />
  );
}

function renderCheckbox({ onChange, ...props }: RenderCheckboxProps) {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    onChange(e.target.checked, (e.nativeEvent as MouseEvent).shiftKey);
  }

  return (
    <label
      className="w-full h-full flex items-center justify-center 
      absolute left-0 top-0 p-2px group/label select-none"
    >
      <input
        className="w-0 h-0 absolute left-0 top-0 overflow-hidden peer"
        type="checkbox"
        {...props}
        onChange={handleChange}
      />
      <div
        className="w-[16px] h-[16px] flex items-center justify-center 
        border border-border group-hover/label:border-primary
        peer-checked:border-primary
        peer-checked:bg-primary peer-checked:group/checked"
      />
      <CheckIcon
        className="w-[12px] h-[12px] text-background transition transform 
        absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
        scale-0 peer-checked:scale-100"
        strokeWidth={4}
      />
    </label>
  );
}

function rowKeyGetter(row: TRow) {
  return row.id;
}

export function renderCell(props: RenderCellProps<TRow, any>) {
  const { column, row } = props;
  const value = row[column.key];
  if (value === null) return <span className="text-foreground/40">NULL</span>;
  if (value === "") return <span className="text-foreground/40">EMPTY</span>;
  if (value === false)
    return (
      <span
        className="pl-3 relative before:absolute before:w-1 before:h-1 before:bg-danger 
        before:left-0 before:top-1/2 before:transform before:-translate-y-1/2"
      >
        FALSE
      </span>
    );
  if (value === true)
    return (
      <span
        className="pl-3 relative before:absolute before:w-1 before:h-1 before:bg-success 
        before:left-0 before:top-1/2 before:transform before:-translate-y-1/2"
      >
        TRUE
      </span>
    );
  return <>{row[column.key]}</>;
}
