const express = require('express');

const calcRouter = express.Router();

calcRouter
    .post('/check', (req, res) => {
        const {numberA, numberB} = req.body;
        if (numberA % numberB === 0) {
            res.json({divider: true})
        } else res.json({divider: false})
    })


module.exports = {
    calcRouter,
}
