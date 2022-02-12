import { Router } from "express";
import { WarriorRecord } from "../record/warrior.record";
import { ValidationError } from "../utils/errors";

export const warriorRouter = Router(); //Ma być bez new, tak to sobie wymyślili w expresie

warriorRouter
    .get('/add-form', (req, res) => {
        res.render('warrior/add-form');
    })

    .post('/add-form', async (req, res) => {
        if (await WarriorRecord.isNameTaken(req.body.name)) {
            throw new ValidationError(`Imię ${req.body.name} jest zajęte!`);
        };

        const warrior = new WarriorRecord({
            ...req.body,
            power: Number(req.body.power),
            defence: Number(req.body.defence),
            stamina: Number(req.body.stamina),
            agility: Number(req.body.agility),
        });

        await warrior.insert();
        res.render('warrior/warrior-added', {
            id: warrior.id,
            name: warrior.name,
        });
    })