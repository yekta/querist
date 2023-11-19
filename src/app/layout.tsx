import "@css/app.css";
import RootLayoutProviders from "@components/providers/RootLayoutProviders";
import { Outlet } from "@tanstack/react-router";

export default function RootLayout() {
  return (
    <RootLayoutProviders>
      <Outlet />
    </RootLayoutProviders>
  );
}
