const express = require("express"); // SE IMPORTA EXPRESS
const session = require("express-session"); // SE IMPORTA UN MIDDLEWARE PARA MANEJO DE SESIONES
const path = require("path"); // SE IMPORTA PATH PARA LA DIRECIION DE ARCHIVOS
const router = require("./routers/router"); // SE IMPORTA EL ROUTER DE OTRO ARCHIVO

// SE CONECTA LA BASE DE BATOS
require("./middlewares/database");

// SE INSTANCIA LA APP DE EXPRESS
const app = express();

// CONFIGURACIONES INTERNAS DEL SERVIDOR
app.use(express.json()); // SE CONVIERTE LO QUE LLEGA DE FETCH (JSON) A UN OBJETO JAVASCRIPT
app.use(express.urlencoded({ extended: true })); // SE CONVIERTE A UN OBJETO JAVASCRIPT LO QUE VIENE DE LOS FORMULARIOS
app.use(express.static(path.join(__dirname, "public"))); // SE LE COMUNICA AL SERVIDOR QUE EL NAVEGADOR PUEDE ACCEDER A LOS ARCHIVOS DENTRO DE LA CARPETA 'public'
app.use("/uploads", express.static(path.join(__dirname, "..", "backend", "public", "uploads"))); // SE INDICA LA DIRECCION DE LAS IMAGENES DE LOS PRODUCTOS

// SE CONFIGURA LA SESION
app.use(session({
    name: "store.sid", // SE ASIGNA UN NOMBRE
    secret: "clubpenguinstoresecret", // CLAVE PARA FIRMAR LA COOKIE
    resave: false, // EVITA QUE SE VUELVA A GUARDAR SESIONES QUE NO SON MODIFICADAS
    saveUninitialized: false // EVITA QUE SE GUARDE UNA SESION VACIA
}));

app.set("view engine", "pug"); // SE INDICA A EXPRESS QUE SE UTILIZARA PUG
app.set("views", path.join(__dirname, "views")); // SE INDICAN QUE LAS VISTAN ESTAN EN SU CARPETA CORRESPONDIENTE

app.use("/", router); // CONECTA LAS RUTAS

// AL INICIALIZAR EL SERVIDOR MUESTRA LA TIENDA
app.get("/", (req, res) => {
    res.redirect("/store");
});

// SE PONE EL SERVIDOR EN ESCUCHA
app.listen(5001, () => {
    console.log("Servidor de la tienda activo en http://localhost:5001");
});