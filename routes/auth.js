/*
    Path: '/api/login'
*/

const { Router } = require('express');
const { login, googleSingIn, renewToken } = require('../controllers/auth');
const { check } = require('express-validator');
const { validarCampos } = require('../middleware/validar-camps');
const { validarJWT } = require('../middleware/validar-jwt');

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

router.get( '/renew', validarJWT, renewToken );

module.exports = router;