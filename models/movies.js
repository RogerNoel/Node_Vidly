const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
const Joi = require('joi');

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        maxlength: 255
    },
    numberInStock: {
        type: Number,
        required: true,
        min: 0
    },
    dailyRentalRate: {
        type: Number,
        required: true,
        min: 0
    },
    genre: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'genre',
        required: true
    }
});

const Movie = mongoose.model('movie', movieSchema);

// créer une fonction de validation:
function validateMovie(movie){
    const schema = {
        title: Joi.string().required().max(255),
        numberInStock: Joi.number().required().min(0),
        dailyRentalRate: Joi.number().required(),
        genre: Joi.string().required()
    }
    return Joi.validate(movie, schema);
};

exports.Movie = Movie;
exports.validateMovie = validateMovie;