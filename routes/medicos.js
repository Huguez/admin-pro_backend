

const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();
const { validarCampos } = require('../middleware/validar-camps');
const { validarJWT } = require('../middleware/validar-jwt');

const { getMedicos, crearMedico, borrarMedico, actualizarMedico } = require('../controllers/medicos');


router.get( '/', getMedicos );

router.post( '/', [
    validarJWT,
    check( 'nombre', 'El nombre del Medico es necesario' ).not().isEmpty(),
    check( 'hospital', 'El HospitalID dedebe de ser valido' ).isMongoId(),
    validarCampos
], crearMedico );

router.put( '/:id', actualizarMedico );

router.delete( '/:id', borrarMedico );

module.exports = router;