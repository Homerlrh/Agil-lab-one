const express = require('express');
const router = express.Router();
const convert = require('../src/index');
const readline = require('../src/readline_stream');

router.route('/')
    // GET home page. 
    .get(function (req, res) {
        //TO DO
        res.render('index');
    })
    //Update home page with converted 
    .post(function (req, res) {
        const body = req.body;
        if (typeof body['isCToF'] === 'boolean' &&  Number(body['temp']) !== NaN) {
            let convertedValue = 0;
            if (body['isCToF']) {
                convertedValue = convert('c' + body['temp']);   
            } else {
                convertedValue = convert('f'+ body['temp']);
            }
            res.send({'temp':convertedValue});
        } else {
            res.status(400).send('Sorry, invalid data type');
        }
    })

module.exports = router;
