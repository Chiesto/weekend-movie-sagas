const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

router.get('/', (req, res) => {

  const query = `SELECT * FROM movies ORDER BY "title" ASC`;
  pool.query(query)
    .then( result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('ERROR: Get all movies', err);
      res.sendStatus(500)
    })

});

router.post('/', (req, res) => {
  console.log(req.body);
  // RETURNING "id" will give us back the id of the created movie
  const insertMovieQuery = `
  INSERT INTO "movies" ("title", "poster", "description")
  VALUES ($1, $2, $3)
  RETURNING "id";`

  // FIRST QUERY MAKES MOVIE
  pool.query(insertMovieQuery, [req.body.title, req.body.poster, req.body.description])
  .then(result => {
    console.log('New Movie Id:', result.rows[0].id); //ID IS HERE!
    
    const createdMovieId = result.rows[0].id

    // Now handle the genre reference
    const insertMovieGenreQuery = `
      INSERT INTO "movies_genres" ("movie_id", "genre_id")
      VALUES  ($1, $2);
      `
      // SECOND QUERY ADDS GENRE FOR THAT NEW MOVIE
      pool.query(insertMovieGenreQuery, [createdMovieId, req.body.genre_id]).then(result => {
        //Now that both are done, send back success!
        res.sendStatus(201);
      }).catch(err => {
        // catch for second query
        console.log(err);
        res.sendStatus(500)
      })

// Catch for first query
  }).catch(err => {
    console.log(err);
    res.sendStatus(500)
  })
});


//this router gets EVERYTHING. movie details and genre for the selected movie - stretch goal #3
router.get('/allDetails', (req, res) =>{

  //query to select the desired data from our DB tables
  const queryText = `SELECT selected_movie.id,JSON_AGG(movies.title) AS title, JSON_AGG(movies.poster) AS poster, JSON_AGG(movies.description) AS description, JSON_AGG(genres.name) AS genres FROM selected_movie
  JOIN movies ON movies.id = selected_movie.movie_id
  JOIN movies_genres ON movies.id = movies_genres.movie_id
  JOIN genres ON genres.id = movies_genres.genre_id
  GROUP BY selected_movie.id;`;

  pool.query(queryText)
    .then(response=>{
      const ourMovies = response.rows;
      // console.log('should be all of our clicked on movies=>>', ourMovies);
      res.send(ourMovies);
      
    }).catch(err=>{
      console.log('problem in the allDetails GET', err);
      res.sendStatus(500);
    })


})

router.post('/allDetails/:id', (req, res) =>{
  console.log('heres the ID being added =>', req.params);
  //query to add the movie ID to our selected_movie table
  //chose to use a new table so we can maintain a history of our requests.
  const otherQueryText = `INSERT INTO selected_movie ("movie_id")
                          VALUES ($1);`;
  pool.query(otherQueryText, [req.params.id])
    .then(response=>{
      
      res.sendStatus(200);
    }).catch(error=>{
      res.sendStatus(500);
      console.log('problems in our selected movie POST', error);
    })
})

module.exports = router;