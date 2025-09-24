// importazione express
const express = require('express');
const router = express.Router();

// importazione del controller destrutturato
const { index, show, create, modify, update, destroy } = require('../controllers/movieControllers');

// ➕ importa i controller delle reviews (NUOVO)
const { listByMovie, addReview } = require('../controllers/reviewControllers');

// definizione delle rotte
// index
router.get('/', index);

// show
router.get('/:id', show);

// create
router.post('/', create);

// update => (PUT)
router.put('/:id', update);

// modify => (PATCH)
router.patch('/:id', modify);

// destroy => (DELETE)
router.delete('/:id', destroy);

// ➕ REVIEWS (NUOVO, compatibile con il tuo ReviewForm)
// lista recensioni di un film
router.get('/:id/reviews', listByMovie);

// crea recensione per un film
router.post('/:id/reviews', addReview);

module.exports = router;