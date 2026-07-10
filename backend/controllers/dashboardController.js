const Product = require("../models/productsModel");
const Order = require("../models/orderModel");

// MUESTRA EN EL DASHBOARD TODOS LOS PRODUCTOS Y ORDENES
async function showDashboard(req, res) {
    const products = await Product.find();
    const orders = await Order.find();
    res.render("dashboard", { products: products, orders: orders });
}

// CREA UN NUEVO PRODUCTO EN LA BASE DE DATOS
async function createProduct(req, res) {
    const { productname, price, stock } = req.body;
    const image = req.file ? req.file.filename : "";

    const newProduct = new Product({
        productname: productname,
        price: price,
        stock: stock,
        image: image
    });

    await newProduct.save();
    res.redirect("/dashboard");
}

// EDITA ALGUN CAMPO EN LA BASE DE DATOS
async function editProduct(req, res) {
    const { id } = req.params;
    const { productname, price, stock } = req.body;

    const updateData = {
        productname: productname,
        price: price,
        stock: stock
    };

    if (req.file) {
        updateData.image = req.file.filename;
    }

    await Product.findByIdAndUpdate(id, updateData);
    res.redirect("/dashboard");
}

// ELIMINA ALGUN PRODUCTO DE LA BASE DE DATOS
async function deleteProduct(req, res) {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.redirect("/dashboard");
}

// CAMBIA EL ESTADO DE LA ORDEN
async function updateOrderStatus(req, res) {
    const { id } = req.params;
    const { status } = req.body;

    await Order.findByIdAndUpdate(id, { status: status });
    res.redirect("/dashboard");
}

// SE EXPORTAN LAS FUNCIONES
module.exports = {
    showDashboard,
    createProduct,
    editProduct,
    deleteProduct,
    updateOrderStatus
};