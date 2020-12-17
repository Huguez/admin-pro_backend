const { Schema, model } = require('mongoose');

const MedicoSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    img: {
        type: String
    },
    usuario:{
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    hospital: {        
        type: Schema.Types.ObjectId,
        ref: 'Hospital',
        required: true
    },
}, { collection: 'Medicos' });

MedicoSchema.method('toJSON', function(){
    const { __v, _id, ...object } = this.toObject(); 

    const id = _id;
    const version = __v;

    return { id, version, ...object };
});

module.exports = model('Medico', MedicoSchema );
