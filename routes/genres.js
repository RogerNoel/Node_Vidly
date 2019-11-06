const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
const {Genre, validateGenre} = require('../models/genres');

// Genre routes
router.get('/', async (req, res)=>{
    res.send(await Genre.find().sort('name'));
});

router.get('/:id', async (req, res)=>{
    try {
        const genre = await Genre.findById(req.params.id)
        res.send(genre);
    }
    catch (err) {
        console.log(err.message);
        res.send(`l'ID ${err.value} n'existe pas.`)
    }
    
});

router.post('/', async (req, res)=>{
    const {error} = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let genre = new Genre({name: req.body.name}) ;
    genre = await genre.save();
    res.send(genre);
});

router.put('/:id', async (req, res)=>{
    const {error} = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    try {
        const genre = await Genre.findByIdAndUpdate(req.params.id, {name: req.body.name}, {new: true});
        console.log(genre);
        if (!genre) return res.status(404).send('The genre with the given ID does not exist');
        res.send(genre);
    }
    catch(err) {
        console.log(err.message);
        res.end(`L'ID ${err.value} n'existe pas.`)
    }

});


router.delete('/:id', async (req, res)=>{
    try {
        const genre = await Genre.findByIdAndRemove(req.params.id);
        res.send(genre);
    }
    catch (err) {
        console.log(err.message);
        res.send(` ID ${err.value} inexistant.`)
        res.end();
    }
});

module.exports = router;