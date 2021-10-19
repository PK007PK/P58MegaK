const express = require('express');

const cookieRouter = express.Router();

cookieRouter
    .post('/set', (req, res) => {
        console.log(req.body);
        const { name } = req.body;
        res
            .cookie('name', name, {
                maxAge: 1000 * 60 * 60 * 24 * 30,
            })
            .send('Zapisano imię');
    })
    .get('/show', (req,res)=>{
        console.log(req.cookies);
        const {name} = req.cookies;
        res.send(name);
    })
    .get('/check', (req,res)=>{
        console.log(req.cookies);
        const {name} = req.cookies;
        res.send(name === undefined ? "Nie ma" : "Jest");
    })


module.exports = {
    cookieRouter,
}
