import { useEffect, useState } from 'react'
import axios from "axios"
import MovieCard from '../MovieCard.js'
import SearchBar from '../SearchBar.js'
import movieClip from "../../assets/movieClip.png"
import { useFavorites } from "../../hooks/useFavorites.js"

interface MovieProps {
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

const SERVER_URL = "http://localhost:3000"

const MoviesPage: React.FC = () => {
    const [movies, setMovies] = useState<MovieProps[]>([])
    const [searchContent, setSearchContent] = useState<string>("")

    // get favorites and favorite action from custom hook
    const { favorites, addFavorite, removeFavorite } = useFavorites()

    // fetch movies based on search
    const fetchMovies = (query: string = "") => {
        axios.get<MovieProps[]>(`${SERVER_URL}/movies`, {
            params: { query } // Passing the search term as query param
        })
            .then((res) => {
                setMovies(res.data)
            })
            .catch((err: any) => console.error("Error fetching movies:", err))
    }

    // fetch all movies
    useEffect(() => {
        fetchMovies() // fetching all movies when component mounts
    }, [])

    const handleSearchContentChange = (query: string) => {
        setSearchContent(query) // updates search state
        fetchMovies(query) // fetch movies bas on search
    }

    // utility function
    const isFavorite = (movieId: string) => {
        return (
            favorites.some((fav) => fav.id === movieId)
        )
    }

    return (
        <div>
            <SearchBar
                searchContent={searchContent}
                onSearch={handleSearchContentChange}
            />
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 justify-items-center gap-1'>
                {movies.map((movie) => (
                    <MovieCard
                        key={movie.id}
                        id={movie.id}
                        title={movie.title}
                        img={movie.img || movieClip}
                        year={movie.year}
                        duration={movie.duration}
                        favorite={isFavorite(movie.id)}
                        rating={movie.rating}
                        description={movie.description}
                        tags={movie.tags}
                        onFavoriteToggle={() => {
                            console.log('Movie ID being added/removed:', movie.id)
                            isFavorite(movie.id) ? removeFavorite(movie.id) : addFavorite(movie.id)
                        }}
                    />
                ))}

            </div>
        </div>
    )
}

export default MoviesPage