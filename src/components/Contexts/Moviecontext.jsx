import { createContext, useState, useContext,useEffect } from "react";

const Moviecontext = createContext()

export const useMoviecontext = () => useContext(Moviecontext)

export const MovieProvider = ({children}) => {

    const [favorites,setfavorites] = useState([])

    useEffect(() => {
        const storedFavs = localStorage.getItem('favorites')

        if (storedFavs) setfavorites(JSON.parse(storedFavs))

    },[])

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites))
    },[favorites])

    const addToFavorites = (movie) => {
        setfavorites(prev => [...prev,movie])
    }

    const removeFavorites = (movieId) => {
        setfavorites(prev => prev.filter(movie => movie.id !== movieId))
    }

    const isFavorite = (movieId) => {
        return favorites.some(movie => movie.id === movieId)
    }


    const value ={
        favorites,
        addToFavorites,
        removeFavorites,
        isFavorite
    }

    return <Moviecontext.Provider value={value}>
        {children}
    </Moviecontext.Provider>
}