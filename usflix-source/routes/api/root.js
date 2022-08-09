// ./
var express = require('express');
var router = express.Router();

const moviesReq = require('../../models/moviesDB');
const moviesDB = moviesReq.MoviesDBRequest;
const usersReq = require('../../models/usersDB');
const usersDB = usersReq.UsersDBRequest
const genresReq = require('../../models/genresDB')
const genresDB = genresReq.GenresDBRequest

router.get('/', (req, res) => {
    const task = async () => {
        let users = await usersDB.usersList()
        let movies = await moviesDB.moviesList()
        let genres = await genresDB.genresList()
        res.status(200).send({users: users, movies: movies, genres: genres});
    }
    task();
});

module.exports = router