import React, { useEffect, useState } from 'react'
import './Player.css'
import back_arrow_icon from '../../assets/back_arrow_icon.png'
import { useNavigate, useParams } from 'react-router-dom'

const Player = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const [apiData, setApiData] = useState({})

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNjEyYmMyNmVkNzNjYzFlN2UzZTU3NTM0ODNiYTdiZCIsIm5iZiI6MTc3OTQ0NzAwMi4xOTEsInN1YiI6IjZhMTAzNGRhOWJkNzMxZjU2ODYzNzBhZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KZZ-EIoQwMuKJFSg7PY_cY3B4itRQw-T3uu_VlnXtAU'
    }
  };

  useEffect(() => {

    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
      .then(res => res.json())
      .then(res => {

        const videos = res?.results || [];

        // 🔥 more flexible trailer match
        const trailer = videos.find(v =>
          v.site?.toLowerCase() === "youtube" &&
          (v.type?.toLowerCase() === "trailer" || v.type?.toLowerCase() === "teaser")
        );

        setApiData(trailer || {});

      })
      .catch(err => console.error(err));

  }, [id]);

  return (
    <div className="player">

      <img
        src={back_arrow_icon}
        alt="back" 
        onClick={() => window.history.back()}
        style={{ cursor: "pointer" }}
        onAbort={()=>{navigate(-2)}}
      />

      {apiData.key ? (
        <iframe
          width="90%"
          height="90%"
          src={`https://www.youtube.com/embed/${apiData.key}`}
          title="Trailer"
          frameBorder="0"
          allowFullScreen
        />
      ) : (
        <p style={{ color: "white" }}>
          No trailer available for this movie
        </p>
      )}

      <div className="player-info">
        <p>{apiData.published_at?.slice(0, 10)}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
      </div>

    </div>
  )
}

export default Player