const connection = require('../util/database');
const games = [];

const queryPromise = new Promise((resolve, reject) => {
  connection.query('SELECT * FROM games', (error, results, fields) => {
    if (error) {
      console.error('Error buscando games: ' + error.stack);
      reject(error);
      return;
    }

    results.forEach(game => {
      const gameData = {
        id: game.id,
        white: game.white,
        black: game.black,
        ratingWhite: game.ratingWhite,
        ratingBlack: game.ratingBlack,
        moves: game.moves
      };

      games.push(gameData);
    });

    resolve();
  });
});

queryPromise.then(() => {
  console.log('Query finalizada.');
  connection.end();
}).catch(error => {
  console.error('Error en la query:', error);
});

module.exports = games;
