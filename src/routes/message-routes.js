const router = require("express").Router();
const msgCtrl = require("../controllers/message-controllers");
const {validateMessage, schema} = require("../validations/message")


router.post("/", validateMessage(schema), msgCtrl.createMessage);
router.get("/:productId", msgCtrl.getMessageById);
router.put("/:messageId", msgCtrl.updateMessage);

module.exports = router;