import Navbar from "@components/Navbar";
import { Outlet } from "@tanstack/react-router";

export default function AppLayout() {
  return (
    <div className="w-full flex flex-col flex-1 h-screen text-sm">
      <Navbar />
      <Outlet />
    </div>
  );
}
