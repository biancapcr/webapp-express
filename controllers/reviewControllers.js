// controllers/reviewControllers.js
const db = require("../data/db");

function listByMovie(req, res, next) {
  const movieId = Number(req.params.id);
  if (!movieId) return res.status(400).json({ error: "movieId non valido" });

  const sql = `
    SELECT id, movie_id, name, vote, text, created_at
    FROM reviews
    WHERE movie_id = ?
    ORDER BY created_at ASC
  `;
  db.query(sql, [movieId], (err, rows) => {
    if (err) return next(err);
    res.json(rows);
  });
}

function addReview(req, res, next) {
  const movieId = Number(req.params.id);
  const { name, vote, text } = req.body;

  if (!movieId || !name || vote === undefined || !text) {
    return res.status(400).json({ error: "movieId, name, vote e text sono obbligatori" });
  }
  const v = Number(vote);
  if (Number.isNaN(v) || v < 0 || v > 5) {
    return res.status(400).json({ error: "vote deve essere tra 0 e 5" });
  }

  // verifica esistenza film
  db.query("SELECT id FROM movies WHERE id = ?", [movieId], (e, rows) => {
    if (e) return next(e);
    if (!rows || rows.length === 0) return res.status(404).json({ error: "Film non trovato" });

    // inserisci review
    const insert = "INSERT INTO reviews (movie_id, name, vote, text) VALUES (?, ?, ?, ?)";
    db.query(insert, [movieId, String(name).trim(), v, String(text).trim()], (err, result) => {
      if (err) return next(err);

      db.query(
        "SELECT id, movie_id, name, vote, text, created_at FROM reviews WHERE id = ?",
        [result.insertId],
        (e2, rows2) => {
          if (e2) return next(e2);
          res.status(201).json({ message: "Recensione creata", review: rows2[0] });
        }
      );
    });
  });
}

module.exports = { listByMovie, addReview };