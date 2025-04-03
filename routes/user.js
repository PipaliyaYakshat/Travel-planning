var express = require('express');
var router = express.Router();
let UC = require('../controller/user');
let middleware = require('../middelware/jwt')

/* GET users listing. */

router.post('/', UC.createUser);
router.post('/login', UC.loginUser)
router.get('/', middleware.Auth, UC.getUsers)
router.delete('/:id', middleware.Auth, UC.deleteUser)
router.patch('/:id', middleware.Auth, UC.updateUser)

module.exports = router;
