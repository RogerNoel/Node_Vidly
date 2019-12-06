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

        user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })
        await user.save()
        res.send(user) // /!\ !!! password must not be sent back to the client
    }
    catch(err) {
        res.status(400).send('bad request: ' + err);
        console.log('erreur', err);
    }
    
})

module.exports = router;