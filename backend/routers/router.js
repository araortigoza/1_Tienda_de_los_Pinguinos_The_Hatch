const express = require("express"); // SE IMPORTA EXPRESS
const router = express.Router(); // SE IMPORTA ROUTER PARA ENRUTAMIENTOS
const multer = require("multer"); // SE IMPORTA MULTER PARA IMAGENES
const path = require("path"); // SE IMPORTA PATH PARA DIRECCIONES DE ARCHIVOS

// SE IMPORTA LO NECESARIO DE OTROS ARCHIVOS
const loginController = require("../controllers/loginController");
const dashboardController = require("../controllers/dashboardController");
const checkAuth = require("../middlewares/authentication");

// UTILIZANDO MULTER SE GUARDA LAS IMAGENES ENVIADAS EN LA CARPETA UPLOADS
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "..", "public", "uploads"));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

// SE ACTIVA MULTER PASANDO LOS DATOS GUARDADOS ANTERIORMENTE
const upload = multer({ storage: storage });

// SE DEFINEN RUTAS
router.get("/login", loginController.showLogin);
router.post("/login", loginController.login);
router.get("/logout", loginController.logout);

router.get("/dashboard", checkAuth, dashboardController.showDashboard);
router.post("/dashboard/products", checkAuth, upload.single("image"), dashboardController.createProduct);
router.put("/dashboard/products/:id", checkAuth, upload.single("image"), dashboardController.editProduct);
router.delete("/dashboard/products/:id", checkAuth, dashboardController.deleteProduct);
router.put("/dashboard/orders/:id", checkAuth, dashboardController.updateOrderStatus);

module.exports = router;