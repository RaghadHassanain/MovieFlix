import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

function getTagColor(vote) {
  if (vote >= 8) return "green";
  if (vote >= 6) return "orange";
  return "red";
}

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(
          `${BASE_URL}/movie/${id}?api_key=${API_KEY}&append_to_response=videos`
        );
        setMovie(response.data);
      } catch (error) {
        setError('Failed to fetch movie details. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchMovieDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-light dark:bg-gray-dark-main">
        <div className="max-w-4xl mx-auto pt-28 pb-12 px-4">
          <div className="flex flex-col md:flex-row gap-10 bg-white dark:bg-gray-dark-second rounded-lg shadow-md p-6 animate-pulse">
            <div className="w-full md:w-1/3 flex-shrink-0 flex justify-center items-start">
              <div className="w-full max-w-xs h-80 bg-gray-200 dark:bg-gray-700 rounded-lg" />
            </div>
            <div className="w-full md:w-2/3 space-y-4">
              <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full" />
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6" />
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3" />
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-full mt-8" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-light dark:bg-gray-dark-main">
        <div className="max-w-4xl mx-auto pt-32 pb-12 px-4">
          <div className="flex flex-col items-center justify-center py-16">
            <div className="text-2xl text-red-main font-semibold mb-4">{error}</div>
            <button className="btn-danger" onClick={() => window.location.reload()}>
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen bg-gray-light dark:bg-gray-dark-main">
        <div className="text-center text-xl text-gray-400 pt-32">
          Movie not found
        </div>
      </div>
    );
  }

  const trailer = movie.videos?.results?.find(
    (vid) => vid.type === 'Trailer' && vid.site === 'YouTube'
  );

  return (
    <div className="min-h-screen bg-gray-light dark:bg-gray-dark-main">
      <div className="max-w-4xl mx-auto pt-28 pb-12 px-4">
        <div className="flex flex-col md:flex-row gap-10 bg-white dark:bg-gray-dark-second rounded-lg shadow-md p-6">
          <div className="w-full md:w-1/3 flex-shrink-0 flex justify-center items-start">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full max-w-xs rounded-lg shadow-lg object-cover"
              style={{height: 450}}
            />
          </div>
          <div className="w-full md:w-2/3">
            <div className="flex items-center gap-4 mb-4">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white m-0">{movie.title}</h1>
              <span className={`tag ${getTagColor(movie.vote_average)}`} style={{display: 'flex', alignItems: 'center', marginLeft: 12}}>
                <span style={{color: '#FFD600', fontSize: 18, marginRight: 4}}>★</span>
                {movie.vote_average.toFixed(1)}
              </span>
            </div>
            <span className="text-gray-400 text-base ml-2">
              ({movie.vote_count} votes)
            </span>
            <p className="text-gray-700 dark:text-gray-300 mb-6 text-base leading-relaxed mt-4">{movie.overview}</p>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Release Date</h3>
                <p className="text-gray-900 dark:text-white">{new Date(movie.release_date).toLocaleDateString()}</p>
              </div>
              <div>
                <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Runtime</h3>
                <p className="text-gray-900 dark:text-white">{movie.runtime} minutes</p>
              </div>
              <div>
                <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Genres</h3>
                <p className="text-gray-900 dark:text-white">{movie.genres.map(genre => genre.name).join(', ')}</p>
              </div>
              <div>
                <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Language</h3>
                <p className="text-gray-900 dark:text-white">{movie.original_language.toUpperCase()}</p>
              </div>
            </div>
            {trailer && (
              <div className="w-10/12 md:w-3/5 mx-auto my-3">
                <div
                  className="embed-responsive embed-responsive-16by9 relative w-full overflow-hidden rounded-xl"
                  style={{ paddingTop: '56.25%' }}
                >
                  <iframe
                    className="embed-responsive-item absolute top-0 right-0 bottom-0 left-0 h-full w-full"
                    src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1&mute=1`}
                    allowFullScreen
                    title="YouTube video"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails; 