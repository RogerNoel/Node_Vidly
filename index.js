const config = require ('config');
const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)
const express = require('express')
const app = express()
const genresRouter = require('./routes/genres');
const home = require('./routes/accueil');
const customersRouter = require('./routes/customers');
const mongoose = require('mongoose')
const moviesRouter = require('./routes/movies')
const rentalsRouter = require('./routes/rentals')
const usersRouter = require('./routes/user')
const authRouter = require('./routes/auth')

mongoose.connect('mongodb://localhost/vidly', {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{console.log(`Connected to mongoDB`)})
.catch(err => console.log(err));

//middlewares
app.use(express.json());
app.use('/api/genres', genresRouter);
app.use('/', home);
app.use('/api/customers', customersRouter);
app.use('/api/movies', moviesRouter);
app.use('/api/rentals', rentalsRouter);
app.use('/api/users', usersRouter);
app.use('/api/auth', authRouter);

// const settings = app.get('env')
// console.log(settings)
// console.log(process.env.NODE_ENV)

// pour tests d'exercice sur les variables d'environnement
// console.log('Application name: ' + config.get('name'))
// console.log('mail server: ' + config.get('mail.host'))
// console.log('mail password: ' + config.get('mail.password'))



const port = 5000 || process.env.PORT;
app.listen(port, ()=> console.log(`Listening on port ${port}`))
