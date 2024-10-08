import { ClerkProvider, SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom"

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
    throw new Error("Missing Publishable key");
}

const RootLayout: React.FC = () => {

    const navigate = useNavigate()

    return (
        <div>
            <header>
                <SignedOut>
                    <SignInButton />
                </SignedOut>
                <SignedIn>
                    <UserButton />
                </SignedIn>
            </header>

            <main>
                <Outlet />
            </main>
        </div>

    )
}

export default RootLayout