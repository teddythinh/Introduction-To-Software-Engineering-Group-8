const moviesReq = require('../models/moviesDB');
const moviesDB = moviesReq.MoviesDBRequest;

module.exports.movies_list = (req, res) => {
    const task = async () => {
        let data = await moviesDB.moviesList();
        res.status(200).send({users: data})
    } 
    task();
}

module.exports.movie_info = (req, res) => {
    const { id } = req.params;
    const task = async () => {
        let data = await moviesDB.info(id);
        res.status(200).send(data);
    }
    task();
}

module.exports.movie_info_update = (req, res) => {
    const { id } = req.params
    const items = req.body
    const task = async () => {
        let success = await moviesDB.modInfo(id, items);
        res.status(200).send(success);
    }
    task();
}

module.exports.add_new_movie = (req, res) => {
    const items = req.body
    const task = async () => {
        let success = await moviesDB.addMovie(items);
        res.status(200).send(success);
    }
    task();
}