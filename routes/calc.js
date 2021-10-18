const express = require('express');

const calcRouter = express.Router();

calcRouter
    .post('/check', (req, res) => {
        const {numberA, numberB} = req.body;
        const divider = numberA % numberB === 0 ? true : false;
        res.json({divider});
    })


module.exports = {
    calcRouter,
}
