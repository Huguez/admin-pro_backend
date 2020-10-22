require('dotenv').config();

const { dbConection } = require('./database/config');
const express = require("express");
const cors = require('cors'); 

// crear el servidor de express
const app = express();

app.use( cors() );

// Lectura del body
app.use( express.json() );

//base de datos 
dbConection();

// Rutas
app.use('/api/usuarios', require('./routes/usuarios') );
app.use('/api/login', require('./routes/auth') );
app.use('/api/hospitales', require('./routes/hospitales') );
app.use('/api/medicos', require('./routes/medicos') );



app.listen( process.env.PORT, () => {
    // console.log("Soy un wawa!!!");
} );