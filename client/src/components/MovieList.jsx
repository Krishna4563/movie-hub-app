import React from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ list }) => {
  return (
    <div className="border p-4 rounded shadow mb-4 bg-white text-black">
      <h2 className="text-2xl mb-4">{list.name}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {list.movies.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default MovieList;
