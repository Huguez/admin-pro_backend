const { response } = require('express');
const Medico = require('../models/medicos');

const getMedicos = ( req, res = response) => {
    res.json({
        ok: true,
        msg: "getMedicos"
    });
}

const crearMedico  = async ( req, res = response) => {
    
    try {
        const medico = new Medico( { usuario: req.id, ...req.body } );
         
        const medicoDB = await medico.save();

        res.json({
            ok: true,
            medico: medicoDB
        });

    } catch (error) {
        res.status( 500 ).json({
            ok: false,
            msg: "no se pudo crear!!!"
        })
    }
}


const actualizarMedico = ( req, res = response) => {
    res.json({
        ok: true,
        msg: "actualizarMedico"
    });
}

const borrarMedico = ( req, res = response) => {
    res.json({
        ok: true,
        msg: "borrarMedico"
    });
}

module.exports = { 
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico
};