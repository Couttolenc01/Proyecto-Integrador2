const games = require('../models/chess.model.js');


exports.get_game = (req, res, next) => {
    res.setHeader('Set-Cookie', `lastURL=${req.originalUrl}; HttpOnly; Max-Age=86400; SameSite=Strict`);
    console.log("cookie set to:",req.cookies.lastURL)
    res.render('game', { game: games.at(Number(req.params.id)-1) });  
  }

  exports.get_index = (req, res, next) => {
    const lastURL = req.cookies.lastURL || '/';
    if (lastURL == '/') {
      res.render('chess', { games: games });
    }
    else{
      console.log("lastURL redirected");
      console.log("Puedes visitar tu último juego acá:localhost:9000/",req.cookies.lastURL)
    }
  };
