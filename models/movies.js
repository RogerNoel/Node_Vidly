const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
const Joi = require('joi');

const movieSchema = new mongoose.Schema({
    title: String,
    numberInStock: Number,
    dailyRentalRate: Number,
    genre: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'genre'
    }
});

const Movie = mongoose.model('movie', movieSchema);

// créer une fonction de validation:
function validateMovie(movie){
    const schema = {
        title: Joi.string().required(),
        numberInStock: Joi.number().required(),
        dailyRentalRate: Joi.number().required(),
        genre: Joi.string()
    }
    return Joi.validate(movie, schema);
};

exports.Movie = Movie;
exports.validateMovie = validateMovie;