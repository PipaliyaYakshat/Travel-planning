var express = require('express');
var router = express.Router();
let FC = require('../controller/feedback')

/* GET feedback listing. */

router.post("/",FC.feedbackCreate)
router.get("/",FC.feedbackFind)
router.get("/:id",FC.feedbackFindOne)
router.patch("/:id",FC.feedbackUpdate)
router.delete("/:id",FC.feedbackDelete)



module.exports = router;