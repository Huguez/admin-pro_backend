const { Schema, model } = require('mongoose');

const HospitalSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    img: {
        type: String
    },
    usuario:{
        require: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }
}, { collection: 'hospitales' });

HospitalSchema.method('toJSON', function(){
    const { __v, ...object } = this.toObject(); 

    const version = __v;

    return { version, ...object };
});

module.exports = model('Hospital', HospitalSchema );
