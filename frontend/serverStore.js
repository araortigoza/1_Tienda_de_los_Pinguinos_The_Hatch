const express = require("express");
const session = require("express-session");
const path = require("path");
const router = require("./routers/router");

require("./middlewares/database");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "..", "backend", "public", "uploads")));

app.use(session({
    name: "store.sid",
    secret: "clubpenguinstoresecret",
    resave: false,
    saveUninitialized: false
}));

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use("/", router);

app.get("/", (req, res) => {
    res.redirect("/store");
});

app.listen(5001, () => {
    console.log("Servidor de la tienda activo en http://localhost:5001");
});