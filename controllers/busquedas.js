
const { response } = require('express');

const Usuarios = require('../models/usuario');
const Medicos = require('../models/medicos');
const Hospital = require('../models/hospital');
const { collection } = require('../models/usuario');

const getAll = async ( req, res = response ) => {
    try {
        const busqueda = req.params.busqueda;
        const regex = new RegExp( busqueda, 'i' );
        
        const [ usuarios, hospitales, medicos  ] = await Promise.all( [
            Usuarios.find( {nombre: regex } ),
            Hospital.find( { nombre: regex } ),
            Medicos.find( { nombre: regex } )
        ]);

        
        res.json( {
            ok: true,
            usuarios,
            hospitales, 
            medicos
        } );
    } catch (error) {
        res.status( 500 ).json( {
            ok: false,
            msg: "error del server!!!!"
        } )
    }
}


const getDocumentosColeccion = async ( req, res = response ) => {
    try {
        const busqueda = req.params.busqueda;
        const coleccion = req.params.tabla;
        const regex = new RegExp( busqueda, 'i' );
        
        let result;
        switch( coleccion ){
            case 'medicos':
                result = await Medicos.find( { nombre: regex } ).populate( 'usuario', ' nombre img' ).populate( 'hospital', ' nombre img' );
    
                break;
            case 'usuarios':
                result = await Usuarios.find( { nombre: regex } ).populate( 'usuario', ' nombre img' );
                
                break;
            case 'hospitales':
                result = await Hospital.find( { nombre: regex } );
                
                break;
            default:
                res.status( 400 ).json({
                    ok: false,
                    msg: "no se encontro nada la busqueda debe de ser medicos/usuarios/hospitales"
                });
        }


        res.json({
            ok: true,
            result
        });

    } catch (error) {
        res.status( 500 ).json({
            ok: false,
            msg: "Error en el server!!!"
        });
    }
}

module.exports = { 
    getAll,
    getDocumentosColeccion
};