import React from 'react'
import './MovieCard.css'
import { Link } from 'react-router-dom'
import { useMoviecontext } from '../Contexts/Moviecontext'

const MovieCard = ({ movie }) => {

  const {isFavorite, addToFavorites, removeFavorites} = useMoviecontext()
  const favorite = isFavorite(movie.id)

  function onFavoriteClick(e) {
    e.preventDefault()
    if (favorite) removeFavorites(movie.id)
    else addToFavorites(movie)
  }

  return (
    <Link to={`/movie/player/${movie.id}`} className='movie-card'>
      
      <div className="movie-poster">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />

        
        <div className="movie-overlay">
          <button className={`favorite-btn ${favorite ? 'active' : ''} `} onClick={onFavoriteClick}>♥</button>
          <h3>{movie.title}</h3>
          <p>

            {movie.release_date
                ? new Date(movie.release_date).getFullYear()
                : "N/A"}
                </p>
        </div>
      </div>

    </Link>
  )
}

export default MovieCard