const jwt = require('jsonwebtoken');

const generarJWT = ( id ) => {
    return new Promise( ( resolve, reject ) => {

        const payload = {
            id
        };
        
        jwt.sign( payload, process.env.JWT_SECRET, { expiresIn: '24h' }, (err, token)=>{
            if( err ){
                reject(err);
            }else{
                resolve( token );
            }
        } );

    } );
}

module.exports = { generarJWT };