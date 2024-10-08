import React, { useEffect } from "react";
import { useAuth } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom"
import MoviesPage from "./components/pages/MoviesPage.js"

const App: React.FC = () => {
  const { userId, isLoaded } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (isLoaded && !userId) {
      navigate("/")
    }
  }, [isLoaded])

  if (!isLoaded) return "Loading..."

  return (
    <div>
      <MoviesPage />
    </div>
  )
}

export default App