const axios = require('axios');
const { query } = require('express');
const pool = require("../models/usersModel.js");
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

user.saveToCatalog = async (req, res, next) => {
  const { game_id, name, year_published, min_players, max_players, min_length, max_length, description_preview, image_url, thumb_url, url } = req.body;
  const { username } = req.cookies;
  const queryString = 
  `INSERT INTO tt_games (game_id, name, year_published, min_players, max_players, min_length, max_length, description_preview, image_url, thumb_url, url)
   VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
  `
  const collectQueryString = 
  `INSERT INTO collection (user_id, game_id) 
   VALUES ($1, $2)
  `
  const wishlistQueryString = 
  `INSERT INTO wishlist (user_id, game_id) 
   VALUES ($1, $2)
  `
  try{
    //gets userid from users
    const userid = await getUserId(username)
    //need to get game details from tt_games, then we save into collection
    const gameid = await getGameId(game_id)
    pool.query(queryString, [game_id, name, year_published, min_players, max_players, min_length, max_length, description_preview, image_url, thumb_url, url])

    if(req.body.collection) pool.query(collectQueryString, [userid, gameid]);
    if(req.body.wishlist) pool.query(wishlistQueryString, [userid, gameid]);

    return next();

  } catch(err) {
    console.error("Error:", err)
  }

  async function getUserId(username) {
    const queryString = 
    `SELECT user_id FROM users
     WHERE username = $1
    `
    try{
    const record = await pool.query(queryString, [username])
    return record.rows[0].user_id;
    } catch(err) {
      console.error('Error in retrieving user id:', err)
    }
  }

  async function getGameId(gameId) {
    const queryString = 
    `SELECT id FROM tt_games
     WHERE game_id = $1
    `
    try{
      const record = await pool.query(queryString, [gameId])
      return record.rows[0].id
    } catch(err) {
      console.error('Error in retrieving game id')
    }
  }

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