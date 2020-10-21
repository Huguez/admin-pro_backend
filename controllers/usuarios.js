const { response } = require('express');
const bcrypt = require('bcryptjs') ;
const Usuario = require('../models/usuario');
// const { delete } = require('../routes/usuarios');


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

const actualizarUsuario = async  ( req, res = response ) => {
    try {
        const id = req.params.id;
        
        const usuarioDB = await Usuario.findById( id );

        if( !usuarioDB ){
            return res.status( 404 ).json( {
                ok:false,
                msg: 'No existe ese usuario'
            } );
        }

        if( usuarioDB.email === req.body.email ){
            delete campos.email;
        } else {
            const existeEmail = await Usuario.findOne( { email: req.body.email } );
            if( existeEmail ){
                return res.status( 400 ).json( {
                    ok: false,
                    msg: 'Ya existe un usuario con ese email'
                } )
            }
        }

        const campos = req.body;
        delete campos.password;
        delete campos.google;

        const usuarioActualiado = await Usuario.findByIdAndUpdate( id, campos, { new: true } );

        res.json({
            ok: true,
            usuario: usuarioActualiado
        });

    }catch( error ){
        res.status( 500 ).json({
            ok:false,
            msj: "Error inesperado!!!"
        });
    }
}


module.exports = {
    getUsuarios,
    actualizarUsuario,
    postUsuarios
}