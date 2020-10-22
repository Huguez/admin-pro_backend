const { Schema, model } = require('mongoose');

const usuarioSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    img: {
        type: String
    },
    role: {
        type: String,
        required: true,
        default: 'USER_ROLE'
    },
    google: {
        type: Boolean,
        default: false
    }
});

usuarioSchema.method('toJSON', function(){
    const { __v, _id, ...object } = this.toObject(); 

    const id = _id;
    const version = __v;

    return { id, version, ...object };
});

module.exports = model('Usuario', usuarioSchema );
