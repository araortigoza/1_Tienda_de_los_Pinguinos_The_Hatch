const mongoose = require("mongoose"); // SE IMPORTA MONGOOSE

// SE CREA LA ESTRUCTURA DE UNA COLECCION EN LA DB
const productSchema = new mongoose.Schema({
    productname: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        default: 0
    },
    stock: {
        type: Number,
        required: true,
        default: 0
    },
    image: {
        type: String,
        required: true
    }
});

// SE EXPORTA LA COLECCION Y SE CREA EL MODELO FUNCIONAL DE PRODUCTS
module.exports = mongoose.model("Product", productSchema);