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
app.get( '/', ( req, res ) => {
    res.json( { ok: true, msj: "si se pudo" } );
} );

app.listen( process.env.PORT, () => {
    // console.log("Soy un wawa!!!");
} );