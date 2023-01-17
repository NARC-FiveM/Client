const { Schema, model } = require('mongoose');

module.exports = model('fivem', new Schema({
    guild: {
        type: String,
        required: true
    },
    ip: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        default: false
    },
    password: {
        type: String,
        default: false
    }
}));