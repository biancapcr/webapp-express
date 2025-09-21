// importazione express
const express = require('express');
const router = express.Router();

// importazione del controller destrutturato
const { index, show, create, modify, update, destroy } = require('../controllers/movieControllers');

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

module.exports = router;