
const { response } = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs') ;
const { generarJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');
const { getMenuFrontEnd } = require('../helpers/menu-frontend');


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
                msg: 'no Password'
            })
        }

        const token = await generarJWT( usuarioDB.id );

        res.json({
            ok: true,
            token,
            menu: getMenuFrontEnd( usuarioDB.role )
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }
}

const googleSingIn = async ( req, res = response ) => {
    try{
        const token = req.body.token;
        
        const { name, email, picture } = await googleVerify( token );

        const usuarioDB = await Usuario.findOne( { email } );
        let user;

        if( !usuarioDB ){
            user = new Usuario({ 
                nombre: name,
                email,
                password: "123",
                img: picture,
                google: true
            });
        }else{
            user = usuarioDB;
            user.google = true;
            user.password = '123';
            
        }

        await user.save();

        const tokenJWT = await generarJWT( user.id );

        res.json( {
            ok: true,
            msg: "Google Sing-in",
            tokenJWT,
            menu: getMenuFrontEnd( user.role )
        } );

    }catch( error ){
        res.json( {
            ok: false,
            msg: "Algo salio mal en Google Sing in"
        } )
    }
    
}

const renewToken = async ( req, res = response ) => {
    try{
        const id = req.id;

        const token = await generarJWT( id );

        const usuario = await Usuario.findById( id );

        usuario.password = '';
        
        res.json({
            ok: true,
            msg: "re-new",    
            usuario,
            token,
            menu: getMenuFrontEnd( usuario.role )
        } );
    }catch( error ){
        res.json({
            ok: false,
            msg: "re-new fail!!!!!",
            
        } );
    }
}

module.exports = { 
    login,
    googleSingIn,
    renewToken
};