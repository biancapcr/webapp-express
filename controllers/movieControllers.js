// importazione della connessione MySQL
const db_connection = require("../data/db.js"); 

const index = (req, res) => {
  // query => selezione di tutti i film dalla tabella "movies"
  const query = `SELECT * FROM movies`;

  // esecuzione della query con callback
  db_connection.query(query, (err, results) => {
    // in caso di errore nella query → 500
    if (err) return res.status(500).json({ error: "query failed" });

    // mappare i risultati per aggiungere il path completo dell'immagine
    const movies = results.map((movie) => ({
      ...movie,
      image: movie.image ? req.imagePath + movie.image : null,
    }));

    // risposta con la lista dei film
    res.send(movies);
  });
};

// SHOW 
  const show = (req, res) => {
  const { id } = req.params;
  const sqlMovie   = "SELECT * FROM movies WHERE id = ?";
  const sqlReviews = "SELECT * FROM reviews WHERE movie_id = ?";

  db_connection.query(sqlMovie, [id], (err, resultMovie) => {
    if (err) return res.status(500).json({ error: "query failed", detail: err });
    if (resultMovie.length === 0) return res.status(404).json({ error: "Film non trovato" });

    const movie = resultMovie[0];

    db_connection.query(sqlReviews, [id], (err2, resultReviews) => {
      if (err2) return res.status(500).json({ error: "query failed", detail: err2 });

      // film + recensioni
      res.json({
        ...movie,
        image: movie.image ? req.imagePath + movie.image : null,
        reviews: resultReviews,
      });
    });
  });
};

// POST 
const create = (req, res) => {
  res.send("create");
};

// GET 
const modify = (req, res) => {
  res.send("modify");
};

// PUT/PATCH 
const update = (req, res) => {
  res.send("update");
};

// DELETE
const destroy = (req, res) => {
  // recupero dell'id dalla rotta
  const { id } = req.params;

  // query per cancellare un film
  const query = `DELETE FROM movies WHERE id = ?`;

  // query di cancellazione
  db_connection.query(query, [id], (err) => {
    // errore in query → 500
    if (err) {
      return res.status(500).json({ error: "query failed", id, err });
    }
    // eliminazione avvenuta → 204 no content
    return res.sendStatus(204);
  });
};

module.exports = {
  index,
  show,
  create,
  modify,
  update,
  destroy,
};