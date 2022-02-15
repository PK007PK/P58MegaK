import { Router } from "express";
import { WarriorRecord } from "../record/warrior.record";

export const arenaRouter = Router(); //Ma być bez new, tak to sobie wymyślili w expresie

arenaRouter
    .get('/fight-form', async (req, res) => {
        const warriors = await WarriorRecord.listAll();
        res.render('arena/fight-form', {
            warriors,
        });
    })

    .post('/fight', (req, res) => {
        res.render('arena/fight');
    }) 