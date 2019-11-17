const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
mongoose.set('useFindAndmodify', false);
const {Rental, validateRentals} = require('../models/rentals')
const {Customer} = require ('../models/customers')
const {Movie} = require('../models/movies')

// console.log(Customer)

router.get('/', async (req, res)=>{
    try {
        res.send(await Rental.find())
    }
    catch(err) {
        console.log('error', err);
        res.status(400).send('bad request')
    }
})

router.get('/:id', async (req, res)=>{
    try {
        const rental = await Rental.findById(req.params.id);
        res.send(rental)
    }
    catch (err) {
        console.log(err)
        return res.status(400).send('bad request')
    }
})

router.post('/', async (req, res)=>{
    try {
        const {error} = validateRentals(req.body)
        if(error){return res.status(400).send(error.details[0].message)}

        const customer = await Customer.findById(req.body.customerId);
        if(!customer) { return res.status(400).send('Invalid customer')}

        const movie = await Movie.findById(req.body.movieId);
        if(!movie) { return res.status(400).send('Invalid movie')}

        if(movie.numberInStock === 0) {return res.status(400).send('Movie not available')}

        let newRental = new Rental({
            customer: {
                _id: customer._id,
                name: customer.name,
                phone: customer.phone
            },
            movie: {
                _id: movie._id,
                title: movie.title,
                dailyRentalRate: movie.dailyRentalRate
            }
        })
        console.log(newRental)
        newRental = await newRental.save()
        movie.numberInStock--;
        movie.save()
        res.send(newRental)
    }
    catch(err){
        console.log('error', err)
        res.status(400).send('bad request')
    }
})

module.exports = router;