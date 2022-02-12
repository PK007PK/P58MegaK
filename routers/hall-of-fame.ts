import { Router } from "express";
import { WarriorRecord } from "../record/warrior.record";

export const hallOfFameRouter = Router(); //Ma być bez new, tak to sobie wymyślili w expresie

hallOfFameRouter
    .get('/', async (req, res) => {
        const warriors = await WarriorRecord.listTop(3);
        res.render('hall-of-fame/list', {
            warriors,
        });
    })