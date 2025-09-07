const frameworkModeRouteTemplate = `
import {
  type RouteConfig,
  route,
  index, 
  layout
} from "@react-router/dev/routes";

export default [
  route("auth/login", "./features/auth/login.tsx"),
  // pattern ^           ^ module file
  layout("./features/shared/layout/layout.tsx", [
    index("./features/base/home.tsx"),
  ]);
] satisfies RouteConfig;
`;

const dataModeRouteTemplate = `
import { createBrowserRouter } from "react-router";
import Login from "./features/auth/login";
import Layout from "./features/shared/layout/layout";
import Home from "./features/base/home";

export const router = createBrowserRouter([
  { path: "/auth/login", element: <Login /> },
  { path: "/", element: <Layout />, children: [
    { index: true, element: <Home /> },
  ] },
]);
`;

const declarativeRouteTemplate = `
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./features/auth/login";
import Layout from "./features/shared/layout/layout";
import Home from "./features/base/home";

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/auth/login" element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </Router>
  );
}
`;

const dataModeAppRender = `
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { router } from "./routes"
import { RouterProvider } from "react-router/dom";
import './index.css'

const root = document.getElementById('root');

createRoot(!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
`;

const declarativeAppRender = `
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router";
import './index.css'
import AppRoutes from './routes'

const root = document.getElementById('root')

createRoot(root).render(
 <BrowserRouter>
    <AppRoutes />
  </BrowserRouter>,
)
`;

const frameworkModeAppClientRender = `
import React from "react";
import ReactDOM from "react-dom/client";
import { HydratedRouter } from "react-router/dom";
import './index.css'

ReactDOM.hydrateRoot(
  document,
  <React.StrictMode>
    <HydratedRouter />
  </React.StrictMode>
);
`;

const frameworkModeRootTemplate = `
import {
  isRouteErrorResponse,
  useRouteError,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  LinksFunction
} from 'react-router';

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <Meta />
        <Links />
      </head>
      <body>
        {/* children will be the root Component, ErrorBoundary, or HydrateFallback */}
        {children}
        <Scripts />
        <ScrollRestoration />
      </body>
    </html>
  );
}

export default function Root() {
  return <Outlet />;
}

export function ErrorBoundary() {
  const error = useRouteError();
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
`;

const frameworkModeConfigTemplate = `
import type { Config } from "@react-router/dev/config";

export default {
  appDirectory: "app",
  buildDirectory: "build",
  ssr: true,
  prerender: ["/", "/auth/login"],
} satisfies Config;
`;

const gitIgnoreTemplate = `
.DS_Store
/node_modules/

# React Router
/.react-router/
/build/
`;

module.exports = {
  frameworkModeRouteTemplate,
  dataModeRouteTemplate,
  declarativeRouteTemplate,
  dataModeAppRender,
  declarativeAppRender,
  frameworkModeAppClientRender,
  frameworkModeRootTemplate,
  frameworkModeConfigTemplate,
  gitIgnoreTemplate,
};
