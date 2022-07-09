import React from "react";

export default function AddToCollection(props) {
  const { id, name, year_published, min_players, max_players, min_length, max_length, description_preview, image_url, thumb_url, url } = props.featuredGame
  
  function handleSubmit() {
    const gameInfo = {
      game_id: id,
      name: name,
      year_published: year_published,
      min_players: min_players,
      max_players: max_players,
      min_length: min_length,
      max_length: max_length,
      description_preview: description_preview,
      image_url: image_url,
      thumb_url: thumb_url,
      url: url,
      collection: true
    }

    fetch('/api/catalog', {
      method: "POST",
      header: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify(gameInfo)
    })
      .then((res) => res.json())
      .catch((err)=> console.error('Error in add to collection:', err))
  };

  return (
    <div>
      <button onClick={handleSubmit}>Add to Collection</button>
    </div>
  )
}