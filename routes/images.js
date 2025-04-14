var express = require('express');
var router = express.Router();
let IC = require('../controller/images')
const middelware = require('../middelware/jwt')
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
router.post('/', upload.array('Images', 100), middelware.Auth, IC.imagesCreate)
router.get('/', IC.imagesFindAll)
router.get('/serach', IC.imagessearch)
router.get('/:id', IC.imagesFindOne)
router.delete('/:id', middelware.Auth, IC.imagesDelete)
router.patch('/:id', middelware.Auth, IC.imagesUpdate)

module.exports = router;
