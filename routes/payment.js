var express = require('express');
var router = express.Router();
let PC = require('../controller/payment')

/* GET payment listing. */

router.post('/',PC.createPayment)
router.get('/',PC.viewAllPayments)
router.get('/:id', PC.viweOnePayment);
router.delete('/:id', PC.deletePayment);
router.patch('/:id', PC.updatePayment);


module.exports = router;
