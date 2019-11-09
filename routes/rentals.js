const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
mongoose.set('useFindAndmodify', false);
const {Rental, validateRentals} = require('../models/rentals')

router.get('/', async (req, res)=>{
    try {
        res.send(await Rental.find())
    }
    catch(err) {
        console.log('error', err);
        res.status(400).send('bad request')
    }
})

router.post('/', async (req, res)=>{
    try {
        const {error} = validateRentals(req.body)
        if(error){return res.status(400).send(error.details[0].message)}
        let newRental = new Rental({
            rentalDate: Date.now(),
            customer: req.body.customer,
            movie: req.body.movie
        })
        console.log(newRental)
        newRental = await newRental.save()
        res.send(newRental)
    }
    catch(err){
        console.log('error', err)
        res.status(400).send('bad request')
    }
})

module.exports = router;