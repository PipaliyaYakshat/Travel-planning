var express = require('express');
var router = express.Router();
let CC = require('../controller/contact')
const middelware = require('../middelware/jwt')

/* GET home page. */
router.post('/', middelware.Auth, CC.createContact)
router.get('/', CC.getContacts)
router.get('/:id', CC.getContactById)
router.delete('/:id', middelware.Auth, CC.deleteContact)
router.patch('/:id', middelware.Auth, CC.updateContact)

module.exports = router;
