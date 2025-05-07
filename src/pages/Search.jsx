import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import MovieCard from '../components/MovieCard';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const searchMovies = async () => {
      if (!query) return;
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(
          `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
        );
        setMovies(response.data.results);
      } catch (error) {
        setError('Failed to search movies. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    searchMovies();
  }, [query]);

  return (
    <div className="pt-20 min-h-screen bg-white dark:bg-gray-dark-main">
      <div className="max-w-6xl mx-auto py-6 px-2 md:px-0">
        {error ? (
          <div className="text-center my-10">
            <div className="text-red-main font-bold text-2xl mb-4">{error}</div>
            <button className="btn-danger" onClick={() => window.location.reload()}>
              Retry
            </button>
          </div>
        ) : loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, idx) => (
              <div key={idx} className="movie bg-gray-200 dark:bg-gray-700" style={{height: 510}}></div>
            ))}
          </div>
        ) : (!movies || movies.length === 0) ? (
          <div className="text-center text-gray-400 text-xl my-10">No movies found</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search; 