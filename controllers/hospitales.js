
const Hospital = require('../models/hospital');

const { response } = require('express');

const getHospitales = async ( req, res = response ) => {
    
    const hospitales = await Hospital.find().populate( 'usuario', 'nombre' );

    res.json({
        ok: true,
        hospitales
    })
}


const crearHospital = async ( req, res = response ) => {
    
    try {
        const hospital = new Hospital( { usuario: req.id, ...req.body } );
        
         
        const hospitalDB = await hospital.save();

        res.json({
            ok: true,
            hospital: hospitalDB
        })

    } catch (error) {
        res.status( 500 ).json({
            ok: false,
            msg: 'Ya valio queso!!!'
        });
    }

}


const actualizarHospital = ( req, res = response ) => {
    res.json({
        ok: true,
        msg: "si se hizo!!!"
    })
}


const borrarHospital = ( req, res = response ) => {
    res.json({
        ok: true,
        msg: "si se hizo!!!"
    })
}

module.exports = {
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital
}