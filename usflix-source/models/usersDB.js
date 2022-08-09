const fs = require('fs');
let rawdata = fs.readFileSync(__dirname + '/../configs/dbconfig.json');
let config = JSON.parse(rawdata);

const server = require('../models/dbquery');
const database = new server.DBserver(config);

class AccountAuthendication{
    static async check(username, password){
        let data = await database.query('select * from users where username = \'' + username + '\'')
        if (!data.success || data.res.length != 1)
            return {allow: -1};
        if (data.res[0].username == username && data.res[0].password == password){
            let usrpathid = await database.query('select pathid from userinfo where username = \'' + username + '\'');
            return {allow: 1, pathid: usrpathid.res[0].pathid};
        }
        else 
            return {allow: 0};
    }
}

class UsersDBRequest{
    static async usersList(){
        let data = await database.query('select pathid, username from userinfo');
        if (!data.success)
            return null
        return data.res
    }
    static async info(pathid){
        let data = await database.query('select * from userInfo where pathid = \'' + pathid + '\'');
        if (!data.success || data.res.length != 1)
            return null;
        return data.res[0];
    }
    static async userInfoUpdateQuery(id, item) {
        let query_line = 'update userinfo set fullname = '
        if (item.fullname!= null) query_line += '\'' + item.fullname + '\'';
        else queryline += item.fullname;

        query_line += ', genders = ';
        if (item.genders != null) query_line += '\'' + item.genders + '\'';
        else query_line += item.genders;

        query_line += ', age = '+ item.age + ', cells = ';
        if (item.cells != null) query_line += '\'' + item.cells + '\'';
        else query_line += item.cells

        query_line += ' where pathid = \'' + id +'\''
        return query_line;
    }
    static async generate_pathid(){
        let key = await database.query('select ui.pathid from userinfo ui, users u where u.utype = \'viewer\' and u.username = ui.username and ui.pathid >=' 
        + 'all (select ui2.pathid from userinfo ui2, users u2 where u2.utype = \'viewer\' and u2.username = ui2.username)');
        if (!key.success)
            return null
        var pad = '0000'
        var str = "" + (parseInt(key.res[0].pathid) + 1);
        var ans = pad.substring(0, pad.length - str.length) + str
        return ans;
    }
    static async modInfo(pathid, item){
        let olddat = await this.info(pathid)
        let query_line = await this.userInfoUpdateQuery(pathid, item);
        let data = await database.query(query_line);
        if (!data.success){
            let query_line2 = await this.userInfoUpdateQuery(pathid, olddat)
            let revert = await database.query(query_line2);  
            return {success: false};
        }
        return {sucess: true}
    }
    static async addUser(username, password){
        let accexist = await database.query('select * from users where username = \'' + username + '\'')
        if (accexist.success && accexist.res.length >= 1) return {sucess: false};
        let pathid = await this.generate_pathid();
        let data = await database.query('insert into users(username, password, utype) values(\'' + username + '\', \'' + password + '\', \'viewer\')');
        let data2 = await database.query('insert into userinfo(username, pathid) values(\'' + username + '\', \'' + pathid + '\')');
        if (!data.success || !data2.success){
            if (data.success){
                let rm = await database.query('delete from users where username = \'' + username + '\'');
            }
            else{
                let rm = await database.query('delete from userinfo where username = \'' + username + '\'');
            }
            return {success: false};
        }
        
        return {success: true, pathid: pathid};
    }
}

module.exports.AccountAuthendication = AccountAuthendication;
module.exports.UsersDBRequest = UsersDBRequest;