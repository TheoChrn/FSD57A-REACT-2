import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./index.css";
import { Home, usersLoader } from "@/pages/home/page";
import User, { userLoader } from "@/pages/users/userId/page";
import ErrorPage from "@/pages/error";
import NotFound from "@/pages/not-found/page";
import RootLayout from "@/pages/layout";
import WeatherPage from "@/pages/weather/page";
import { UsersProvider } from "@/contexts/user-context";
import MusicPage, { createMusic, musicLoader } from "@/pages/musics/page";
import PostsPage, { createPost, postsLoader } from "@/pages/posts/page";
import PostPage, { editPost, postLoader } from "@/pages/posts/postId/page";
import RegisterPage, { registerAction } from "@/pages/register/page";
import LoginPage, { loginAction } from "@/pages/login/page";
import { PrivateRoute } from "@/components/protectedRoute";

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
    element: <RootLayout />,
    loader: () => {
      const token = localStorage.getItem("token");
      return { token };
    },

    children: [
      {
        index: true,
        element: (
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        ),
        errorElement: <ErrorPage />,
        loader: usersLoader(queryClient),
      },
      {
        path: "users/:userId",
        element: (
          <PrivateRoute>
            <User />
          </PrivateRoute>
        ),
        loader: userLoader(queryClient),
        errorElement: <ErrorPage />,
      },
      {
        path: "weather",

        element: (
          <PrivateRoute>
            <WeatherPage />
          </PrivateRoute>
        ),
        errorElement: <ErrorPage />,
      },
      {
        path: "musics",
        element: (
          <PrivateRoute>
            <MusicPage />
          </PrivateRoute>
        ),
        loader: musicLoader(queryClient),
        errorElement: <ErrorPage />,
        action: createMusic(queryClient),
      },
      {
        path: "posts",
        element: (
          <PrivateRoute>
            <PostsPage />
          </PrivateRoute>
        ),
        loader: postsLoader(queryClient),
        errorElement: <ErrorPage />,
        action: createPost(queryClient),
      },
      {
        path: "posts/:id",
        element: (
          <PrivateRoute>
            <PostPage />
          </PrivateRoute>
        ),
        loader: postLoader(queryClient),
        errorElement: <ErrorPage />,
        action: editPost(queryClient),
      },
      {
        path: "register",
        element: <RegisterPage />,
        errorElement: <ErrorPage />,
        action: registerAction(),
      },
      {
        path: "login",
        element: <LoginPage />,
        errorElement: <ErrorPage />,
        action: loginAction(),
      },
      { path: "/*", element: <NotFound /> },
    ],
  },
]);

const rootElement = document.getElementById("root");
ReactDOM.createRoot(rootElement!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <UsersProvider>
        <RouterProvider router={router} />
      </UsersProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
