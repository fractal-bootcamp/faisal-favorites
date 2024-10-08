import { ClerkProvider, SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import React from "react";
import { Link, Outlet } from "react-router-dom"

const RootLayout: React.FC = () => {

    return (
        <div className="min-h-screen flex flex-col">
            <header className="bg-gray-800 text-white py-4 px-4">
                <nav className="container mx-auto flex justify-between items-center">
                    <div className="flex space-x-4">
                        <Link to="/" className="text-lg font-semibold hover:text-gray-300">
                            Movies
                        </Link>
                        <SignedIn>
                            <Link to="/movies/favorites" className="text-lg font-semibold hover:text-gray-300">
                                Favorites
                            </Link>
                        </SignedIn>
                    </div>
                    <div className="flex space-x-4">
                        <SignedOut>
                            <SignInButton mode="modal">
                                <button className="bg-blue-400 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg">
                                    Login
                                </button>
                            </SignInButton>
                        </SignedOut>
                        <SignedIn>
                            <UserButton />
                        </SignedIn>
                    </div>
                </nav>
            </header>

            <main className="flex-grow container mx-auto py-4">
                <Outlet />
            </main>

            <footer className="bg-gray-800 text-white text-xs py-2">
                <div className="container mx-auto text-center">
                    © 2024 Your Movie App
                </div>
            </footer>
        </div>

    )
}

export default RootLayout