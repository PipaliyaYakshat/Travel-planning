var express = require('express');
var router = express.Router();
let IC = require('../controller/itinerary')
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images');
    },
    filename: function (req, file, cb) {
        const fileExtension = path.extname(file.originalname);
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + fileExtension);
    }
});

const upload = multer({ storage: storage });
router.post('/', upload.array('Images', 100), IC.itineraryCreate)
router.get('/', IC.itineraryFindAll)
router.get('/:id', IC.itineraryFindOne)
router.delete('/:id', IC.itineraryDelete)
router.patch('/:id', IC.itineraryUpdate)

module.exports = router;
