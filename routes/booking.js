var express = require('express');
var router = express.Router();
let BC = require('../controller/booking')

/* GET home page. */
router.post('/', BC.bookingCreate)
router.get('/', BC.bookingFindAll)
router.get('/:id', BC.bookingdOne)
router.delete('/:id', BC.bookingDelete)
router.patch('/:id', BC.bookingUpdate)

module.exports = router;
