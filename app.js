// importazione express
const express = require("express");

// creazione istanza dell'applicazione
const app = express();

// abilitare i file statici dalla cartella "public"
app.use(express.static('public'));

// abilitiare il parsing JSON
app.use(express.json());

// importazione middleware
const imagePathMiddleware = require("./middlewares/imagePathMiddleware.js");

// importazione router /movies
const moviesRoute = require("./routes/moviesRoute.js");

// registrazione del middleware che aggiunge req.imagePath
app.use(imagePathMiddleware);

// monta le rotte /movies
app.use("/movies", moviesRoute);

// rotta base
app.get('/', (_req, res) => {
  res.send('API server main page');
});

// porta e avvio server
const port = 3000;
app.listen(port, () => {
  console.log(`API server listening on port ${port}`);
});