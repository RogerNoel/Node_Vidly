const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const Joi = require('joi')
const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const {User} = require('../models/usermodel')
mongoose.set('useCreateIndex', 'true');

// auth is used for validating the connexion of an existing user who logs in with email/pwd

router.post('/', async (req, res)=> {
    try{
        const { error } = validateAuth(req.body)
        if (error) return res.status(400).send('Invalid email or password')
        let user = await User.findOne({email:req.body.email})
        if (!user) return res.status(400).send('Invalid email')
        const pwdValidation = await bcrypt.compare(req.body.password, user.password)
        if (!pwdValidation) return res.status(400).send('Invalid email or password')

        const token = jwt.sign({_id:user._id}, 'jwtPrivateKey');
        let verify = jwt.verify(token, 'jwtPrivateKey');

        // console.log(verify)

        res.send(token)
    }
    catch (err) {
        console.log('error', err)
        res.status(400).send('Authentification failed')
    }
    
})

function validateAuth(item) {
    const schema = {
        email: Joi.string().required().email(),
        password: Joi.string().required().min(4).max(255)
    }
    return Joi.validate(item, schema)
}

module.exports = router;