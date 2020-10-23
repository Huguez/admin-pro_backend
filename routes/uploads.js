// path: api/upload

const { Router } = require('express');
const fileUpload = require('express-fileupload');

const router = Router();
const { validarJWT } = require('../middleware/validar-jwt');

const { subirDocumento, getImagen } = require('../controllers/uploads');

router.use(fileUpload());

router.put( '/:tabla/:id', validarJWT, subirDocumento );

router.get( '/:tabla/:img', getImagen  );


module.exports = router;