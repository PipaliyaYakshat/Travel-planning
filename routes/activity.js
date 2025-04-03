var express = require('express');
var router = express.Router();
let AC = require('../controller/activity')

/* GET home page. */
router.post('/', AC.activityCreate)
router.get('/', AC.activityFindAll)
router.get('/:id', AC.activityFindOne)
router.delete('/:id', AC.activityDelete)
router.patch('/:id', AC.activityUpdate)

module.exports = router;
