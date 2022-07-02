import React, { useEffect, useState } from "react";
import GameDetails from "./GameDetails.jsx";

export default function FeaturedGame() {
  const [featuredGame, setFeaturedGame] = useState('');

  useEffect(()=> {
    getFeaturedGameInfo();
  }, [])

  function getFeaturedGameInfo() {
    fetch('/api/home')
      .then((res)=> res.json())
      .then((data)=> {
        console.log('gotm data', data)
        setFeaturedGame(data)
      })
      .catch((err)=> console.error('Error in getting gotm:', err))
  }

  return (
    <div>
      <h1>{featuredGame.name}</h1>
      <img src={featuredGame.image_url} alt='Gotm'/>
      <GameDetails
        featuredGame={featuredGame}
      />
    </div>
  )

};