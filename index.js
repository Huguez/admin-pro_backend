require('dotenv').config();

const { dbConection } = require('./database/config');
const express = require("express");
const cors = require('cors'); 

// crear el servidor de express
const app = express();

app.use( cors() );

//base de datos 
dbConection();

// Rutas
app.use('/api/usuarios', require('./routes/usuarios') );



app.listen( process.env.PORT, () => {
    // console.log("Soy un wawa!!!");
} );