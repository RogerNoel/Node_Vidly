const express = require('express')
const router = express.Router()
const {Movie, validateMovie} = require('../models/movies')

const mongoose = require('mongoose')
mongoose.set('useFindAndmodify', false);

router.get('/', async (req, res)=>{
    try {
        let movies = await Movie.find()
        .populate('genre')
        res.send(movies)
    }
    catch(err){
        console.log('error', err)
        res.status(400).send('bad request')
    }
})

router.get('/:id', async(req, res)=>{
    try {
        let movie = await Movie.findById(req.params.id).populate('genre')
        if (!movie){res.send(`Pas de film avec l'id ${req.params.id}`)}
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
        const newMovie = new Movie({
            title: req.body.title,
            numberInStock: req.body.numberInStock,
            dailyRentalRate: req.body.dailyRentalRate,
            genre: req.body.genre
        })
        await newMovie.save();
        console.log(newMovie)
        res.send(newMovie);
    }
    catch(err) {
        res.status(400).send('bad request' + err);
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
        res.status(400).send('Bad request' + err)
    }
})

router.delete('/:id', async (req, res)=>{
    try {
    const result = await Movie.findByIdAndDelete({_id:req.params.id})
    res.end(`Le film ${result.title} a été supprimé.`)
    }
    catch(error){
        console.log('erreur', error)
        res.status(400).send('bad request')
    }
}) 

module.exports = router;