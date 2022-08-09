// ./movies/...
var express = require('express');
var router = express.Router();

const moviesController = require('../../controllers/moviesControllers');

router.get('', moviesController.movies_list);

router.get('/:id', moviesController.movie_info);

router.put('/:id/update', moviesController.movie_info_update);

router.post('/add', moviesController.add_new_movie);

module.exports = router