const mongoose = require('mongoose');
const Joi = require('joi');

function validateUser(item){
    const schema = {
        name: Joi.string().required().min(3).max(20),
        email: Joi.string().required().email(),
        password: Joi.string().required().min(4).max(255)
    }
    return Joi.validate(item, schema)
}

const User = mongoose.model('user', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 3,
        max: 20
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
        min: 5,
        max: 1024
    }
}))

module.exports.validateUser = validateUser;
module.exports.User = User;