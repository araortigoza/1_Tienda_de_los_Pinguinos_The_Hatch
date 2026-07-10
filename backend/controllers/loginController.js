const bcrypt = require("bcrypt");
const User = require("../models/userModel");

// MUESTRA EL LOGIN
async function showLogin(req, res) {
    res.render("login");
}

// SE VERIFICAN EL NOMBRE DEL ADMIN Y CONTRASENA
async function login(req, res) {
    const { username, password } = req.body;

    const user = await User.findOne({ username: username });

    if (!user) {
        return res.render("login", { error: "Usuario o contraseña incorrectos" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
        return res.render("login", { error: "Usuario o contraseña incorrectos" });
    }

    req.session.user = user.username;
    res.redirect("/dashboard");
}

// CIERRA LA SESION DEL ADMIN
function logout(req, res) {
    req.session.destroy(() => {
        res.redirect("/login");
    });
}

// SE EXPORTAN LAS FUNCIONES
module.exports = { showLogin, login, logout };