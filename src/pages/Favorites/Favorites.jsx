import React from 'react'
import './Favorites.css'
import { useMoviecontext } from '../../components/Contexts/Moviecontext'
import MovieCard from '../../components/MovieCard/MovieCard'
import Navbar from '../../components/Navbar/Navbar'
import hero_banner from '../../assets/background_banner.jpg'
import Footer from '../../components/Footer/Footer'
import Titlecard from '../../components/Titlecard/Titlecard'
import { useNavigate } from 'react-router-dom'



const Favorites = () => {


    const { favorites } = useMoviecontext();
    const navigate = useNavigate();

    return (
        <div className='favourites-f'>
            <Navbar />
            <div className="hero">
                <img src={hero_banner} alt="" className='banner-img' />
                <div className="favorites">
                    {favorites.length > 0  ?(
                        <div >
                            <h1 className='h1-f'>Your Favorites</h1>
                            <div className="movies-grid-f">
                                {favorites.map((movie) => (
                                    <MovieCard movie={movie} key={movie.id} />
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="favorties-empty">
                            <h1 className='h1-f'>No Favorite Movies Yet</h1>
                            <div className='p-f'>
                                <p>Start adding movies to your favorites and they will apear here</p>
                                <p >for Movies ={`>`} <a onClick={() => {navigate('/movies')}}>Click Here</a></p>
                                <p >for Tv Shows ={`>`} <a onClick={() => {navigate('/tv-Shows')}}>Click Here</a></p>
                            </div>
                            <Titlecard title="Suggested Movies" genre={'movie'} category="popular" />
                            <Titlecard title={'Suggested TV shows'} genre={'tv'} category={'top_rated'}/>
                        </div>
                    )
                        
                    }
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Favorites