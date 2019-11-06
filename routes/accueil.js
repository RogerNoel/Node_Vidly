const express = require('express');
const router = express.Router();
const joi = require('joi');

router.get('/', (req, res) => res.send('Hello World!'));

module.exports = router;