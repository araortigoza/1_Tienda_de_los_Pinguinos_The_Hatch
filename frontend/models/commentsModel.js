const mongoose = require("mongoose"); // SE IMPORTA MONGOOSE

// SE CREA LA ESTRUCTURA DE UNA COLECCION EN LA DB
const commentsSchema = new mongoose.Schema({
    usercomment: {
        type: String,
        require: true
    }
});

module.exports = mongoose.model('Comment', commentsSchema)