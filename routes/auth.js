/*
    Path: '/api/login'
*/

const { Router } = require('express');
const { login, googleSingIn } = require('../controllers/auth');
const { check } = require('express-validator');
const { validarCampos } = require('../middleware/validar-camps');

const router = Router();

router.post( '/', [
    check('email','El email es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    validarCampos
], login )

router.post( '/google', [
    check('token', 'El token de Google es obligatorio').not().isEmpty(),
    validarCampos,
    googleSingIn
], login )



module.exports = router;