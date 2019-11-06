const express = require('express')
const router = express.Router()
const {Movie, validateMovie} = require('../models/movies')

const mongoose = require('mongoose')
mongoose.set('useFindAndmodify', false);

router.get('/', async (req, res)=>{
    try {
        let movies = await Movie.find()
        res.send(movies)
    }
    catch(err){
        console.log('error', err)
        res.status(400).send('bad request')
    }
})

router.get('/:id', async(req, res)=>{
    try {
        const movie = await Movie.findById(req.params.id)
        if (!movie){console.log(`Pas de film avec l'id ${req.params.id}`)}
        res.send(movie);
    }
    catch(err){
        console.log('error', err)
        res.status(400).send('bad request')
    }
})

router.post('/', async (req, res)=>{
    try {
        const {error} = validateMovie(req.body)
        if (error) return res.status(400).send(error.details[0].message);
        let newMovie = new Movie({
            title: req.body.title,
            numberInStock: req.body.numberInStock,
            dailyRentalRate: req.body.dailyRentalRate,
            genre: req.body.genre
        })
        newMovie = await newMovie.save();
        console.log(newMovie)
        res.send(newMovie);
    }
    catch(err) {
        res.status(400).send('bad request');
        console.log('error', err)
    }
})

router.put('/:id', async (req, res)=>{
    try {
        const {error} = validateMovie(req.body)
        if (error) return res.status(400).send(error.details[0].message);
        let movie = await Movie.findByIdAndUpdate(req.params.id, {
                title: req.body.title,
                numberInStock: req.body.numberInStock,
                dailyRentalRate: req.body.dailyRentalRate,
                genre: req.body.genre
            }, 
            {new: true});
        res.send(movie)
        if(!movie){
            return res.status(404).send(`${req.params.id} inexistant`)
        }
    } catch(err) {
        console.log('erreur', err)
        res.status(400).send('Bad request')
    }
})


module.exports = router;