const express = require("express"); // SE IMPORTA EL FRAMEWORK A UTILIZAR 
const session = require("express-session"); // SE IMPORTA UN MIDDLEWARE PARA MANEJO DE SESIONES
const path = require("path"); // SE IMPORTA PATH PARA MANEJO DE RUTAS DE ARCHIVOS
const router = require("./routers/router"); // SE IMPORTA EL ROUTER DE OTRO ARCHIVO

// SE INICIA CON LA CONEXION A LA DB AL MOMENTO DE INICIALIZAR EL SERVIDOR
require("./middlewares/database");

// SE INSTANCIA LA APP EXPRESS
const app = express();

// CONFIGURACIONES INTERNAS DEL SERVIDOR
app.use(express.json()); // SE CONVIERTE LO QUE LLEGA DE FETCH (JSON) A UN OBJETO JAVASCRIPT
app.use(express.urlencoded({ extended: true })); // SE CONVIERTE A UN OBJETO JAVASCRIPT LO QUE VIENE DE LOS FORMULARIOS
app.use(express.static(path.join(__dirname, "public"))); // SE LE COMUNICA AL SERVIDOR QUE EL NAVEGADOR PUEDE ACCEDER A LOS ARCHIVOS DENTRO DE LA CARPETA 'public'

// SE CONFIGURA LA SESSION
app.use(session({
    name: "admin.sid", // SE DEFINE UN NOMBRE A LA SESSION
    secret: "clubpenguinsecret", // CLAVE "SECRETA" DE LA COOKIE
    resave: false, // EVITA QUE SE VUELVA A GUARDAR LA SESSION SI NO FUE MODIFICADA
    saveUninitialized: false // EVITA QUE SE HAGAN SESIONES VACIAS
}));

app.set("view engine", "pug"); // SE LE COMUNICA A EXPRESS QUE SE UTILIZARA PUG
app.set("views", path.join(__dirname, "views")); // SE INDICA QUE LAS VISTAS ESTAN EN SU CARPETA CORRESPONDIENTE

app.use("/", router); // SE CONECTA TODAS LAS RUTAS DEFINIDAS EN EL ARCHIVO ROUTER.JS

// CUANDO SE INICIALIZA EL SERVIDOR, PRIMERO REDIRIGE A LOGIN
app.get("/", (req, res) => {
    res.redirect("/login");
});

// PONE EN ESCUCHA AL SERVIDOR
app.listen(5000, () => {
    console.log("Servidor de administracion activo en http://localhost:5000");
});