const mongoose = require('mongoose')
const Joi = require('joi');

function validateRentals(item){
    const schema = {
        inputDate: Joi.date(),
        dateOut:Joi.date(),
        dateBack: Joi.date(),
        customer: Joi.string().required(),
        movie: Joi.string().required(),
        rentalFee: Joi.number().min(0)
    }
    return Joi.validate(item, schema);
}

const Rental = mongoose.model('rental', new mongoose.Schema({
    inputDate: Date,
    dateOut: {type: Date, required: true, default: Date.now},
    dateBack: Date,
    rentalFee: Number,
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