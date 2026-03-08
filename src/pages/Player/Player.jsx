import React, { useEffect, useState } from 'react'
import './Player.css'
import back_arrow_icon from '../../assets/back_arrow_icon.png'
import { useNavigate, useParams } from 'react-router-dom'

const Player = () => {

  const {genre,id} = useParams();
  console.log(genre,id);

  const navigate = useNavigate();

  const [apidata,setapidata]=useState({
    name: "",
    key: "",
    published_at: "",
    type: ""
  })

  const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyOWM0ZDJhMDE4ZGVlMmZmMjdhMGM3ZGM1NDQzNzRiZCIsIm5iZiI6MTc3MTU5MjUyNS44MDA5OTk5LCJzdWIiOiI2OTk4NWI0ZGE4MGJiYjI1MzQzMDI2ZjAiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.bgNcpTl3cODWtUR1OB4mvOXa-4WiIWLr3bb1Z1uMRjM'
  }
};


 
useEffect(() => {

  if (!genre || !id) return;

  fetch(`https://api.themoviedb.org/3/${genre}/${id}/videos?language=en-US`, options)
    .then(res => res.json())
    .then(res => {

      const trailer = res.results.find(
        video => video.site === "YouTube" && (video.type === "Trailer" || video.type === "Teaser" || video.type === "Clip")
      );

      if (trailer) {
        setapidata(trailer);
      } else {
        console.log("No YouTube trailer found");
      }

    })
    .catch(err => console.error(err));

}, [genre, id]);






  return (
    <div className='player'>
      <img src={back_arrow_icon} alt="" onClick={()=> {navigate(-1)}}/>
      <iframe width='90%' height='90%' src={`https://www.youtube.com/embed/${apidata.key}`} 
      title='trailer' frameBorder="0" allowFullScreen></iframe>
      <div className="player-info">
        <p>{apidata.published_at.slice(0,10)}</p>
        <p>{apidata.name}</p>
        <p>{apidata.type}</p>
      </div>
    </div>
  )
}

export default Player