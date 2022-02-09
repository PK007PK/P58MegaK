import { Router } from "express";

export const arenaRouter = Router(); //Ma być bez new, tak to sobie wymyślili w expresie

arenaRouter
    .get('/fight-form', (req, res) => {
        res.send("Formularz walki");
    })

    .post('/fight', (req, res) => {
        res.send("Przeprowadzenie walki");
    }) //POST /arena/fight