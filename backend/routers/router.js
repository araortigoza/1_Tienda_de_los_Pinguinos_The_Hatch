const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const loginController = require("../controllers/loginController");
const dashboardController = require("../controllers/dashboardController");
const checkAuth = require("../middlewares/authentication");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "..", "public", "uploads"));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

router.get("/login", loginController.showLogin);
router.post("/login", loginController.login);
router.get("/logout", loginController.logout);

router.get("/dashboard", checkAuth, dashboardController.showDashboard);
router.post("/dashboard/products/create", checkAuth, upload.single("image"), dashboardController.createProduct);
router.post("/dashboard/products/edit/:id", checkAuth, upload.single("image"), dashboardController.editProduct);
router.post("/dashboard/products/delete/:id", checkAuth, dashboardController.deleteProduct);
router.post("/dashboard/orders/status/:id", checkAuth, dashboardController.updateOrderStatus);

module.exports = router;