// path: api/todo

const { Router } = require('express');
const { validarJWT } = require('../middleware/validar-jwt');
const { getAll, getDocumentosColeccion } = require('../controllers/busquedas');
const router = Router();

router.get( '/:busqueda', validarJWT, getAll );

router.get( '/coleccion/:tabla/:busqueda', validarJWT, getDocumentosColeccion );


module.exports = router;

