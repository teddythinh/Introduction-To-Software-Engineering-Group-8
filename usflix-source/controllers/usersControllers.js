const usersReq = require('../models/usersDB');
const accAut = usersReq.AccountAuthendication
const usersDB = usersReq.UsersDBRequest

module.exports.login_check = (req, res) => {
    const { username, password } = req.body;
    const task = async () => {
        let data = await accAut.check(username, password)
        res.status(200).send(data)
    }
    task()
}

module.exports.users_list = (req, res) => {
    const task = async () => {
        let data = await usersDB.usersList();
        res.status(200).send({users: data})
    } 
    task();
}

module.exports.user_info = (req, res) => {
    const { id } = req.params;
    const task = async () => {
        let data = await usersDB.info(id);
        res.status(200).send(data);
    }
    task();
}

module.exports.user_info_update = (req, res) => {
    const { id } = req.params;
    const item = req.body;
    const task = async() => {
        let data = await usersDB.modInfo(id, item);
        res.status(200).send(data);
    }
    task()
}

module.exports.add_user = (req, res) => {
    const {username, password} = req.body
    const task = async () => {
        let data = await usersDB.addUser(username, password);
        res.status(200).send(data);
    }
    task()
}