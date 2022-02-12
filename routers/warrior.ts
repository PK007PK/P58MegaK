import { Router } from "express";
import { WarriorRecord } from "../record/warrior.record";
import { ValidationError } from "../utils/errors";

export const warriorRouter = Router(); //Ma być bez new, tak to sobie wymyślili w expresie

warriorRouter
    .get('/add-form', (req, res) => {
        res.render('warrior/add-form');
    })

    .post('/add-form', async (req, res) => {
        const {name, power, defence, stamina, agility} = req.body;

        if (await WarriorRecord.isNameTaken(name)) {
            throw new ValidationError(`Imię ${name} jest zajęte!`);
        };

        const warrior = new WarriorRecord({
            ...req.body,
            power: Number(power),
            defence: Number(defence),
            stamina: Number(stamina),
            agility: Number(agility),
        });

        await warrior.insert();

        res.render('warrior/warrior-added', {
            id: warrior.id,
            name: warrior.name,
        });
    })