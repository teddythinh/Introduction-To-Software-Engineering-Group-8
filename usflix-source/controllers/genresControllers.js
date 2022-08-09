const genresReq = require('../models/genresDB')
const genresDB = genresReq.GenresDBRequest

module.exports.genres_list = (req, res) => {
    const task = async () => {
        let data = await genresDB.genresList();
        res.status(200).send({users: data})
    } 
    task();
}