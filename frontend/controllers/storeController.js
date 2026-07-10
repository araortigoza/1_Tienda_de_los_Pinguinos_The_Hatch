const Product = require("../models/productsModel");
const Order = require("../models/orderModel");

// MUESTRA LOS PRODUCTOS DE LA TIENDA
async function showStore(req, res) {
    const products = await Product.find();
    const puffles = products.filter(product => product.price === 0);
    const food = products.filter(product => product.price > 0);

    res.render("store", { puffles: puffles, food: food });
}

// AGREGA AL CARRITO PRODUCTOS
async function addToCart(req, res) {
    const { id } = req.params;
    const quantity = req.body.quantity ? Number(req.body.quantity) : 1;

    const product = await Product.findById(id);

    if (!req.session.cart) {
        req.session.cart = [];
    }

    req.session.cart.push({
        productId: product._id,
        productname: product.productname,
        quantity: quantity,
        price: product.price,
        total: product.price * quantity
    });

    res.redirect("/store");
}

// MUESTRA EL CARRITO
async function showCart(req, res) {
    const cart = req.session.cart || [];
    const cartTotal = cart.reduce((sum, item) => sum + item.total, 0);

    res.render("cart", { cart: cart, cartTotal: cartTotal });
}

// FINALIZA LA ORDEN Y GUARDA LOS DATOS A LA DB
async function checkout(req, res) {
    const { name, address, phonenumber } = req.body;
    const cart = req.session.cart || [];

    if (cart.length === 0) {
        return res.redirect("/store");
    }

    const orderTotal = cart.reduce((sum, item) => sum + item.total, 0);

    const newOrder = new Order({
        name: name,
        address: address,
        phonenumber: phonenumber,
        products: cart,
        orderTotal: orderTotal
    });

    await newOrder.save();
    req.session.cart = [];

    res.render("confirmation", { order: newOrder });
}

// SE EXPORTA LAS FUNCIONES
module.exports = { showStore, addToCart, showCart, checkout };