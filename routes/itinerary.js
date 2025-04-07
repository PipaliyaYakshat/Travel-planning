var express = require('express');
var router = express.Router();
let IC = require('../controller/itinerary')
const multer = require('multer');
const path = require('path');

const fs = require('fs');
const dir = './public/images';
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, './public/images'),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueName = `${file.fieldname}-${Date.now()}-${Math.round(Math.random() * 1E9)}${ext}`;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage: storage });
router.post('/', upload.array('Images', 100), IC.itineraryCreate)
router.get('/', IC.itineraryFindAll)
router.get('/serach', IC.itinerarysearch)
router.get('/:id', IC.itineraryFindOne)
router.delete('/:id', IC.itineraryDelete)
router.patch('/:id', IC.itineraryUpdate)

module.exports = router;
