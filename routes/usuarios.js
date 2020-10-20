/*
    Ruta: /api/usuarios
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { getUsuarios, postUsuarios } = require('../controllers/usuarios');

const router = Router();

const { validarCampos } = require('../middleware/validar-camps');


router.get( '/', getUsuarios );
router.post( '/',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        check('email','El email es obligatorio').isEmail(),
        validarCampos
    ], 
    postUsuarios );


module.exports = router;