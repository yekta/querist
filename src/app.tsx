import ReactDOM from "react-dom/client";

import {
  Router,
  Route,
  RootRoute,
  RouterProvider,
} from "@tanstack/react-router";
import { z } from "zod";
import HomePage from "@app/page";
import RootLayout from "@app/layout";
import AppLayout from "@app/layout-app";
import QueriesPage from "@app/queries/page";
import TablesPage from "@app/tables/page";
import SchemaPage from "@app/schema/page";
import SettingsPage from "@app/settings/page";

const rootSearchSchema = z.object({
  from: z.string().optional(),
});

const rootRoute = new RootRoute({
  component: RootLayout,
  validateSearch: rootSearchSchema,
});

const appLayoutRoute = new Route({
  getParentRoute: () => rootRoute,
  component: AppLayout,
  id: "layout-app",
});

const indexRoute = new Route({
  getParentRoute: () => appLayoutRoute,
  path: "/",
  component: HomePage,
});

const queriesRoute = new Route({
  getParentRoute: () => appLayoutRoute,
  path: "/queries",
  component: QueriesPage,
});

const tablesRoute = new Route({
  getParentRoute: () => appLayoutRoute,
  path: "/tables",
  component: TablesPage,
});

const schemaRoute = new Route({
  getParentRoute: () => appLayoutRoute,
  path: "/schema",
  component: SchemaPage,
});

const settingsRoute = new Route({
  getParentRoute: () => appLayoutRoute,
  path: "/settings",
  component: SettingsPage,
});

const routeTree = rootRoute.addChildren([
  appLayoutRoute,
  indexRoute,
  queriesRoute,
  tablesRoute,
  schemaRoute,
  settingsRoute,
]);
const router = new Router({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById("react-app")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<RouterProvider router={router} />);
}
