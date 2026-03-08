import React, { useEffect, useRef, useState } from 'react'
import './Titlecard.css'
import cards_data from '../../assets/cards/Cards_data'
import { Link } from 'react-router-dom';
import { useMoviecontext } from '../Contexts/Moviecontext';





const Titlecard = ({ title, genre, category }) => {


    const [apidata, setapidata] = useState([]);
    const cardsRef = useRef();

    const { isFavorite, addToFavorites, removeFavorites } = useMoviecontext()
    const [favorite, setfavorite] = useState(false)


    function onFavoriteClick(e, card) {
        e.preventDefault()

        if (isFavorite(card.id)) {
            removeFavorites(card.id)
        } else {
            addToFavorites(card)
        }
    }


    console.log(apidata)

    const handlewheel = (event) => {
        event.preventDefault();
        cardsRef.current.scrollLeft += event.deltaY;
    }
    useEffect(() => {


        console.log(import.meta.env.VITE_TMDB_KEY);

        fetch(
            `https://api.themoviedb.org/3/${genre ? genre : "movie"}/${category ? category : "now_playing"}?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&page=1`
        )
            .then(res => res.json())
            .then(data => setapidata(data.results || []))
            .catch(err => console.error(err));

        const currentRef = cardsRef.current;
        currentRef.addEventListener('wheel', handlewheel);

        return () => {
            currentRef.removeEventListener('wheel', handlewheel);
        };
    }, []);
    return (
        <div className="title-cards">
            <h2>{title ? title : "Popular on dupmov"}</h2>
            <div className="card-list" ref={cardsRef}>
                {apidata.map((card, index) => {
                    return <Link to={`/${genre ? genre : "movie"}/player/${card.id}`} className='card' key={index}>
                        <img src={`https://image.tmdb.org/t/p/w500${card.backdrop_path}`} alt="" />
                        <button
                            className={`favorite-btn-t ${isFavorite(card.id) ? 'active' : ''}`}
                            onClick={(e) => onFavoriteClick(e, card)}
                        >
                            ♥
                        </button>
                        <p>{genre === 'movie' ? card.original_title : card.original_name}</p>
                    </Link>
                })}
            </div>
        </div>
    )
}

export default Titlecard