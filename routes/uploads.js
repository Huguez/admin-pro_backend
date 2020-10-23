// path: api/upload

const { Router } = require('express');
const fileUpload = require('express-fileupload');

const router = Router();
const { validarJWT } = require('../middleware/validar-jwt');

const { subirDocumento } = require('../controllers/uploads');

router.use(fileUpload());

router.put( '/:tabla/:id', validarJWT, subirDocumento );

// router.get( '/coleccion/:tabla/:busqueda', validarJWT, getDocumentosColeccion );


module.exports = router;