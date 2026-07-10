const mongoose = require("mongoose"); // SE IMPORTA MONGOOSE

// // SE CREA LA ESTRUCTURA DE UNA COLECCION EN LA DB CON SUB CONJUNTO
const orderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phonenumber: {
        type: Number,
        required: true
    },
    products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product"
            },
            productname: {
                type: String,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
            price: {
                type: Number,
                required: true
            },
            total: {
                type: Number,
                required: true
            }
        }
    ],
    orderTotal: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: "pending"
    }
});

// SE EXPORTA LA COLECCION Y SE CREA EL MODELO FUNCIONAL DE ORDER
module.exports = mongoose.model("Order", orderSchema);