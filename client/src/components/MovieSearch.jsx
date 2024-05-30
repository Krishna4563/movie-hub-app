import React, { useState } from "react";
import axios from "axios";
import MovieCard from "./MovieCard";

const MovieSearch = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();

    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      return;
    }

    try {
      const res = await axios.get(
        `http://www.omdbapi.com/?s=${trimmedQuery}&apikey=ce8d773a`
      );

      if (res.data.Response === "True") {
        setMovies(res.data.Search);
      } else {
        setMovies([]);
      }
    } catch (error) {
      console.error("Error fetching movie data:", error);
      setMovies([]);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <form onSubmit={handleSearch} className="mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="p-2 border rounded w-full bg-white text-black md:w-96"
          placeholder="Search for a movie..."
        />
      </form>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {movies &&
          movies.map((movie) => <MovieCard key={movie.imdbID} movie={movie} />)}
      </div>
    </div>
  );
};

export default MovieSearch;
