"use client";

import * as React from "react";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";

import { cn } from "@/components/primitives/utils";

type TExtraScrollAreaProps = {
  viewportMode?: "vertical" | "full";
};

const ScrollArea = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root> &
    TExtraScrollAreaProps
>(
  (
    {
      className,
      type = "scroll",
      scrollHideDelay = 1250,
      viewportMode = "vertical",
      children,
      ...props
    },
    ref
  ) => (
    <ScrollAreaPrimitive.Root
      ref={ref}
      className={cn(
        "w-full flex-1 flex flex-col items-start justify-start overflow-hidden",
        className
      )}
      type={type}
      scrollHideDelay={scrollHideDelay}
      {...props}
    >
      <ScrollAreaPrimitive.Viewport
        className={
          viewportMode === "full"
            ? "w-full h-full"
            : "w-full flex-1 [&>div]:!block"
        }
      >
        {children}
      </ScrollAreaPrimitive.Viewport>
      <ScrollBar />
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  )
);
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName;

const ScrollBar = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>
>(({ className, orientation = "vertical", ...props }, ref) => (
  <ScrollAreaPrimitive.ScrollAreaScrollbar
    ref={ref}
    orientation={orientation}
    className={cn(
      "flex touch-none select-none transition-colors group",
      orientation === "vertical" &&
        "h-full w-[12px] px-2px py-2px hover:w-[14px] border-l border-l-transparent hover:border-l-border before:w-[24px] before:h-full before:absolute before:right-0 before:top-0",
      orientation === "horizontal" &&
        "w-full h-[12px] py-2px px-2px hover:h-[14px] flex-col border-t border-t-transparent hover:border-t-border before:h-[24px] before:w-full before:absolute before:left-0 before:bottom-0",
      "transition-all duration-150 hover:bg-background-secondary",
      className
    )}
    {...props}
  >
    <ScrollAreaPrimitive.ScrollAreaThumb
      className={`relative flex-1 bg-muted-foreground/90 group-hover:bg-muted-foreground`}
    />
  </ScrollAreaPrimitive.ScrollAreaScrollbar>
));
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName;

export { ScrollArea, ScrollBar };
