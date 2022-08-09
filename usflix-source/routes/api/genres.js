// ./genres/...
var express = require('express');
var router = express.Router();

const genresController = require('../../controllers/genresControllers');

router.get('/', genresController.genres_list)

module.exports = router