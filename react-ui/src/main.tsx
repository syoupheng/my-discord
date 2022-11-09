import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider } from "react-router-dom";
import App from "./App";
import "./index.css";
// import LoginPage from "./pages/LoginPage";
// import RegisterPage from "./pages/RegisterPage";
import { ApolloProvider } from "@apollo/client";
import AuthGuard from "./components/guards/AuthGuard";
import NoAuthGuard from "./components/guards/NoAuthGuard";
// import MainLayout from "./components/layouts/MainLayout";
// import MeSidebar from "./components/layouts/MeSidebar";
// import FriendsPage from "./pages/FriendsPage";
import FriendsTabProvider from "./providers/FriendsTabProvider";
import { client } from "./apollo.config";
import LoadingScreen from "./components/shared/LoadingScreen";

// Route based code splitting
const LoginPage = lazy(() => import("./pages/LoginPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const MainLayout = lazy(() => import("./components/layouts/MainLayout"));
const MeSidebar = lazy(() => import("./components/layouts/MeSidebar"));
const FriendsPage = lazy(() => import("./pages/FriendsPage"));

export const DEFAULT_ROUTE = "/channels/@me";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      {/* Public routes that should only be accessible to unauthenticated users */}
      <Route element={<NoAuthGuard />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
      </Route>

      {/* Authenticated routes */}
      <Route element={<AuthGuard />}>
        <Route index element={<Navigate to={DEFAULT_ROUTE} />} />
        <Route path="channels/" element={<MainLayout />}>
          <Route index element={<Navigate to={DEFAULT_ROUTE} />} />
          <Route path="@me" element={<MeSidebar />}>
            <Route index element={<FriendsPage />} />
            <Route path=":roomId" element={"room page"} />
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
      <FriendsTabProvider>
        <Suspense fallback={<LoadingScreen />}>
          <RouterProvider router={router} />
        </Suspense>
      </FriendsTabProvider>
    </ApolloProvider>
  </React.StrictMode>
);
