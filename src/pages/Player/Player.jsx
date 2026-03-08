import React, { useEffect, useState } from 'react';
import './Player.css';
import back_arrow_icon from '../../assets/back_arrow_icon.png';
import { useNavigate, useParams } from 'react-router-dom';

const Player = () => {
  const { genre, id } = useParams();
  const navigate = useNavigate();
  const [apidata, setapidata] = useState({
    name: "",
    key: "",
    published_at: "",
    type: ""
  });

  useEffect(() => {
    if (!genre || !id) return;

    // Use backend proxy
    const path = `${genre}/${id}/videos`;
    const params = new URLSearchParams({ language: "en-US" });

    fetch(`/api/tmdb?path=${path}&${params.toString()}`)
      .then(res => res.json())
      .then(res => {
        const trailer = res.results.find(
          video => video.site === "YouTube" && ["Trailer", "Teaser", "Clip"].includes(video.type)
        );
        if (trailer) setapidata(trailer);
        else console.log("No YouTube trailer found");
      })
      .catch(err => console.error("Error fetching videos:", err));

  }, [genre, id]);

  return (
    <div className='player'>
      <img src={back_arrow_icon} alt="" onClick={() => navigate(-1)} />
      {apidata.key ? (
        <iframe
          width='90%'
          height='90%'
          src={`https://www.youtube.com/embed/${apidata.key}`}
          title='trailer'
          frameBorder="0"
          allowFullScreen
        ></iframe>
      ) : (
        <p>Trailer not available</p>
      )}
      <div className="player-info">
        <p>{apidata.published_at ? apidata.published_at.slice(0, 10) : "N/A"}</p>
        <p>{apidata.name || "N/A"}</p>
        <p>{apidata.type || "N/A"}</p>
      </div>
    </div>
  );
};

export default Player;