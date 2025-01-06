import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./index.css";
import { Home, usersLoader } from "@/pages/home/page";
import User, { userLoader } from "@/pages/users/userId/page";
import ErrorPage from "@/pages/error";
import NotFound from "@/pages/not-found/page";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 10,
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
        errorElement: <ErrorPage />,
        loader: usersLoader(queryClient),
      },
      {
        path: "users/:userId",
        element: <User />,
        loader: userLoader(queryClient),
        errorElement: <ErrorPage />,
      },
      { path: "/*", element: <NotFound /> },
    ],
  },
]);

const rootElement = document.getElementById("root");
ReactDOM.createRoot(rootElement!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
