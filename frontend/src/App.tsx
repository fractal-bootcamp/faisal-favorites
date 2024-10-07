import { useState } from 'react'
import MovieCard from './components/MovieCard.js'
import { Page } from './stories/Page.js'
import SearchBar from './components/SearchBar.js'
import movieClip from "./assets/movieClip.png"



const App: React.FC = () => {

  return (
    <div>

      <SearchBar
        searchContent={''}
      />

      <MovieCard
        title={"Movie"}
        img={movieClip}
        year={0}
        duration={0}
        favorite={false}
        rating={0}
        tags={[]}
      />
    </div>
  )
}

export default App