
const { response } = require('express');

const Usuarios = require('../models/usuario');
const Medicos = require('../models/medicos');
const Hospital = require('../models/hospital');

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

module.exports = { getAll };