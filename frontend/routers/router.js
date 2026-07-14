const express = require("express");
const router = express.Router();

// SE EXTRAE LO QUE SE NECESITA DE CONTROLLER
const storeController = require("../controllers/storeController");

// SE DEFINEN RUTAS
router.get("/store", storeController.showStore);
router.post("/cart/add/:id", storeController.addToCart);
router.get("/cart", storeController.showCart);
router.post("/checkout", storeController.checkout);
router.post("/store/comments/add", storeController.addToComment)

// SE EXPORTAN LAS RUTAS
module.exports = router;