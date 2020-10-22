// path: api/todo /:busqueda

const { Router } = require('express');
const { validarJWT } = require('../middleware/validar-jwt');
const { getAll } = require('../controllers/busquedas');
const router = Router();

router.get( '/:busqueda', [
    validarJWT
], getAll );


module.exports = router;

