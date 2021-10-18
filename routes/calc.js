const express = require('express');

const calcRouter = express.Router();

calcRouter
    .post('/check', (req, res) => {
        const {numberA, numberB} = req.body;
        let answer;
        if (numberA % numberB === 0) {
            answer = {divider: true};
        } else {
            answer = {divider: false};
        }
        res.json(answer);
    })


module.exports = {
    calcRouter,
}
