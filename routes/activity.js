var express = require('express');
var router = express.Router();
let AC = require('../controller/activity')
const middelware = require('../middelware/jwt')

/* GET home page. */
router.post('/', middelware.Auth, AC.activityCreate)
router.get('/', AC.activityFindAll)
router.get('/:id', AC.activityFindOne)
router.delete('/:id', middelware.Auth, AC.activityDelete)
router.patch('/:id', middelware.Auth, AC.activityUpdate)

module.exports = router;
