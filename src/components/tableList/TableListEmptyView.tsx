export function TableListEmptyView({
  text,
  Icon,
}: {
  text: string;
  Icon?: React.ComponentType<any>;
}) {
  return (
    <div className="w-full flex items-center justify-center px-3 py-px">
      <div className="w-full border border-border px-3 py-6 gap-2 flex items-center justify-center">
        {Icon && <Icon className="w-4 h-4 opacity-60" />}
        <p className="text-sm text-foreground/60">{text}</p>
      </div>
    </div>
  );
}
