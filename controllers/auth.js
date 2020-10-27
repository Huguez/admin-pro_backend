
const { response } = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs') ;
const { generarJWT } = require('../helpers/jwt');



const login = async ( req, res = response ) => {
    try {
        const { email, password } = req.body;
        
        const usuarioDB = await Usuario.findOne({ email });

        if( !usuarioDB ){
            return res.status( 404 ).json( {
                ok:false,
                msg: 'No existe ese usuario'
            } );
        }
        
        const validarPassword = bcrypt.compareSync( password, usuarioDB.password );
        if( !validarPassword ){
            return res.status( 400 ).json({
                ok: false,
                msj: 'no Password'
            })
        }

        const token = await generarJWT( usuarioDB.id );

        res.json({
            ok: true,
            token
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }
}

module.exports = {login};