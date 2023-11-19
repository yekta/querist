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

const routeTree = rootRoute.addChildren([appLayoutRoute, indexRoute]);
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
