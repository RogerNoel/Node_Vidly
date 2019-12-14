const jwt = require('jsonwebtoken')
const config = require('config')
const bcrypt = require('bcrypt')
const _ = require('lodash')
const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const {User, validateUser} = require('../models/usermodel')
mongoose.set('useCreateIndex', 'true');

router.post('/', async (req, res)=>{
    try {
        const { error } = validateUser(req.body)
        if (error) return res.status(400).send(error.details[0].message)

        let user = await User.findOne({email: req.body.email});
        if (user) return res.status(400).send('This email is already used.')

        user = new User(_.pick(req.body, ['name', 'email', 'password']));
        // crypting the pwd the user encoded
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt) // we reset the pwd after salt/hash it
        await user.save()

        const token = jwt.sign({_id:user._id}, config.get('jwtPrivateKey'));
        res.header('x-auth-token', token).send(_.pick(user, ['name', 'email', '_id']))
    }
    catch(err) {
        res.status(400).send('bad request: ' + err);
        console.log('erreur', err);
    }
    
})

module.exports = router;