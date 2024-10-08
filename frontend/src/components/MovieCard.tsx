import { useState } from "react";
import MovieCardExpanded from "./MovieCardExpanded.js"

interface MovieCardProps {
    id: string
    img?: string
    title: string
    favorite: boolean
    year: number
    duration: number
    rating?: number
    description: string
    tags?: string[]
    onFavoriteToggle: () => void
}

const MovieCard: React.FC<MovieCardProps> = ({
    id,
    img,
    title,
    favorite,
    year,
    duration,
    rating,
    description,
    tags,
    onFavoriteToggle,
}) => {
    const [expanded, setExpanded] = useState<boolean>(false)

    const handleExpandedChange = () => {
        setExpanded((prevExpanded) => !prevExpanded)
    }

    return (
        <>
            {expanded && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <MovieCardExpanded
                        movieId={id}
                        img={img}
                        title={title}
                        favorite={favorite}
                        year={year}
                        duration={duration}
                        rating={rating}
                        tags={tags}
                        description={description}
                        onClose={handleExpandedChange}
                    />
                </div>
            )}


            <div className="w-64 mx-4 my-4 rounded-lg overflow-hidden shawdow-lg bg-white border border-gray-300">

                {img && (
                    <img
                        src={img}
                        alt={title}
                        className="w-full h-48 object-cover"
                    />
                )}

                <div className=" flex justify-between items-center px-6 py-3">
                    <h1 className="font-semibold text-xl truncate max-w-[10rem]">
                        {title}
                    </h1>
                    <div className="flex justify-center items-center space-x-1">
                        <button onClick={handleExpandedChange} className="text-white text-center text-m bg-gray-500 w-6 h-6 rounded-full focus:outline-none">
                            {expanded ? "-" : "+"}
                        </button>
                        <button onClick={onFavoriteToggle} className="text-gray-500 text-2xl focus:outline-none">
                            {favorite === true ? "🩶" : "♡"}
                        </button>
                    </div>
                </div>

                <div className="flex items-center align-center text-gray-700 text-sm px-6 mb-5">
                    |
                    <h5 className="mr-1 px-1 text-gray-500 text-xs">
                        {year}
                    </h5>
                    |
                    <h5 className="mr-1 px-2 text-gray-500 text-xs">
                        {duration} mins
                    </h5>
                    |
                    <h5 className="mr-1 px-1 text-gray-500 text-xs">
                        {rating && (
                            <>{rating}</>
                        )} / 10 ★
                    </h5>
                </div>


            </div >
        </>
    )
}

export default MovieCard