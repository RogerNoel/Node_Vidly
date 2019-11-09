const express = require('express')
const app = express()
const genresRouter = require('./routes/genres');
const home = require('./routes/accueil');
const customersRouter = require('./routes/customers');
const mongoose = require('mongoose')
const moviesRouter = require('./routes/movies')
const rentalsRouter = require('./routes/rentals')

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

const port = 5000 || process.env.PORT;
app.listen(port, ()=> console.log(`Listening on port ${port}`))
