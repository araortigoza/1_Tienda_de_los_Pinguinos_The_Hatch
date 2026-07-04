const express = require("express");
const rutas = require("./routers/router");
const path = require("path");
const cookieParser = require("cookie-parser");

require("./middlewares/database")

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(cookieParser());

app.set("view engine", "pug");
app.set("views", (path.join__dirname, 'views'));

app.use("/login", rutas);
app.use("/dashborard", rutas);

app.get("/", (req, res) => {
    res.render("login");
});

app.listen(5000, () => {
    console.log("Servidor activo en http://localhost:5000");
});