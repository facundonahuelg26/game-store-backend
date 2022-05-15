const router = require("express").Router();
const termCtrl = require("../controllers/term-controllers");

router.get("/", termCtrl.getTerm);




module.exports = router;
