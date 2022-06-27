const pool = require("../models/usersModel.js");
const bcrypt = require('bcrypt');


const auth = {};

function hash(str) {
  const saltRounds = 10;
  return bcrypt.hash(str, saltRounds);
}

auth.createUser = async (req, res, next) => {
  const {username, password} = req.body;
  const queryString = 
  `INSERT INTO users (username, password) 
   VALUES ($1, $2)
   `
  const hashPw = await hash(password);

  pool.query(queryString, [username, hashPw])
    .then(()=> next())
    .catch((e)=> {
      //Need better error catching for when user already exists or if other error occurs
      console.log('Error in creating user:', e)
    })
};

auth.userLogin = async (req, res, next) => {
  const {username, password} = req.body;
  const queryString = 
    `SELECT * FROM users
     WHERE username = $1
     `
  try{
    const record = await pool.query(queryString, [username]);
    const user = record.rows[0];
    let auth = false;
    if(user){
      auth = await bcrypt.compare(password, user.password);
      console.log('auth:', auth)
      if(!auth) return res.json({message: 'Invalid information'});
      res.locals.username = user.username;
      res.locals.authenticated = auth;
      res.cookie('id', username, {httpOnly: true});
      return next();
    }
  } catch(e){
    return next(e)
  }
};

auth.userLogout = (req, res, next) => {
  res.clearCookie('id');
  return next();
};

module.exports = auth;