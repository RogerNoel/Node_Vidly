const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
const Joi = require('joi');

// create a schema to define shape of docs
// create a class for the collection
const Genre = mongoose.model('genre',new mongoose.Schema({
    name: {type: String, required: true}
}));

// functions
function validateGenre (genre) {
    const schema = {
        name: Joi.string().required()
    };

    return Joi.validate(genre, schema);
}

exports.Genre = Genre;
exports.validateGenre = validateGenre;