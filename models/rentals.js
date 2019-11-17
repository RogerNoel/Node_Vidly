const mongoose = require('mongoose')
const Joi = require('joi');

function validateRentals(item){
    const schema = {
        customerId: Joi.string().required(),
        movieId: Joi.string().required()
    }
    return Joi.validate(item, schema);
}

const Rental = mongoose.model('rental', new mongoose.Schema({
    customer: {
        type: new mongoose.Schema({
            name: {
                type: String,
                required: true,
                minlength: 3,
                maxlength: 50
            },
            isGold: {
                type: Boolean,
                default: false
            },
            phone: {
                type: String,
                required: true
            }
        })
    },
    movie: {
        type: new mongoose.Schema({
            title: {
                type: String,
                required: true,
                trim: true,
                minlength: 4,
                maxlength:60
            },
            dailyRentalRate: {
                type: Number,
                required: true,
                min: 0,
                max: 500
            },
            dateOut: {
                type: Date,
                required: true,
                default: Date.now()
            },
            dateBack: Date,
            rentalFee: {
                type: Number, 
                min:0
            }
        })
    }
}))

module.exports.Rental = Rental;
module.exports.validateRentals = validateRentals;