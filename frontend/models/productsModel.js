const mongoose = require("mongoose");

// SE ESCTRUCTURA LA COLECCION DE PRODUCTOS
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

// SE EXPORTA Y SE CREA UN MODELO FUNCIONAL DE PRODUCTO
module.exports = mongoose.model("Product", productSchema);