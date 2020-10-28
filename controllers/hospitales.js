
const Hospital = require('../models/hospital');

const { response } = require('express');

const getHospitales = async ( req, res = response ) => {
    
    const hospitales = await Hospital.find({}, "nombre img").populate( 'usuario', 'nombre img' );

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


const actualizarHospital = async ( req, res = response ) => {
    try {
        const id = req.params.id;
        const userId = req.params.id;

        const hospitalDB = await Hospital.findById( id );
        
        if( !hospitalDB ){
            return res.status( 404 ).json( {
                ok:false,
                msg: 'No existe ese hospital'
            } );
        }
        
        const campos = { ...req.body, usuario: userId };

        // const hospitalActualiado = await Hospital.findByIdAndUpdate( id, campos, { new: true } );
        const hospitalActualiado = await Hospital.findOneAndUpdate( id, campos, { new: true } );

        res.json({
            ok: true,
            msg: "si se hizo!!!",
            hospital: hospitalActualiado
        });

    } catch (error) {
        res.status( 500 ).json( {
            ok: false,
            msg: "error de Server!!!!"
        });
    }
}


const borrarHospital = async ( req, res = response ) => {
    try {
        const id = req.params.id;
        console.log( id );
        
        const hospitalDB = await Hospital.findById( id );

        if( !hospitalDB ){
            return res.status( 404 ).json( {
                ok:false,
                msg: 'No existe ese usuario'
            } );            
        }

        const hospitalBorrado = await Hospital.findByIdAndDelete( id );

        res.json({
            ok: true,
            hospitalBorrado
        });



    }catch( error ) {
        res.status( 500 ).json({
            ok: true,
            msg: "Valio queso!!!"
        });   
    }
}

module.exports = {
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital
}