import { Router } from "express";

export const homeRouter = Router(); //Ma być bez new, tak to sobie wymyślili w expresie

homeRouter
    .get('/', (req, res) => {
        res.send("Główna");
    })