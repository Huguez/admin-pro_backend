const { response } = require('express');
const bcrypt = require('bcryptjs') ;
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');

const getUsuarios =  async ( req, res ) => {
    
    try {
        const desde = Number (req.query.desde) || 0;
        const hasta = Number (req.query.hasta) || 0;
        
        const [ usuarios, total ] = await Promise.all([
            Usuario.find({}, 'nombre email role google img').skip( desde ).limit( hasta ),
            Usuario.countDocuments()
        ]);

        res.json( { 
            ok: true, 
            usuarios,
            total
        } );

    } catch (error) {
        res.status( 500 ).json({
            ok:false,
            msg: "Error en el server"
        })
    }
    
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
        
        const token = await generarJWT( usuario.id );

        res.json( { 
            ok: true, 
            usuario,
            token
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
        
        const { email, password, google, ...campos} = req.body;

        if( usuarioDB.email !== email ){

            const existeEmail = await Usuario.findOne( { email } );
            if( existeEmail ){
                return res.status( 400 ).json( {
                    ok: false,
                    msg: 'Ya existe un usuario con ese email'
                } )
            }
        }

        campos.email = email;

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

const borrarUsuario = async ( req, res = response ) => {
    try {
        const id = req.params.id;

        const usuarioDB = await Usuario.findById( id );

        if( !usuarioDB ){
            return res.status( 404 ).json( {
                ok:false,
                msg: 'No existe ese usuario'
            } );            
        }

        await Usuario.findByIdAndDelete( id );

        res.json({
            ok: true,
            id
        });

    } catch (error) {
        res.status( 500 ).json({
            ok:false,
            msj: "Error inesperado!!!"
        });
    }
}

module.exports = {
    getUsuarios,
    actualizarUsuario,
    postUsuarios,
    borrarUsuario
}