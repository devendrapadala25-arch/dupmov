import React from 'react'
import './Movies.css'
import Navbar from '../../components/Navbar/Navbar'
import hero_banner from '../../assets/background_banner.jpg'
import play_icon from '../../assets/play_icon.png'
import info_icon from '../../assets/info_icon.png'
import Titlecard from '../../components/Titlecard/Titlecard'
import Footer from '../../components/Footer/Footer'


const Movies = () => {
  return (
    <div className='movies'>
      <Navbar/>
      <div className="hero">
        <img src={hero_banner} alt="" className='banner-img'/>
        <div className="hero-caption">
          <h1 className='hero-title-new'>Movies Trailers & Clips </h1>
          <p>Explore the world of cinema with the latest and greatest movies across every genre.
Stay updated on new releases, trending hits, and timeless classics all in one place.
Dive into trailers, clips, and discover films that keep you entertained and inspired.</p>
          
          <Titlecard genre={'movie'}/>
        </div>
      </div>
      <div className="more-cards">
        <Titlecard title={'Blockbuster Movies'} genre={'movie'} category={'top_rated'}/>
        <Titlecard title={'Only on dupmov'} genre={'movie'} category={'popular'}/>
        <Titlecard title={'Upcoming'} genre={'movie'} category={'upcoming'}/>
        <Titlecard title={'Top Picks for You'} genre={'movie'} category={'now_playing'}/>
      </div>
      <Footer />
    </div>
  )
}

export default Movies