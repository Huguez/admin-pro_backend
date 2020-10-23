const { response } = require('express');

const path = require('path');
const fs = require('fs');

const { actualizarImagen } = require('../helpers/actualizar-imagen');
const { v4: uuidv4 } = require('uuid');



const subirDocumento = ( req, res = response ) => {
    try {
        const tabla = req.params.tabla;
        const id = req.params.id;
        
        const tablasValidas = [ 'hospitales', 'medicos', 'usuarios' ];
        
        //validamos el tipo
        if( !tablasValidas.includes( tabla ) ){
            return res.status( 400 ).json({
                ok: false,
                msg: 'La tabla no es un tipo valido!!!'
            });
        }

        //validamos si existe un archivo
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({
                ok: true,
                msg: 'No hay archivos que subir.'
            });
        }

        const file = req.files.imagen;
        const nombre = file.name.split('.');
        const extension = nombre[ nombre.length - 1 ];
        const extValidas = [ 'png', 'jpg', 'jpeg', 'gif' ];

        if( !extValidas.includes( extension ) ){
            return res.status( 400 ).json({
                ok: false,
                msg: 'Extension no valida!!!'
            });
        }

        // Generar el nombre del archivo
        const nombreArchivo = `${ nombre[0] }_${ uuidv4() }.${ extension }`;

        // Path para guardar la imagen
        const path = `./uploads/${ tabla }/${ nombreArchivo }`;
        
        // let sampleFile = req.files.sampleFile;

        file.mv( path, (error) => {
            if (error){
                return res.status(500).json({
                    ok: false,
                    msg: 'Error al mover la imagen',
                    error
                });
            }

            // actualizar base de datos
            actualizarImagen( tabla, id, nombreArchivo );
        
            res.json( {
                ok: true,
                msg: 'File uploaded!',
                nombreArchivo
            });
        });

    } catch (error) {
        res.status( 500 ).json({
            ok: false,
            msg: "Error en el server!!!"
        });
    }

}

const getImagen = ( req, res = response ) => {
    const tabla = req.params.tabla;
    const img = req.params.img;

    let pathImg = path.join( __dirname, `../uploads/${tabla}/${img}` );

    if( !fs.existsSync( pathImg ) ){
        pathImg = path.join( __dirname, `../uploads/no-img.png` );
    }

    res.sendFile( pathImg );

}

module.exports = { subirDocumento, getImagen };