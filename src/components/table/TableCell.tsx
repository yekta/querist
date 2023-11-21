export function TableCell({
  isHeader,
  value,
}: {
  isHeader?: boolean;
  value: any;
}) {
  const isMuted = value === null || value === "";
  return (
    <p
      className={`py-2 px-2 max-w-[13rem] overflow-hidden whitespace-nowrap
      border-0.5 border-border group-focus:shadow-primary group-focus:shadow-cell-selected
      ${
        isHeader
          ? "bg-background-secondary font-bold text-foreground"
          : "bg-background"
      } ${isMuted && "text-foreground/40"}`}
    >
      {value === null
        ? "NULL"
        : value === false
        ? "FALSE"
        : value === true
        ? "TRUE"
        : value === ""
        ? "EMPTY"
        : value}
    </p>
  );
}
