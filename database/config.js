require('dotenv').config();

const mongoose = require('mongoose');

const dbConect = async () =>{
    try {    
        await mongoose.connect( process.env.DB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.log("DB Success!!!");
    } catch( err ){
        console.log( err );
        throw new Error('No se conecto a la base de datos');
    }
}
module.exports = {
    dbConection: dbConect
}