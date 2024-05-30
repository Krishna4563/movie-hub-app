import React from "react";

const MovieList = ({ list }) => {
  return (
    <div className="border p-4 rounded shadow mb-4">
      <h2 className="text-2xl mb-4">{list.name}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {list.movies.map((movie) => (
          <div key={movie.imdbID} className="border p-2 rounded">
            <img
              src={movie.Poster}
              alt={movie.Title}
              className="w-full h-32 object-cover mb-2"
            />
            <h3 className="text-xl">{movie.Title}</h3>
            <p className="text-gray-600">{movie.Year}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieList;
