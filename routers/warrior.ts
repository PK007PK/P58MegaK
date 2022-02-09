import { Router } from "express";

export const warriorRouter = Router(); //Ma być bez new, tak to sobie wymyślili w expresie

warriorRouter
    .get('/add-form', (req, res) => {
        res.send("Formularz dodawania wojownika");
    })

    .post('/add-form', (req, res) => {
        res.send("Dodanie wojownika");
    })