"use client";

import IconLoading from "@components/icons/IconLoading";
import { Button } from "@components/primitives/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@components/primitives/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@components/primitives/ui/popover";
import { cn } from "@components/primitives/utils";
import {
  ChevronUpDownIcon,
  CheckIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import { useElementSize } from "usehooks-ts";

export interface TComboboxItem {
  value: string;
  label: string;
}

export function Combobox({
  noResultText,
  notSelectedText,
  items,
  searchPlaceholder,
  value,
  setValue,
  open,
  setOpen,
  SelectedItemIcon,
  disabled,
  isLoading,
  isError,
}: {
  noResultText: string;
  notSelectedText: string;
  items: TComboboxItem[];
  searchPlaceholder: string;
  value: string;
  setValue: (value: string) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  SelectedItemIcon?: React.ComponentType<any>;
  disabled?: boolean;
  isLoading?: boolean;
  isError?: boolean;
}) {
  const [buttonRef, { width: buttonWidth, height: buttonHeight }] =
    useElementSize<any>();
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          ref={buttonRef}
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full px-2.5"
          disabled={isLoading || isError || disabled}
        >
          {isLoading ? (
            <div className="w-4 h-4 mr-2 bg-foreground/20 animate-pulse duration-1000" />
          ) : isError ? (
            <ExclamationTriangleIcon className="w-4 h-4 mr-2" />
          ) : (
            SelectedItemIcon && (
              <SelectedItemIcon className="w-4 h-4 shrink-0 mr-2" />
            )
          )}
          <p
            className={`min-w-0 flex-1 overflow-hidden overflow-ellipsis text-left ${
              isLoading ? "bg-foreground/20 text-transparent" : ""
            }`}
          >
            {isError
              ? "Error"
              : isLoading
              ? "Loading"
              : value
              ? items.find((item) => item.value === value)?.label
              : notSelectedText}
          </p>
          <ChevronUpDownIcon className="ml-2 -mr-1.5 h-5 w-5 shrink-0 text-muted-foreground" />
        </Button>
      </PopoverTrigger>
      {!isLoading && !isError && items !== undefined && (
        <PopoverContent
          style={{
            minWidth: buttonWidth,
          }}
          align="start"
          collisionPadding={8}
          className="w-full p-0"
        >
          <Command loop={true}>
            <CommandInput placeholder={searchPlaceholder} />
            <CommandEmpty>{noResultText}</CommandEmpty>
            <CommandGroup>
              {items.map((item) => (
                <CommandItem
                  key={item.value}
                  value={item.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue);
                    setOpen(false);
                  }}
                >
                  <CheckIcon
                    strokeWidth={2.5}
                    className={cn(
                      "mr-2 h-4 w-4 text-primary",
                      value === item.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  <p className="min-w-0 flex-shrink overflow-hidden overflow-ellipsis">
                    {item.label}
                  </p>
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      )}
    </Popover>
  );
}
