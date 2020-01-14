const express = require('express');
const router = express.Router();
const convert = require('../src/index');
const readline = require('../src/readline_stream');
const path = require('path');
const filePath = path.join(__dirname, '../src/data');
const fileName = 'history.txt';

router.get('/download/history', function(req, res, next) {
    const options = {
        root: filePath
    }
    
    res.sendFile(fileName, options , err => {
        if (err) {
            console.log('File not found');
            next(err);
        } else {
            console.log('Sent:', fileName)
        }
    })
});

router.route('/')
    // GET home page. 
    .get(function (req, res) {
        res.render('index');
    })
    //Update home page with converted 
    .post(function (req, res) {
        const body = req.body;
        if (body.hasOwnProperty('temp') && body.hasOwnProperty('isCToF') 
                && typeof body['isCToF'] === 'boolean' &&  Number(body['temp']) !== NaN) {
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
