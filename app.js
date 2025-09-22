require('dotenv').config();
// importazione express
const express = require("express");

// importazione middleware
const imagePathMiddleware = require("./middlewares/imagePathMiddleware");
const notFound = require("./middlewares/notFound");
const errorsHandler = require("./middlewares/errorsHandler");

// importazione router /movies
const moviesRoute = require("./routes/movieRoute");

// creazione istanza dell'applicazione
const app = express();

// static + JSON
app.use(express.static('public'));
app.use(express.json());

// middleware che aggiunge req.imagePath
app.use(imagePathMiddleware);

// rotte
app.use("/movies", moviesRoute);
app.get('/', (_req, res) => {
  res.send('API server main page');
});

// middleware
app.use(notFound);
app.use(errorsHandler);

// avvio server
const port = 3000;
app.listen(port, () => {
  console.log(`API server listening on port ${port}`);
});