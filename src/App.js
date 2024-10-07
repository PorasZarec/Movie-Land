import { useEffect, useState } from "react";

import MovieCard from "./MovieCard";

import "./App.css";
import SearchIcon from "./search.svg";

const API_URL = "http://www.omdbapi.com?apikey=8cbf9c1d";

const App = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');


//   const searchMovies = async (title) => {
//     const response = await fetch(`${API_URL}&s=${title}`);
//     const data = await response.json();

//     setMovies(data.Search);
//   };

const searchMovies = async (search, pages = 10) => {
    let allMovies = [];
    for (let page = 1; page <= pages; page++) {
        const response = await fetch(`${API_URL}&s=${search}&page=${page}`);
        const data = await response.json();
        
        if (data.Search) {
            allMovies = allMovies.concat(data.Search);
        } else {
            break;
        }
    }
    setMovies(allMovies);
};


  useEffect(() => {
    // searchMovies("Superman");
  }, []);

  return (
    <div className="app">
      <h1>MovieLand</h1>

      <div className="search">
        <input
          placeholder="Search for movies"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <img
            src={SearchIcon}
            alt="search"
            onClick={() => searchMovies(searchTerm)}
        />
      </div>

        {movies?.length > 0
            ? (
                <div className="container">
                    {movies.map((movie) => (
                        <MovieCard movie={movie}/>
                    ))}
                </div>
            ) : (
                <div className="empty">
                    <h2>No movies found</h2>
                </div>
            )}
     </div>
  );
};

export default App;
