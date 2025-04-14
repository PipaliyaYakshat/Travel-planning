var express = require('express');
var router = express.Router();
let DC = require('../controller/destination')
const middelware = require('../middelware/jwt')

/* GET destination page. */
router.post('/', middelware.Auth, DC.create)
router.get('/', DC.destinationfindAll)
router.get('/:id', DC.destinationfindOne)
router.delete('/:id', middelware.Auth, DC.destinationDelete)
router.patch('/:id', middelware.Auth, DC.destinationUpdate)

module.exports = router;