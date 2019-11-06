const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
const Joi = require('joi');

// create a mongoose schema
// create a class from the mongoose schema
const Customer = mongoose.model('customer', new mongoose.Schema({
    isGold : {
        type: Boolean,
        default: false
    },
    name : {
        type: String,
        required: true
    },
    phone : {
        type: String,
        required: true
    }
}));

// functions
function customersValidate(item){
    // create a joi validation schema
    const schema = {
    isGold: Joi.boolean(),
    name: Joi.string().max(25).required(),
    phone: Joi.string().required()
    }
    return Joi.validate(item, schema);
}

exports.Customer = Customer;
exports.customersValidate = customersValidate;