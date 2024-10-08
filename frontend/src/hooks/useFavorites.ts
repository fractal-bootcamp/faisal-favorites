import { useEffect, useState } from "react"
import axios from "axios"

const SERVER_URL = "http://localhost:3000"

interface FavoriteMovieProp {
    id: string
    img?: string
    title: string
    favorite: boolean
    year: number
    duration: number
    rating?: number
    description: string
    tags?: string[]
}

export const useFavorites = () => {
    const [favorites, setFavorites] = useState<FavoriteMovieProp[]>([])

    // Fetch favorite movies for logged-in user
    const fetchFavorites = async () => {
        try {
            const response = await axios.get<FavoriteMovieProp[]>(`${SERVER_URL}/movies/favorites`);
            const favoriteData = response.data || []; // Ensure data is always an array
            setFavorites(Array.isArray(favoriteData) ? favoriteData : []); // Check if it's an array
        } catch (error) {
            console.error("Error fetching favorites:", error);
            setFavorites([]) // Set to an empty array in case of error
        }
    }

    // Add a movie to favorites
    const addFavorite = async (movieId: string) => {
        try {
            await axios.post(`${SERVER_URL}/movies/${movieId}/favorites`);
            setFavorites((prevFavorites) => [...prevFavorites, { id: movieId }]); // Update UI
        } catch (error) {
            console.error("Error adding favorite:", error);
        }
    };

    // Remove a movie from favorites
    const removeFavorite = async (movieId: string) => {
        try {
            await axios.delete(`${SERVER_URL}/movies/${movieId}/favorites`);
            setFavorites((prevFavorites) => prevFavorites.filter((fav) => fav.id !== movieId)); // Update UI
        } catch (error) {
            console.error("Error removing favorite:", error);
        }
    };

    useEffect(() => {
        fetchFavorites() // Fetch favorites when component mounts
    }, [])

    return { favorites, addFavorite, removeFavorite, fetchFavorites }
}