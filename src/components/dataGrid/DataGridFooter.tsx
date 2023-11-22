import { Button } from "@components/primitives/ui/button";
import { Input } from "@components/primitives/ui/input";
import { ArrowLongLeftIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useDebounce } from "usehooks-ts";

interface TDataGridFooterProps {
  minPage: number;
  maxPage: number;
  currentPage: number;
}

export default function DataGridFooter({
  minPage,
  maxPage,
  currentPage,
}: TDataGridFooterProps) {
  const [value, setValue] = useState(currentPage);
  const debouncedValue = useDebounce(value, 300);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value > maxPage) return setValue(maxPage);
    if (value < minPage) return setValue(minPage);
    setValue(value);
  };

  return (
    <div className="w-full bg-background-secondary flex items-center justify-start p-2 ring-1 ring-border z-10 gap-4">
      <Button
        disabled={currentPage <= minPage}
        variant="outline"
        size="sm"
        className="h-7"
      >
        <ArrowLongLeftIcon className="w-6 h-6" />
      </Button>
      <div className="flex items-center justify-start gap-2">
        <p className="text-foreground/75">Page</p>
        <Input
          type="number"
          className="bg-background w-14 h-7 px-2 font-bold"
          onChange={onChange}
          max={maxPage}
          value={value}
        />
        <p className="text-foreground/75">of {maxPage}</p>
      </div>
      <Button
        disabled={currentPage >= maxPage}
        variant="outline"
        size="sm"
        className="h-7"
      >
        <ArrowLongLeftIcon className="w-6 h-6 -my-1 transform rotate-180" />
      </Button>
    </div>
  );
}
