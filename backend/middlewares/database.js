const mongoose = require("mongoose"); // SE IMPORTA MONGOOSE

// SE INICIA LA CONEXION DE LA DB CON MONGO
mongoose.connect("mongodb://127.0.0.1:27017/clubpenguin")
.then(() =>{
    console.log("Base de datos conectada")
}).catch(error => {
    console.log(error)
})