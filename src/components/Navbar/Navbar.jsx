import React, { useEffect, useRef, useState } from 'react'
import './Navbar.css'
import logo from '../../assets/logo.png'
import search_icon from '../../assets/search_icon.svg'
import bell_icon from '../../assets/bell_icon.svg'
import profile_image from '../../assets/profile_image.png'
import caret_icon from '../../assets/caret_icon.svg'
import { logout } from '../../firebase'
import { useNavigate } from 'react-router-dom'
import { searchMovie, getMovies } from '../../Services/api'
import MovieCard from '../../components/MovieCard/MovieCard'



const Navbar = () => {




  const navref = useRef();
  const [searchresults, setsearchresults] = useState([]);
  const [searchLoading, setsearchLoading] = useState(false);
  const [searchquery, setsearchquery] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY >= 80) {
        navref.current.classList.add('nav-dark')
      } else {
        navref.current.classList.remove('nav-dark')
      }
    })
  }, [])

  

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
    <div ref={navref} className='navbar'>
      <div className='navbar-left'>
        <img src={logo} alt="" className='navbar-logo' />
        <ul>
          <li onClick={() => navigate('/')} >Home</li>
          <li onClick={() => navigate('/tv-shows')}>TV Shows</li>
          <li onClick={() => navigate('/movies')}>Movies</li>
          <li onClick={() => navigate('/new&popular')} >New & Popular</li>
          <li onClick={() => navigate('/favorites')}>My Lists</li>
          <li>Browse by Languages</li>
        </ul>
      </div>
      <div className='navbar-right'>


        <div className="search-box-n">
          <input
            className='search-text-box-n'
            type="text"
            placeholder='Search Movies or Shows'
            value={searchquery}
            onChange={(e) => setsearchquery(e.target.value)}
          />
          <button className='search-btn-n'><img src={search_icon} alt="" /></button>
        </div>
        {searchLoading && (
          <div className="search-loading-n">
            <div className="spinner-n"></div>
          </div>
        )}
        {searchquery.trim() && (
          <>
            {searchLoading && (
              <div className="search-loading-n">
                <div className="spinner-n"></div>
              </div>
            )}

            {!searchLoading && searchresults.length > 0 && (
              <div className="search-results-n">
                {searchresults.map((result) => (
                  <MovieCard key={result.id} movie={result} />
                ))}
              </div>
            )}

            {!searchLoading && searchresults.length === 0 && (
              <div className="no-results-n">
                <p>No results found</p>
              </div>
            )}
          </>
        )}
        <img src={bell_icon} alt="" className='icons' />
        <div className="navbar-profile">
          <img src={profile_image} alt="" className='profile' />
          <img src={caret_icon} alt="" className='caret-icon' />
          <div className='dropdown'>
            <p onClick={() => { logout() }}>Sign Out of Dupmov</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar