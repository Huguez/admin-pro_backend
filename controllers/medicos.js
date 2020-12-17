const { response } = require('express');
const Medico = require('../models/medicos');
const Hospital = require('../models/hospital');

const getMedicos = async ( req, res = response) => {
    
    try {
        const medicos = await Medico.find({}, "nombre img").populate('hospital',' nombre' );

        res.json( {
            ok: true,
            medicos
        } )
    }catch( error ){
        res.status( 500 ).json({
            ok: true,
            msg: "valio queso"
        })
    }
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

const actualizarMedico = async ( req, res = response) => {
    try {
        const id = req.params.id;
        
        const medicoDB = await Medico.findById( id );
        
        if( !medicoDB ){
            res.status( 404 ).json({
                ok: false,
                msg: "no se encontro al medico"
            });    
        }
        
        const hospitalId = req.body.hospital;
        const hospitalDB = await Hospital.findById( hospitalId );

        if( !hospitalDB ){
            res.status( 404 ).json({
                ok: false,
                msg: "Hospital no encontrado!!!"
            });    
        }

        const campos = {...req.body };

        const medicoEditado = await Medico.findByIdAndUpdate( id, campos, { new: true } )
        
        res.json({
            ok: true,
            medicoEditado
        });

    }catch( error ){
        res.status(500).json({
            ok: false,
            msg: "Error al intentar actualizar!!!"
        });
    }
    
}

const borrarMedico = async ( req, res = response) => {
    try {
        const id = req.params.id;
        const medicoDB = await Medico.findById( id );
        
        if( !medicoDB ){
            res.status( 404 ).json({
                ok: false,
                msg: "El medico no existe!!!!"
            });    
        }

        const medicoBorrado = await Medico.findByIdAndDelete( id,  )

        res.json({
            ok: true,
            medicoBorrado
        });
    }catch( error ){
        res.status( 500 ).json( {
            ok: false,
            msg: "Error en el borrar Medico!!!"
        });
    }    
}

const getMedicoById = async ( rep, res = response ) => {
    try{
        const id = rep.params.id;
        const medico = await Medico.findById( id );

        if( !medico ){
            res.status( 404 ).json({
                ok: false,
                msg: "El medico no existe!!!!"
            });    
        }

        res.json({
            ok: true,
            medico
        });
    }catch( error ){
        res.status( 500 ).json( {
            ok: false,
            msg: "Error al obtener un Medico!!!"
        });
    }
}

module.exports = { 
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico,
    getMedicoById
};