const router = require("express").Router();
const dataCtrl = require("../controllers/dataUser-controllers");
const validate = require("../validations/shipping")

router.post("/", validate.validateShipping(validate.schema),  dataCtrl.createDataUser);

router.get("/:userId", dataCtrl.getDataUser) 

router.put("/:userId", validate.validateShipping(validate.schema), dataCtrl.updateDataUser);


module.exports = router;