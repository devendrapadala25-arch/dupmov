import React from 'react'
import './New&Popular.css'
import Navbar from '../../components/Navbar/Navbar'
import hero_banner from '../../assets/background_banner.jpg'
import play_icon from '../../assets/play_icon.png'
import info_icon from '../../assets/info_icon.png'
import Titlecard from '../../components/Titlecard/Titlecard'
import Footer from '../../components/Footer/Footer'


const New_Popular = () => {
  return (
    <div className='new&popular'>
      <Navbar/>
      <div className="hero">
        <img src={hero_banner} alt="" className='banner-img'/>
        <div className="hero-caption">
          <h1 className='hero-title-new'>Popular Trailers & Clips</h1>
          <p>Stay ahead of the trends with the latest and most popular movies and TV shows.
Explore new releases, fan favorites, and timeless hits all in one place.
Watch trailers, clips, and discover the entertainment everyone is talking about.</p>
          
          <Titlecard genre={'movie'}/>
        </div>
      </div>
      <div className="more-cards">
        <Titlecard title={'New Movies'} genre={'movie'} category={'top_rated'}/>
        <Titlecard title={'Popular Movies'} genre={'movie'} category={'popular'}/>
        <Titlecard title={'New Tv Shows'} genre={'tv'} category={'top_rated'}/>
        <Titlecard title={'Popular Tv Shows'} genre={'tv'} category={'popular'}/>
      </div>
      <Footer />
    </div>
  )
}

export default New_Popular