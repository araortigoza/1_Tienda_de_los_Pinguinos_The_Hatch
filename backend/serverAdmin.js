const express = require("express");
const session = require("express-session");
const path = require("path");
const router = require("./routers/router");

require("./middlewares/database");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(session({
    name: "admin.sid",
    secret: "clubpenguinsecret",
    resave: false,
    saveUninitialized: false
}));

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use("/", router);

app.get("/", (req, res) => {
    res.redirect("/login");
});

app.listen(5000, () => {
    console.log("Servidor de administracion activo en http://localhost:5000");
});