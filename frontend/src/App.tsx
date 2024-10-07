import { SetStateAction, useEffect, useState } from 'react'
import axios from "axios"
import MovieCard from './components/MovieCard.js'
import SearchBar from './components/SearchBar.js'
import movieClip from "./assets/movieClip.png"

interface MovieProps {
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

const App: React.FC = () => {
  const [movies, setMovies] = useState<MovieProps[]>([])

  useEffect(() => {
    axios.get(`${SERVER_URL}/movies`)
      .then((res: { data: SetStateAction<MovieProps[]> }) => {
        setMovies(res.data)
      })
      .catch((err: any) => console.error("Error fetching movies:", err))
  }, [])

  return (
    <div>

      <SearchBar
        searchContent={''}
      />
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-items-center gap-1'>
        {movies.map((movie, index) => (
          <MovieCard
            key={index}
            title={movie.title}
            img={movie.img || movieClip}
            year={movie.year}
            duration={movie.duration}
            favorite={movie.favorite}
            rating={movie.rating}
            tags={movie.tags}
          />
        ))}

      </div>
    </div>
  )
}

export default App