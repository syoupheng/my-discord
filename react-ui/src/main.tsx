import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import ErrorPage from "@/pages/ErrorPage";
import App from "@/App";
import PublicRouteGuard from "@/components/guards/PublicRouteGuard";
import PrivateRouteGuard from "@/components/guards/PrivateRouteGuard";
import FriendsTabProvider from "@/providers/FriendsTabProvider";
import ChatScrollProvider from "@/providers/ChatScrollProvider";
import LoadingScreen from "@/components/shared/LoadingScreen";
import { client } from "@/apollo.config";
import "@/index.css";

// Route based code splitting
const LoginPage = lazy(() => import("@/pages/LoginPage"));
const RegisterPage = lazy(() => import("@/pages/RegisterPage"));
const MainLayout = lazy(() => import("@/components/layouts/MainLayout"));
const MeSidebar = lazy(() => import("@/components/layouts/MeSidebar"));
const FriendsPage = lazy(() => import("@/pages/FriendsPage"));
const PrivateChannelPage = lazy(() => import("@/pages/PrivateChannelPage"));

export const DEFAULT_ROUTE = "/channels/@me";

export const PUBLIC_ROUTES = ["/login", "/register"];

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} errorElement={<ErrorPage />}>
      {/* Public routes that should only be accessible to unauthenticated users */}
      <Route element={<PublicRouteGuard />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
      </Route>

      {/* Authenticated routes */}
      <Route element={<PrivateRouteGuard />}>
        <Route index element={<Navigate to={DEFAULT_ROUTE} />} />
        <Route path="channels/" element={<MainLayout />}>
          <Route index element={<Navigate to={DEFAULT_ROUTE} />} />
          <Route path="@me" element={<MeSidebar />}>
            <Route index element={<FriendsPage />} />
            <Route path=":channelId" element={<PrivateChannelPage />} />
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
        <ChatScrollProvider>
          <Suspense fallback={<LoadingScreen />}>
            <RouterProvider router={router} />
          </Suspense>
        </ChatScrollProvider>
      </FriendsTabProvider>
    </ApolloProvider>
  </React.StrictMode>
);
