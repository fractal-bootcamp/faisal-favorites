import * as React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-react"
import './index.css'

import App from './App.js'
import RootLayout from "./components/RootLayout.js";
import SignInPage from "./components/pages/SignInPage.js"
import SignUpPage from "./components/pages/SignUpPage.js"
import FavoritesPage from './components/pages/FavoritesPage.js'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable key");
}

const router = createBrowserRouter([
  // Root layout with Clerk integration
  {
    element: <RootLayout />,
    children: [

      // Public routes
      { path: "/", element: <App /> },
      // Protected routes
      {
        path: "/movies/favorites", element: (
          <SignedIn>
            <FavoritesPage />
          </SignedIn>
        )
      },
      // Redirected routes

    ]
  }
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <RouterProvider router={router} />
    </ClerkProvider>
  </React.StrictMode>
);