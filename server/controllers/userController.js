const axios = require('axios');
require('dotenv').config();
const api_id = process.env.BGA_ID;

const user = {};

user.searchInput = async (req, res, next) => {
  const {value} = req.body;
  const searchUrl = `https://api.boardgameatlas.com/api/search?name=${value}&client_id=${api_id}`;
  const result = await searchApi(searchUrl);
  console.log(result)
  res.locals.searchResult = result;
  
  return next()
};

async function searchApi(url) {
 const output = [];
 try{
   const response = await axios.get(url)
   const games = response.data.games;
   
   for(let game of games){
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
      thumb_url: game.thumb_url,
      url: game.url,
      current_price: game.price
    }

     output.push(gameInfo);
   }
   return output
 } catch(err) {
   console.error('Error in search api:', err)
 }
}

module.exports = user;