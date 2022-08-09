const fs = require('fs');
//get config file
let rawdata = fs.readFileSync(__dirname + '/../configs/dbconfig.json');
let config = JSON.parse(rawdata);

const server = require('../models/dbquery')
const database = new server.DBserver(config)

class GenresDBRequest{
    static async genresList(){
        let data = await database.query('select * from genres');
        if (!data.success)
            return null
        return data.res
    }
}

module.exports.GenresDBRequest = GenresDBRequest