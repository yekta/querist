import React from "react";

export default function DashboardPageWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full flex flex-1 items-stretch justify-center overflow-hidden">
      {children}
    </div>
  );
}
