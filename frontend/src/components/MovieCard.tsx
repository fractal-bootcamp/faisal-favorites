import { useState } from "react";
import MovieCardExpanded from "./MovieCardExpanded.js"

interface MovieCardProps {
    title: string
    year: number
    duration: number
    img?: string
    favorite: boolean
    rating?: number
    tags?: string[]
}

const MovieCard: React.FC<MovieCardProps> = ({
    img,
    title,
    favorite: favoriteProp,
    year,
    duration,
    rating,
    tags,
}) => {

    const [favorite, setFavorite] = useState<boolean>(favoriteProp)
    const [expanded, setExpanded] = useState<boolean>(false)

    const handleFavoriteChange = () => {
        setFavorite((prevFavorite) => !prevFavorite)
    }
    const handleExpandedChange = () => {
        setExpanded((prevExpanded) => !prevExpanded)
    }

    return (
        <div className="max-w-xs mx-4 my-4 rounded-lg overflow-hidden shawdow-lg bg-white border border-gray-300">

            {img && (
                <img
                    src={img}
                    alt={title}
                    className="w-full h-48 object-cover"
                />
            )}

            <div className=" flex justify-between items-center px-6 py-3">
                <h1 className="font-bold text-xl">
                    {title}
                </h1>
                <div className="flex  justify-center items-center space-x-1">
                    <button onClick={handleExpandedChange} className="text-white text-center text-m bg-gray-500 w-6 h-6 rounded-full focus:outline-none">
                        {expanded ? "-" : "+"}
                    </button>
                    <button onClick={handleFavoriteChange} className="text-gray-500 text-2xl focus:outline-none">
                        {favorite === true ? "🤍" : "♡"}
                    </button>
                </div>
            </div>

            <div className="flex items-center align-center text-gray-700 text-sm px-6">
                |
                <h5 className="mr-2 px-2 text-gray-500 text-xs">
                    {year}
                </h5>
                |
                <h5 className="mr-2 px-2 text-gray-500 text-xs">
                    {duration} mins
                </h5>
                |
                <h5 className="mr-2 px-2 text-gray-500 text-xs">
                    {rating && (
                        <>{rating} / 10 ★</>
                    )}
                </h5>
            </div>

            <div className="px-6 py-3">
                <div className="flex flex-wrap">
                    {tags && (
                        tags.map((tag, index) => (
                            <span key={index} className="inline-block bg-gray-200 rounded-full px-3 py-1 mr-1 mb-1 text-xs font-medium text-gray-700">
                                #{tag}
                            </span>
                        ))
                    )}
                </div>
            </div>
        </div >
    )
}

export default MovieCard