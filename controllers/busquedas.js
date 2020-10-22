
const { response } = require('express');

const getAll = ( req, res = response ) => {
    try {
        const busqueda = req.params.busqueda;
        

        res.json( {
            ok: true,
            msg: "getAll",
            busqueda
        } )
    } catch (error) {
        res.status( 500 ).json( {
            ok: false,
            msg: "error del server!!!!"
        } )
    }
}

module.exports = { getAll };