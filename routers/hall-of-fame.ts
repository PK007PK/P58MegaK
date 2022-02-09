import { Router } from "express";

export const hallOfFameRouter = Router(); //Ma być bez new, tak to sobie wymyślili w expresie

hallOfFameRouter
    .get('/', (req, res) => {
        res.send("Sala sław");
    })