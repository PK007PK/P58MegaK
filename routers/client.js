const express = require('express');

const clientRouter = express.Router();

clientRouter

    .get('/', (req,res)=>{
        res.send('Pobierz wszystkie');
    })

    .get('/:id', (req,res)=>{
        res.send('Pobierz pojedyncze');
    })

    .post('/', (req,res)=>{
        res.send('Dodaj');
    })

    .put('/:id', (req,res)=>{
        res.send('Zmodyfikuj');
    })

    .delete('/:id', (req,res)=>{
        res.send('Usuń');
    })

module.exports = {
    clientRouter,
}