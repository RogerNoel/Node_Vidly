const Fawn = require('fawn') // import de "fawn" pour transaction, il doit être initialisé sous la liste des require
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
mongoose.set('useFindAndmodify', false);
const {Rental, validateRentals} = require('../models/rentals')
const {Customer} = require ('../models/customers')
const {Movie} = require('../models/movies')

Fawn.init(mongoose);

router.get('/', async (req, res)=>{
    try {
        res.send(await Rental.find().sort('-dateOut'))
    }
    catch(err) {
        console.log('error', err);
        res.status(400).send('bad request' + err)
    }
})

router.get('/:id', async (req, res)=>{
    try {
        const rental = await Rental.findById(req.params.id);
        res.send(rental)
    }
    catch (err) {
        console.log(err)
        return res.status(400).send('bad request' + err)
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
        // both of the following .save() operations must be accomplished => we need a "transaction"
        // with this "transaction" either both of those operations will be accomplished or
        // none of them. Transaction will then accomplish a rollback to recover the falsely updated datas
        // In mongo, this "transaction" consists in a "two-face commit", but we can use an npm package to simulate this: "fawn" (npm install fawn)
        // --> first we do not need those lines anymore, they're gonna be replaced by a single task
            // newRental = await newRental.save()
            // movie.numberInStock--;
            // movie.save()
        try {
            new Fawn.Task()
                .save('rentals', newRental) // /!\ first argument is collection NOT in singular
                .update('movies', {_id: movie._id}, {
                    $inc: {numberInStock: -1}
                })
                .run()
            res.send(newRental)
        } catch(err) {
            res.status(500).send('Something went wrong: ' + err)
        }
    }
    catch(err){
        console.log('error', err)
        res.status(400).send('bad request' + err)
    }
})

module.exports = router;