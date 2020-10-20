const { response } = require('express');
const bcrypt = require('bcryptjs') ;
const Usuario = require('../models/usuario');


const getUsuarios =  async ( req, res ) => {
    const usuarios = await Usuario.find({}, 'nombre email role google');

    res.json( { 
        ok: true, 
        usuarios
    } );
}

const postUsuarios = async ( req, res = response ) => {

    const { nombre, email, password }  = req.body;
    
    
    try {
        
        const existeUsuario = await Usuario.findOne({ email });

        if( existeUsuario ){
            return res.status( 400 ).json({ ok: false, msj: "El correo ya esta registrado!!!" });
        }
        
        const usuario = new Usuario( { nombre, email, password } );
        
        //encriptar contrasena
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt );

        // guardar usuario
        await usuario.save();
    
        res.json( { 
            ok: true, 
            usuario
        } );
        
    } catch (error) {
        console.log(error);
        res.status( 500 ).json({
            ok:false,
            msj: "Error inesperado!!!"
        });
    }
}




module.exports = {
    getUsuarios,
    postUsuarios
}