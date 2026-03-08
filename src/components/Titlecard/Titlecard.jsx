import React, { useEffect, useRef, useState } from 'react';
import './Titlecard.css';
import { Link } from 'react-router-dom';
import { useMoviecontext } from '../Contexts/Moviecontext';

const Titlecard = ({ title, genre, category, searchQuery }) => {
    const [apidata, setapidata] = useState([]);
    const cardsRef = useRef();

    const { isFavorite, addToFavorites, removeFavorites } = useMoviecontext();

    const handleFavoriteClick = (e, card) => {
        e.preventDefault();
        if (isFavorite(card.id)) removeFavorites(card.id);
        else addToFavorites(card);
    };

    const handleWheel = (e) => {
        e.preventDefault();
        cardsRef.current.scrollLeft += e.deltaY;
    };

    useEffect(() => {
        let path = genre ? `${genre}/${category || "popular"}` : "movie/now_playing";
        // If search query exists, override path
        if (searchQuery) path = "search/movie";

        const params = new URLSearchParams(
            searchQuery ? { query: searchQuery } : { language: "en-US", page: 1 }
        );

        fetch(`/api/tmdb?path=${path}&${params.toString()}`)
            .then(res => res.json())
            .then(data => setapidata(data.results || []))
            .catch(err => console.error("Error fetching movies:", err));

        const currentRef = cardsRef.current;
        currentRef.addEventListener('wheel', handleWheel);

        return () => currentRef.removeEventListener('wheel', handleWheel);
    }, [genre, category, searchQuery]);

    return (
        <div className="title-cards">
            <h2>{title || "Popular on dupmov"}</h2>
            <div className="card-list" ref={cardsRef}>
                {apidata.map((card, index) => (
                    <Link
                        key={index}
                        to={`/${genre || "movie"}/player/${card.id}`}
                        className="card"
                    >
                        <img
                            src={`https://image.tmdb.org/t/p/w500${card.backdrop_path}`}
                            alt={genre === "movie" ? card.original_title : card.original_name}
                        />
                        <button
                            className={`favorite-btn-t ${isFavorite(card.id) ? 'active' : ''}`}
                            onClick={(e) => handleFavoriteClick(e, card)}
                        >
                            ♥
                        </button>
                        <p>{genre === "movie" ? card.original_title : card.original_name}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Titlecard;