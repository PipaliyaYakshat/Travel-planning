var express = require('express');
var router = express.Router();
let DC = require('../controller/destination')

/* GET destination page. */
router.post('/', DC.create)
router.get('/', DC.destinationfindAll)
router.get('/:id', DC.destinationfindOne)
router.delete('/:id', DC.destinationDelete)
router.patch('/:id', DC.destinationUpdate)

module.exports = router;