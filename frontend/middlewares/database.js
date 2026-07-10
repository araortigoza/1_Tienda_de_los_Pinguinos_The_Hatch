const mongoose = require("mongoose");

// SE CONECTA LA BASE DE DATOS
mongoose.connect("mongodb://127.0.0.1:27017/clubpenguin")
.then(() =>{
    console.log("Base de datos conectada")
}).catch(error => {
    console.log(error)
})