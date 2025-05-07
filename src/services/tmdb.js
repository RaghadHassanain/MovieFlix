import axios from 'axios';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

const tmdbApi = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

export const getTrendingMovies = async () => {
  try {
    const response = await tmdbApi.get('/trending/movie/week');
    return response.data;
  } catch (error) {
    console.error('Error fetching trending movies:', error);
    throw error;
  }
};

export const getMovieDetails = async (movieId) => {
  try {
    const response = await tmdbApi.get(`/movie/${movieId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw error;
  }
};

export const searchMovies = async (query) => {
  try {
    const response = await tmdbApi.get('/search/movie', {
      params: { query },
    });
    return response.data;
  } catch (error) {
    console.error('Error searching movies:', error);
    throw error;
  }
};

export const getPopularMovies = async () => {
  try {
    const response = await tmdbApi.get('/movie/popular');
    return response.data;
  } catch (error) {
    console.error('Error fetching popular movies:', error);
    throw error;
  }
};

export const getUpcomingMovies = async () => {
  try {
    const response = await tmdbApi.get('/movie/upcoming');
    return response.data;
  } catch (error) {
    console.error('Error fetching upcoming movies:', error);
    throw error;
  }
}; 