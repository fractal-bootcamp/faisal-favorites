import { useState } from 'react'
import MovieCard from './components/MovieCard.js'
import { Page } from './stories/Page.js'
import SearchBar from './components/SearchBar.js'
import godFather from "./assets/godFather.png"



const App: React.FC = () => {

  return (
    <div>

      <SearchBar
        searchContent={''}
      />

      <MovieCard
        title='The Godfather'
        img={godFather}
        year={1972}
        duration={175}
        favorite={false}
        rating={9.2}
        tags={["Action", "Crime"]}
      />
    </div>
  )
}

export default App