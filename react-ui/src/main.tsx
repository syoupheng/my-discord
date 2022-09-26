import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, createRoutesFromElements, Navigate, Outlet, Route, RouterProvider } from "react-router-dom";
import App from "./App";
import "./index.css";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import UserPage from "./pages/UserPage";
import ChannelsLayout from "./components/layouts/ChannelsLayout";
import AuthGuard from "./components/guards/AuthGuard";
import NoAuthGuard from "./components/guards/NoAuthGuard";

const client = new ApolloClient({
  uri: import.meta.env.VITE_API_URL,
  cache: new InMemoryCache({
    typePolicies: {
      AuthUser: {
        keyFields: []
      }
    }
  }),
  credentials: 'include'
});

const DEFAULT_ROUTE = '/channels/@me';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      {/* Public routes that should not be accessible to authenticated users */}
      <Route element={<NoAuthGuard />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
      </Route>

      {/* Authenticated routes */}
      <Route element={<AuthGuard />}>
        <Route index element={<Navigate to={DEFAULT_ROUTE} />} />
        <Route path="channels/" element={<ChannelsLayout />}>
          <Route index element={<Navigate to={DEFAULT_ROUTE} />} />
          <Route
            path="@me"
            element={
              <>
                <h1>Hello</h1>
                <Outlet />
              </>
            }
          >
            <Route index element={<UserPage />} />
          </Route>
        </Route>
      </Route>

      <Route path="*" element={<Navigate to={DEFAULT_ROUTE} />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  </React.StrictMode>
);
