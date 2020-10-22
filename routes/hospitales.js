//  ruta: '/api/hopitales

const { Router } = require('express');
const router = Router();

const { check } = require('express-validator');
const { validarCampos } = require('../middleware/validar-camps');

const { validarJWT } = require('../middleware/validar-jwt');

const { 
    getHospitales, 
    crearHospital, 
    actualizarHospital, 
    borrarHospital } = require('../controllers/hospitales');


router.get( '/', getHospitales );

router.post( '/',
    [
       
    ], 
    crearHospital );

router.put( '/:id',[
    
] ,actualizarHospital );

router.delete( '/:id', validarJWT, borrarHospital );
    
module.exports = router;
