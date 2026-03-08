import React, { useEffect, useState } from 'react'
import './Home.css'
import Navbar from '../../components/Navbar/Navbar'
import hero_banner from '../../assets/background_banner.jpg'
import play_icon from '../../assets/play_icon.png'
import info_icon from '../../assets/info_icon.png'
import Titlecard from '../../components/Titlecard/Titlecard'
import Footer from '../../components/Footer/Footer'
import search_icon from '../../assets/search_icon.svg'
import { searchMovie, getMovies } from '../../Services/api'
import MovieCard from '../../components/MovieCard/MovieCard'
import project_demo from '../../assets/project_demo.mp4'




const Home = () => {

  const [movies, setmovies] = useState([]);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState(null);
  const [searchresults, setsearchresults] = useState([]);
  const [searchLoading, setsearchLoading] = useState(false)
  const [showInfo, setshowInfo] = useState(false)
  const [ShowVideo, setShowVideo] = useState(false)


  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await getMovies();
        setmovies(response);
      } catch (error) {
        console.error('Error fetching movies:', error);
        seterror('Failed to fetch movies. Please try again later.');
      }
      finally {
        setloading(false);
      }
    }
    fetchMovies();
    console.log(movies)

  }, [])



  const [searchquery, setsearchquery] = useState('');

  useEffect(() => {
    if (!searchquery.trim()) {
      setsearchresults([]);
      setsearchLoading(false);
      return;
    }

    setsearchLoading(true);

    const delayDebounce = setTimeout(() => {
      searchMovie(searchquery)
        .then((res) => {
          setsearchresults(res);
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          setsearchLoading(false);
        });

    }, 500);

    return () => clearTimeout(delayDebounce);

  }, [searchquery]);



  return (
    <div className='home'>
      <Navbar />
      <div className="hero">
        <img src={hero_banner} alt="" className='banner-img' />
        <div className="search-box">
          <input
            className='search-text-box'
            type="text"
            placeholder='Search Movies or Shows'
            value={searchquery}
            onChange={(e) => setsearchquery(e.target.value)}
          />
          <button className='search-btn'><img src={search_icon} alt="" /></button>
        </div>
        {searchLoading && (
          <div className="search-loading">
            <div className="spinner"></div>
          </div>
        )}
        {searchresults.length > 0 ? (
          <div className="search-results">
            {searchresults.map((result) => (
              <MovieCard key={result.id} movie={result} />
            ))}
          </div>
        ) :
          <div className="hero-caption">
            <h1 className='hero-title-new'>Trailers & Clips</h1>
            <p>Discover the latest trailers and exclusive clips from your favorite movies and TV shows, all in one place.
              Stay updated with trending releases and explore a world of entertainment at your fingertips.
              Fast, immersive, and built for true fans who love the thrill of what’s coming next. 🎬</p>
            {showInfo && (
              <div className="info-overlay" onClick={() => setshowInfo(false)}>

                <div
                  className="info-modal"
                  onClick={(e) => e.stopPropagation()}
                >
                  <h2>About Our Platform</h2>
                  <p>
                    Our platform brings you the latest trailers and exclusive clips
                    from movies and TV shows across every genre. Discover trending
                    releases, upcoming premieres, and hidden gems all in one place.
                    Designed for entertainment lovers, we make it easy to explore,
                    search, and stay updated with what’s streaming now and what’s
                    coming next.
                  </p>

                  <button
                    className="close-btn"
                    onClick={() => setshowInfo(false)}
                  >
                    Close
                  </button>
                </div>

              </div>
            )}
            {ShowVideo && (
              <div
                className="video-overlay"
                onClick={() => setShowVideo(false)}
              >
                <div
                  className="video-modal"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    className="video-close"
                    onClick={() => setShowVideo(false)}
                  >
                    ✕
                  </button>

                  <iframe
                    width="100%"
                    height="400"
                    src={project_demo}
                    title="Trailer"
                    frameBorder="0"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            )}
            <div className="hero-btns">
              <button
                className='btn'
                onClick={() => setShowVideo(true)}
              ><img src={play_icon} alt="" />Play</button>
              <button
                className='btn dark-btn'
                onClick={() => setshowInfo(true)}
              >
                <img src={info_icon} alt="" />More Info</button>
            </div>

          </div>
        }
      </div >
      <Titlecard title="Trending Now" genre='movie' category="popular" />
      <Footer />
    </div>
  )
}

export default Home