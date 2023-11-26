import { ScrollArea } from "@components/primitives/ui/scroll-area";
import React from "react";

export default function DashboardSidebar({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="w-64 flex flex-col items-start justify-start border-r border-border overflow-hidden">
      <div className="w-full border-b border-border">
        <p className="px-4.5 py-3 font-black text-xl">{title}</p>
      </div>
      <div className="w-full flex-1 flex flex-col items-start justify-start overflow-hidden">
        <ScrollArea>
          <div className="w-full flex flex-col pb-16">{children}</div>
        </ScrollArea>
      </div>
    </section>
  );
}
