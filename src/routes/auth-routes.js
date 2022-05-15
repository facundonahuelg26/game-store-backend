const router = require("express").Router();
const authCtrl = require("../controllers/auth-controllers");
const validateReg = require("../validations/register")
const validateLog = require("../validations/login")

router.post("/signup", validateReg.validateRegister(validateReg.schema), authCtrl.signUp);
router.post("/signin", validateLog.validateLogin(validateLog.schema), authCtrl.signIn);

module.exports = router;
