const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

router.get('/:id', (req, res) => {
  // Add query to get all genres

  console.log('req.paraaaaaammmmmsssssssss =>>>>>>>>>>>',req.params);
  const queryText = `SELECT movies.title, JSON_AGG(genres.name) AS genres FROM movies_genres
  JOIN movies ON movies.id = movies_genres.movie_id
  JOIN genres ON genres.id = movies_genres.genre_id
  WHERE movies.id = $1
  GROUP BY movies.title;`
  pool.query(queryText, [req.params.id])
    .then(response=>{
      console.log('should be my genre=>',response.rows[0].genres);
      res.send(response.rows[0].genres);
    }).catch(error=>{
      console.log('problems in our genre GET', error);
    })
});

module.exports = router;