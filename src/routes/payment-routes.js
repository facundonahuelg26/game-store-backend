const router = require("express").Router();
const paymentCtrl = require("../controllers/payment-controller");

router.post("/", paymentCtrl.createPayment)
router.get("/", paymentCtrl.getPayment)



module.exports = router;

