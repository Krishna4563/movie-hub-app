import axios from "axios";

const MovieCard = ({ movie }) => {
  const handleAddToList = async () => {
    try {
      const token = localStorage.getItem("token");

      const { Title } = movie;
      const res = await axios.post(
        "https://movie-hub-server-nine.vercel.app/api/lists/add",
        {
          name: Title,
        },
        {
          headers: {
            "x-auth-token": token,
          },
        }
      );

      console.log("Movie added to list:", res.data);
    } catch (error) {
      console.error("Error adding movie to list:", error);
    }
  };

  return (
    <div className="w-full md:w-60 border p-4 rounded shadow flex flex-col justify-between bg-white transition transform hover:scale-105">
      <img
        src={movie.Poster}
        alt={movie.Title}
        className="w-full object-fit mb-4"
      />
      <h2 className="text-xl bg-white">{movie.Title}</h2>
      <p className="text-gray-600 bg-white">Year of Release: {movie.Year}</p>
      {movie.Director && (
        <p className="text-gray-600">Directed By: {movie.Director}</p>
      )}
      {movie.Plot && <p className="text-gray-600">Plot: {movie.Plot}</p>}

      <button
        onClick={handleAddToList}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Add to List
      </button>
    </div>
  );
};

export default MovieCard;
