const router = require("express").Router();
const categoryCtrl = require("../controllers/categories-controllers");

router.get("/", categoryCtrl.getCategory);

module.exports = router;
