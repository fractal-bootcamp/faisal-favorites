import MovieCardExpanded from "../MovieCardExpanded.js"
import movieClip from "../../assets/movieClip.png"
import { useFavorites } from "../../hooks/useFavorites.js"

const FavoritesPage: React.FC = () => {
    const { favorites, removeFavorite } = useFavorites()

    return (
        <div>
            <h1 className="text-center text-2xl font-bold my-4">Your Favorite Movies</h1>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 justify-items-center gap-1'>
                {favorites.length > 0 ? (
                    favorites.map((movie) => (
                        <MovieCardExpanded
                            key={movie.id}
                            movieId={movie.id}
                            title={movie.title}
                            img={movie.img || movieClip}
                            year={movie.year}
                            duration={movie.duration}
                            favorite={true}
                            rating={movie.rating}
                            description={movie.description}
                            tags={movie.tags}
                            onClose={() => removeFavorite(movie.id)}
                        />
                    ))
                ) : (
                    <p className="text-center col-span-full text-gray-500">You have no favorite movies yet.</p>
                )}
            </div>
        </div>
    )
}

export default FavoritesPage