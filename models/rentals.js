const mongoose = require('mongoose')

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

module.exports = Rental;