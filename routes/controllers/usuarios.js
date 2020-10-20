const Usuario = require('../../models/usuario');


const getUsuarios =  ( req, res ) => {
    res.json( { 
        ok: true, 
        usuarios: [  ] 
    } );
}

const postUsuarios = async ( req, res ) => {

    const { nombre, email, password }  = req.body;

    const usuario = new Usuario( { nombre, email, password } );

    await usuario.save();

    res.json( { 
        ok: true, 
        usuario
    } );
}




module.exports = {
    getUsuarios,
    postUsuarios
}