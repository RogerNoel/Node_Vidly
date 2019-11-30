const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
const {Customer, customersValidate} = require('../models/customers');

router.get('/', async (req, res) => {
    try {
        res.send(await Customer.find().sort('name'));
    }
    catch(err) {
        res.status(400).send('Bad request: ' + err)
        console.log(err.message);
    }
    
})

router.get('/:id', async (req, res)=>{
    try {
        const customer = await Customer.findById(req.params.id)
        if(!customer){ console.log(`Customer ID ${req.params.id} n'existe pas.`)}
        res.send(customer);
    }
    catch(err) {
        console.log(err.message);
        res.send(`ID ${req.params.id} inexistant`);
    }
    
});

router.get('/name/:name', async (req, res)=>{
    try {
        const customer = await Customer.find({name: req.params.name});
        console.log(customer)
        if (customer.length == 0) {
            res.send(`Pas de client nommé ${req.params.name}`)
        }
        res.send(customer);
    }
    catch(err) {
        res.status(400).send('Bad request: ' + err)
        console.log(err.message);
    }   
});

router.post('/', async (req, res) => {
    try {
        const {error} = customersValidate(req.body);
        if (error) return res.status(400).send(error.details[0].message);
        let newCustomer = new Customer({
            isGold: req.body.isGold,
            name: req.body.name,
            phone: req.body.phone
        });
        newCustomer = await newCustomer.save();
        res.send(newCustomer);
    }
    catch(err) {
        res.status(400).send('Bad request: ' + err)
        console.log('error', err)
    }
});

router.put('/:id', async (req, res)=>{
    const {error} = customersValidate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let customer = await Customer.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        isGold : req.body.isGold,
        phone: req.body.phone
    },
    {new: true});
    res.send(customer);
    if(!customer){
        return res.status(404).send(`${req.params.id} inexistant`)
    }
});

router.delete('/:id', async (req, res)=>{
    try {
        const result = await Customer.findByIdAndRemove(req.params.id);
        res.send(result);
    }
    catch (err) {
        console.log(err.message);
        res.send(`Impossible de supprimer l'ID ${req.params.id} qui n'existe pas.`);
    }

});

module.exports = router;