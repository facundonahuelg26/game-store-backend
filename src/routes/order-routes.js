const router = require("express").Router();
const orderCtrl = require("../controllers/order-controllers");


router.get("/", orderCtrl.getOrder)


module.exports = router;