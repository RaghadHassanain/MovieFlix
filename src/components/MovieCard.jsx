import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';

const MovieCard = ({ movie }) => {
  const {
    id,
    title,
    poster_path,
    vote_average,
    release_date,
    overview,
  } = movie;

  const imageUrl = poster_path
    ? `https://image.tmdb.org/t/p/w500${poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Image';

  return (
    <Link to={`/movie/${id}`} className="group">
      <div className="movie group">
        <img
          src={imageUrl}
          alt={title}
          className="h-[450px] w-full object-cover rounded-t"
        />

        <div className="movie-info">
          <h3 className="font-semibold truncate w-[200px]">{title}</h3>
          <span className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            {vote_average?.toFixed(1) || 'N/A'}
          </span>
        </div>

        <div className="movie-over">
          <div className="text-center">
            <h2 className="text-lg font-bold mb-2">{title}</h2>
            <p className="text-sm leading-snug mb-3">
              {overview ? overview.slice(0, 150) + '...' : 'No overview available'}
            </p>
            <div className="text-xs text-gray-600 dark:text-gray-300">
              Year: {release_date?.split('-')[0] || 'N/A'}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
