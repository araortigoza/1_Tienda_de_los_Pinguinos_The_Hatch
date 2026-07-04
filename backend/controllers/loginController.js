const bcrypt = require("bcrypt");
const User = require("../models/userModel");

async function showLogin(req, res) {
    res.render("login");
}

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

function logout(req, res) {
    req.session.destroy(() => {
        res.redirect("/login");
    });
}

module.exports = { showLogin, login, logout };