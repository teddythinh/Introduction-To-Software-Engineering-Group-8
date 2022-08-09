// ./users/...
var express = require('express');
var router = express.Router();
const usersController = require('../../controllers/usersControllers');

router.get('/', usersController.users_list);

router.post('/check', usersController.login_check);

router.get('/:id', usersController.user_info);

router.put('/:id/update', usersController.user_info_update);

router.post('/add', usersController.add_user);

module.exports = router
