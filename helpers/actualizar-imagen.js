const fs = require('fs');

const Usuario  = require('../models/usuario');
const Medico   = require('../models/medicos');
const Hospital = require('../models/hospital');

const borrarImagen = ( pathViejo ) => {
    if( fs.existsSync( pathViejo ) ){
        fs.unlinkSync( pathViejo );
    }
}

const actualizarImagen = async ( tabla, id, nombreArchivo ) => {
    
    let result;

    switch( tabla ){
        case 'hospitales':
            result = await Hospital.findById( id );
            if( !result ){
                return false;
            }
            
            borrarImagen( `./uploads/hospitales/${result.img}` );
            
            result.img = nombreArchivo;
            await result.save();
            return true;

        case 'medicos':
            result = await Medico.findById( id );
            if( !result ){
                return false;
            }
            
            borrarImagen( `./uploads/medicos/${result.img}` );
            
            result.img = nombreArchivo;
            await result.save();
            return true;

        case 'usuarios':
            result = await Usuario.findById( id );
            if( !result ){
                return false;
            }
            
            borrarImagen( `./uploads/usuarios/${result.img}` );
            
            result.img = nombreArchivo;
            await result.save();
            return true;
            
        default:
            return false;
    }
}

module.exports = { actualizarImagen };