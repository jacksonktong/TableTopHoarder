const axios = require('axios');
require('dotenv').config();
const api_id = process.env.BGA_ID;

const gotmUrl = `https://api.boardgameatlas.com/api/search?ids=RLlDWHh7hR&pretty=true&client_id=${api_id}`

const homePage = {};

async function getGotm(url){
  try {
  const response = await axios.get(url);
  const game = response.data.games[0]
    const gameInfo = {
      id: game.id,
      name: game.name,
      year_published: game.year_published,
      min_players: game.min_players,
      max_players: game.max_players,
      min_length: game.min_playtime,
      max_length: game.max_playtime,
      description_preview: game.description_preview,
      image_url: game.image_url,
      url: game.url,
      current_price: game.price
    }
    return gameInfo;
  }
  catch(err){
    console.error('Error in getting gotm:', err)
  }
}

homePage.gameOfTheMonth = async (req, res, next) => {
  const gameDetails = await getGotm(gotmUrl);

  res.locals.gotm = gameDetails;

  return next();

};

module.exports = homePage;