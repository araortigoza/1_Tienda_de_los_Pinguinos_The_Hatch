const express = require("express");
const router = express.Router();

const storeController = require("../controllers/storeController");

router.get("/store", storeController.showStore);
router.post("/cart/add/:id", storeController.addToCart);
router.get("/cart", storeController.showCart);
router.post("/checkout", storeController.checkout);

module.exports = router;