const fs = require('fs');
//get config file
let rawdata = fs.readFileSync(__dirname + '/../configs/dbconfig.json');
let config = JSON.parse(rawdata);

const server = require('../models/dbquery')
const database = new server.DBserver(config)

class MoviesDBRequest{
    static async moviesList(){
        let data = await database.query('select mv.movie_name, mf.source, mf.imagesource from movies mv, movieinfo mf where mv.id = mf.id');
        if (!data.success)
            return null
        return data.res
    }
    static async info(id){
        let data = await database.query('select * from movieinfo where id = \'' + id + '\'');
        let data2 = await database.query('select genre_name from genres g, genreMoviesList gml where gml.movie_id =  \'' + id + '\' and gml.genre_id = g.id');
        let data3 = await database.query('select movie_name from movies where id = \'' + id + '\'');
        if (!data.success || !data2.success || !data3.success || data.res.length != 1 || data3.res.length != 1)
            return null
        let genre_list = []
        for(let x in data2.res){
            genre_list.push(data2.res[x].genre_name)
        }
        data.res[0].genres = genre_list;
        data.res[0].movie_name = data3.res[0].movie_name;
        return data.res[0] 
    }
    static async movieInfoUpdateQuery(id, item) {
        let query_line = 'update movieinfo set release = '
        if (item.release != null) query_line += '\'' + item.release + '\'';
        else queryline += item.release;

        query_line += ', source = ';
        if (item.source != null) query_line += '\'' + item.source + '\'';
        else query_line += item.source;

        query_line += ', imagesource = ';
        if (item.imagesource != null) query_line += '\'' + item.imagesource + '\'';
        else query_line += item.imagesource

        query_line += ' where id = \'' + id +'\''
        return query_line;
    }
    static async addMovieQuery(item){
        let query_line = 'insert into movieinfo(id, release, imagesource, source) values(\'' + item.id +'\', ';
        if (item.release != null) query_line += '\'' + item.release + '\'';
        else query_line += item.release;

        query_line += ', ';
        if (item.source != null) query_line += '\'' + item.source + '\'';
        else query_line += item.source;

        query_line += ', ';
        if (item.imagesource != null) query_line += '\'' + item.imagesource + '\'';
        else query_line += item.imagesource

        query_line += ')';
        return query_line;
    }
    static async modInfo(id, item){
        let olddat = await this.info(id)
        let query_line = await this.movieInfoUpdateQuery(id, item);
        let data2 = await database.query('update movies set movie_name = \'' + item.movie_name + '\' where id = \'' + id +'\'');
        let data = await database.query(query_line);
        if (!data.success || !data2.success){
            if (data.success){
                let query_line2 = await this.movieInfoUpdateQuery(id, olddat)
                let revert = await database.query(query_line2);  
            }
            else {
                let revert = await database.query('update movies set movie_name = \'' + olddat.movie_name + '\' where id = \'' + id +'\'');
            }
            return {success: false};
        }
        return {sucess: true}
    } 
    static async addMovie(item){
        let query_line = await this.addMovieQuery(item);
        let data = await database.query('insert into movies(id, movie_name) values(\'' + item.id + '\', \'' + item.movie_name + '\')');
        let data2 = await database.query(query_line);
        if (!data.success || !data2.success){
            if (data.success){
                let rm = await database.query('delete from movies where id = \'' + item.id + '\'');
            }
            else{
                let rm = await database.query('delete from moviesinfo where id = \'' + item.id + '\'');
            }
            return {success: false};
        }
        return {success: true};
    }
}

module.exports.MoviesDBRequest = MoviesDBRequest;