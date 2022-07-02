import React from "react";

export default function GameDetails(props) {
  const { id, year_published, min_players, max_players, min_length, max_length, description_preview, url, current_price } = props.featuredGame
  console.log('description', description_preview)

  return (
    <div>
      <h2>Details & Description</h2>
      <ul>
        <li>Number of Players: {min_players} - {max_players}</li>
        <li>Average Game Time: {min_length} - {max_length}</li>
        <li>Description: {description_preview}</li>
        <li>Current Price: {current_price} <a href={url}>Click to Purchase</a></li>
      </ul>
    </div>
  );
};