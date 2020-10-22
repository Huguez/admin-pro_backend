const { response } = require('express');

const getHospitales = ( req, res = response ) => {
    res.json({
        ok: true,
        msg: "si se hizo!!!"
    })
}


const crearHospital = ( req, res = response ) => {
    res.json({
        ok: true,
        msg: "si se hizo!!!"
    })
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