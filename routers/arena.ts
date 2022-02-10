import { Router } from "express";

export const arenaRouter = Router(); //Ma być bez new, tak to sobie wymyślili w expresie

arenaRouter
    .get('/fight-form', (req, res) => {
        res.render('arena/fight-form');
    })

    .post('/fight', (req, res) => {
        res.render('arena/fight');
    }) 