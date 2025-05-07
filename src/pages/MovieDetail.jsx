import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

const IMG_BASE_URL = "https://image.tmdb.org/t/p/w1280";

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const API_KEY = import.meta.env.VITE_TMDB_KEY;

  const fetchMovieDetail = async () => {
    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&append_to_response=videos`
      );
      setMovie(res.data);
    } catch (error) {
      console.error("Error fetching movie detail:", error);
    }
  };

  useEffect(() => {
    fetchMovieDetail();
  }, [id]);

  if (!movie) return <p className="text-white p-10">Loading...</p>;

  const trailer = movie.videos?.results?.find(
    (vid) => vid.type === "Trailer" && vid.site === "YouTube"
  );

  return (
    <>
      <Navbar />
      <div className="bg-gray-dark-main min-h-screen pt-24 text-white px-4 md:px-20">
        <div className="flex flex-col lg:flex-row gap-6">
          <img
            src={IMG_BASE_URL + movie.backdrop_path}
            alt={movie.title}
            className="w-full lg:w-2/3 rounded-lg shadow"
          />
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
            <p className="text-gray-light mb-4">{movie.overview}</p>
            <p className="text-yellow-400 font-semibold text-lg">
              ⭐ {movie.vote_average}
            </p>
          </div>
        </div>

        {trailer && (
          <div className="mt-10">
            <h2 className="text-2xl font-bold mb-4">Trailer</h2>
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                title="Trailer"
                width="100%"
                height="500"
                src={`https://www.youtube.com/embed/${trailer.key}`}
                frameBorder="0"
                allowFullScreen
                className="rounded-md w-full"
              ></iframe>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MovieDetail;
