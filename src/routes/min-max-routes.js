const router = require("express").Router();
const getMinOrMax = require("../controllers/selectMin-Max-controllers");

router.get("/", getMinOrMax);

module.exports = router;