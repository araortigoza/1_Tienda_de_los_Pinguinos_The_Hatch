const express = require("express");
const rutas = require("./routers/router");
const path = require("path");
const cookieParser = require("cookie-parser");

require("./middlewares/database")

const app = express();

app.listen(5000, () => {
    console.log("Servidor activo en http://localhost:5000");
});