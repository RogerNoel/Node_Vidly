const express = require('express')
// const app = express()
const router = express.Router()
const {User, validateUser} = require('../models/usermodel')

router.post('/', async (req, res)=>{
    try {
        const { error } = validateUser(req.body)
        if (error)return res.status(400).send(error.details[0].message)
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })
        await user.save()
        res.send(user)
    }
    catch(err) {
        res.status(400).send('bad request');
        console.log('erreur', err);
    }
    
})

module.exports = router;