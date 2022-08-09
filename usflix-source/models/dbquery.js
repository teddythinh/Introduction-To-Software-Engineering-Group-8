const sql = require("mssql");

class DBserver{
    constructor(config){
        this.config = config;
    }
    async query(req){
        try {
            // console.log(req)
            // console.log('==========================')
            await sql.connect(this.config);
            const result = await sql.query(req);
            //console.log(result);
            return {success: true, res: result.recordset};
        }
        catch(err){
            // console.log(err);
            // console.log('==========================')
            return {success: false, res: null};
        }
    }
}

module.exports.DBserver = DBserver;