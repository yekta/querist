import React from "react";

export default function DashboardMainArea({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex-1 min-w-0 flex flex-col overflow-hidden">
      {children}
    </section>
  );
}
