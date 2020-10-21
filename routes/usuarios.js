/*
    Ruta: /api/usuarios
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { getUsuarios, postUsuarios, actualizarUsuario, borrarUsuario } = require('../controllers/usuarios');

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

router.put( '/:id',[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('role', 'El password es obligatorio').not().isEmpty(),
    check('email','El email es obligatorio').isEmail(),
    validarCampos    
] ,actualizarUsuario );

router.delete( '/:id', borrarUsuario );
    
module.exports = router;