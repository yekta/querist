"use client";

import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";

import { cn } from "@/components/primitives/utils";

const Popover = PopoverPrimitive.Root;

const PopoverTrigger = PopoverPrimitive.Trigger;

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        `z-50 w-72 rounded-md border border-border-stronger bg-popover p-4 text-popover-foreground shadow-lg shadow-shadow
        outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 
        data-[state=open]:fade-in-0
        data-[state=closed]:zoom-out-[.98] data-[state=open]:zoom-in-[.98] 
        data-[state=open]:duration-150
        data-[state=closed]:duration-75
        data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2
        data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2
        data-[side=bottom]:slide-out-to-top-2 data-[side=left]:slide-out-to-right-2 
        data-[side=right]:slide-out-to-left-2 data-[side=top]:slide-out-to-bottom-2`,
        className
      )}
      {...props}
    />
  </PopoverPrimitive.Portal>
));
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

export { Popover, PopoverTrigger, PopoverContent };
