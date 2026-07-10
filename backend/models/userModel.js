const mongoose = require("mongoose") // SE IMPORTA MONGOOSE

// SE CREA LA ESTRUCTURA DE UNA COLECCION EN LA DB
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        default: "user"
    },
});

// SE EXPORTA LA COLECCION Y SE CREA EL MODELO FUNCIONAL DE USER
module.exports = mongoose.model('User', userSchema)