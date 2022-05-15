const router = require("express").Router();
const productsCtrl = require("../controllers/products-controllers");
const authJwt = require("../middlewares/authJwt")

router.post("/", authJwt.verifyToken, authJwt.isAdmin, productsCtrl.createProduct);

router.get("/", productsCtrl.getProducts);

router.get("/:productId", productsCtrl.getProduct) 

router.put("/:productId", authJwt.verifyToken, authJwt.isAdmin, productsCtrl.updateProduct);

router.delete("/:productId", authJwt.verifyToken, authJwt.isAdmin, productsCtrl.deleteProducts);




module.exports = router;