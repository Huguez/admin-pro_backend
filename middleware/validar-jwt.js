const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');


const validarJWT = ( req, res, next ) => {

    const token = req.header('x-token');
    
     if( !token ){
        return res.status(401).json({
            ok: false,
            msg: 'No hay token'
        })
    }

    try {
        
        const { id } = jwt.verify( token, process.env.JWT_SECRET );
        req.id = id;
        
        next();
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token invalido'
        })
    }
    
}

const validarAdminRole = async ( req, res, next ) => {
    try{
        const uid = req.id;

        const userDB = await Usuario.findById( uid );

        if( !userDB ){
            return res.status( 404 ).json({
                ok: false,
                msg: "usuario no encontrado"
            });
        }

        if( userDB.role !== 'ADMIN_ROLE'  ){
            return res.status( 403 ).json({
                ok: false,
                msg: "usuario no autorizado"
            });
        }

    }catch( error ){
        res.status( 500 ).json({
            ok: false,
            msg: "error en validar el Admin Role"
        });
    }
}

module.exports = { 
    validarJWT,
    validarAdminRole
}