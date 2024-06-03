import React, { useState, useEffect } from "react";
import axios from "axios";
import MovieSearch from "./MovieSearch";
import MovieList from "./MovieList";
import Navbar from "./Navbar";

const Home = () => {
  const [lists, setLists] = useState([]);

  useEffect(() => {
    const fetchLists = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        const config = {
          headers: {
            "x-auth-token": token,
          },
        };
        const res = await axios.get(
          "https://movie-hub-server-nine.vercel.app/api/lists/data",
          config
        );

        const modifiedLists = res.data.map((list) => ({
          ...list,
          movies: list.movies.map((movie) => ({
            Title: movie.Title,
            Year: movie.Year,
            Poster: movie.Poster,
            imdbID: movie.imdbID,
          })),
        }));
        setLists(modifiedLists);
      }
    };

    fetchLists();

    const interval = setInterval(fetchLists, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-custom-dark-blue p-4">
      <Navbar />
      <div className="flex flex-col gap-6 justify-between items-center container p-4 bg-custom-dark-blue min-h-screen">
        <MovieSearch />
        {lists.length >= 1 && (
          <div className="mt-8">
            <h2 className="text-2xl mb-4">Your Movie Lists</h2>
            <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {lists.map((list) => (
                <MovieList key={list._id} list={list} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
