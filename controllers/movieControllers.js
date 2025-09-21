// importazione della connessione MySQL
const db_connection = require("../data/db.js"); 

const index = (req, res) => {
  // query => selezioniamo tutti i film dalla tabella "movies"
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

const show = (req, res) => {
  // estrazione dell'id dalla rotta
  const { id } = req.params;

  // query parametrizzata per un singolo film
  const query = `SELECT * FROM movies WHERE id = ?`;

  // esecuzione della query passando l'id come parametro
  db_connection.query(query, [id], (err, results) => {
    // errore in query → 500
    if (err) return res.status(500).json({ error: "query failed", id, err });

    // nessun film trovato → 404
    if (results.length === 0)
      return res.status(404).json({ error: "Film non trovato" });

    // ritorniamo il risultato
    return res.json(results);
  });
};
