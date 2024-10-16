import React, { useEffect, useState } from "react";
import axios from "axios"
interface MovieCardExpandedProps {
    movieId: string // Add id to make API request
    img?: string
    title: string
    favorite: boolean
    year: number
    duration: number
    rating?: number
    description: string
    tags?: string[]
    onClose: () => void
}

const SERVER_URL = "http://localhost:3000"

const MovieCardExpanded: React.FC<MovieCardExpandedProps> = ({
    movieId,
    img,
    title,
    favorite: favoriteProp,
    year,
    duration,
    rating,
    description,
    tags: initialTags,
    onClose,
}) => {

    const [favorite, setFavorite] = useState<boolean>(favoriteProp)
    const [tags, setTags] = useState<string[]>(initialTags || []) // Store tags in state
    const [newTag, setNewTag] = useState<string>("") // Track new tags

    // Fetch updated tags from backend
    useEffect(() => {
        axios.get(`${SERVER_URL}/movies/${movieId}/tags`)
            .then((res) => {
                setTags(res.data.tags) // Update tags from db
            })
            .catch((err) => {
                console.error("Error fetching updating tags:", err)
            })
    }, [movieId])

    const handleFavoriteChange = () => {
        const endpoint = favorite
            ? `${SERVER_URL}/movies/${movieId}/favorites`
            : `${SERVER_URL}/movies/${movieId}/favorites`

        const method = favorite ? "delete" : "post" // POST for adding, DELETE for removing

        axios[method](endpoint)
            .then(() => {
                setFavorite((prevFavorite) => !prevFavorite)
            })
            .catch((err) => {
                console.error("Error updating favorite state", err)
            })
    }



    const handleAddingTags = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && newTag.trim()) {
            const previousTags = [...tags]
            const updatedTags = [...tags, newTag.trim()]
            setTags(updatedTags)
            setNewTag("")

            // API request to update tags in db
            axios
                .put(`${SERVER_URL}/movies/${movieId}/tags`, { tags: updatedTags })
                .then((res) => {
                    console.log("Tags updated successfully:", res.data)
                })
                .catch((err) => {
                    console.error("Error updating tags:", err);
                    setTags(previousTags) // Do nothing if updating failed
                })
        }
    }

    const handleDeletingTags = (index: number, tag: string) => {
        const prevTags = [...tags]
        const updatedTags = tags.filter((_, i) => i !== index)

        //API request to delete tags in db
        axios
            .delete(`${SERVER_URL}/movies/${movieId}/tags/${tag}`)
            .then((res) => {
                console.log("Tag successfully deleted:", res.data);
                setTags(updatedTags)
            })
            .catch(err => {
                console.error("Error deleting tag:", err)
                setTags(prevTags)
            })
    }

    return (
        <div className="flex flex-col w-full max-w-lg mx-auto rounded-lg shawdow-lg border border-gray-300 z-50 relative bg-white">

            {img && (
                <img
                    src={img}
                    alt={title}
                    className="w-full h-64 object-cover rounded-lg border-b border-gray-500"
                />
            )}

            <div className="flex-grow">
                <div className="flex justify-between items-center px-6 py-3">
                    <h1 className="font-bold text-xl">
                        {title}
                    </h1>
                    <div className="flex justify-center items-center space-x-1">
                        <button onClick={onClose} className="text-white text-center text-m bg-gray-500 w-6 h-6 rounded-full focus:outline-none">
                            -
                        </button>
                        <button onClick={handleFavoriteChange} className="text-gray-500 text-2xl focus:outline-none">
                            {favorite === true ? "🩶" : "♡"}
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
                            <>{rating}</>
                        )} / 10 ★
                    </h5>
                </div>

                <div className="px-6 py-2">
                    <p className="text-gray-500 text-sm">
                        {description}
                    </p>
                </div>
            </div>

            <div className="px-6 py-2 mb-1 items-center mt-auto">
                <div className="flex flex-wrap">
                    {tags.map((tag, index) => (
                        <div key={index} className="relative inline-block bg-gray-300 rounded-full px-3 py-1 mr-2 mb-1 text-xs font-medium text-gray-700 group">
                            #{tag}
                            <button onClick={() => handleDeletingTags(index, tag)} className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-gray-100 text-gray-500 text-xs px-1 focus:outline-none hidden group-hover:block">
                                x
                            </button>
                        </div>
                    ))}

                    <input
                        type="text"
                        placeholder="#Add tags"
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        onKeyDown={handleAddingTags}
                        className="w-24 bg-gray-100 rounded-full px-3 py-1 mb-1 text-xs font-medium text-gray-700 border border-gray-400 focus:border-indigo-100"
                    />
                </div>
            </div>
        </div >
    )
}

export default MovieCardExpanded