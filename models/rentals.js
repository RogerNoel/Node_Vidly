const mongoose = require('mongoose')
const Joi = require('joi');

function validateRentals(item){
    const schema = {
        rentalDate: Joi.date(),
        customer: Joi.string().required(),
        movie: Joi.string().required()
    }
    return Joi.validate(item, schema);
}

const Rental = mongoose.model('rental', new mongoose.Schema({
    rentalDate: Date,
    movie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "movie",
        required: true
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"customer",
        required: true
    }
}))

module.exports.Rental = Rental;
module.exports.validateRentals = validateRentals;