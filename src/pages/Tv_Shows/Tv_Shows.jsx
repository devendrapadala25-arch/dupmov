import React from 'react'
import './Tv_Shows.css'
import Navbar from '../../components/Navbar/Navbar'
import hero_banner from '../../assets/background_banner.jpg'
import play_icon from '../../assets/play_icon.png'
import info_icon from '../../assets/info_icon.png'
import Titlecard from '../../components/Titlecard/Titlecard'
import Footer from '../../components/Footer/Footer'


const Tv_Shows = () => {
  return (
    <div className='Tv_Shows'>
      <Navbar/>
      <div className="hero">
        <img src={hero_banner} alt="" className='banner-img'/>
        <div className="hero-caption">
          <h1 className='hero-title-new'>Tv Shows Trailers & Clips</h1>
          <p>Discover the best TV shows from all genres, from gripping dramas to hilarious comedies.
Catch the latest episodes, trending series, and timeless favorites in one place.
Explore trailers, clips, and stay up-to-date with the shows everyone is talking about.</p>
          <Titlecard genre={'tv'} category={'popular'} />
        </div>
      </div>
      <div className="more-cards">
        <Titlecard title={'Blockbuster Movies'} genre={'tv'} category={'airing_today'}/>
        <Titlecard title={'Only on dupmov'} genre={'tv'} category={'on_the_air'}/>
        <Titlecard title={'Upcoming'} genre={'tv'} category={'popular'}/>
        <Titlecard title={'Top Picks for You'} genre={'tv'} category={'top_rated'}/>
      </div>
      <Footer />
    </div>
  )
}

export default Tv_Shows